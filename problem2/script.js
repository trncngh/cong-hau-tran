const EXCHANGE_API = "https://interview.switcheo.com/prices.json";

/**
 * Fetch token data from the API.
 * @returns {Promise<Array>} The array of tokens.
 */
const fetchTokenData = async () => {
	try {
		const response = await fetch(EXCHANGE_API);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		return [];
	}
};

/**
 * Populate a select with token data.
 * @param {HTMLElement} dropdownElement - The select element to populate.
 * @param {Array} tokens - The array of token data.
 * @param {string} excludeToken - The token to exclude from the select element.
 */
const populateCustomDropdown = (dropdownElement, tokens, excludeToken = "") => {
	const dropdownContent = dropdownElement.querySelector(".dropdown-content");
	dropdownContent.innerHTML = "";

	tokens
		.filter((token) => token.currency !== excludeToken)
		.forEach((token) => {
			const option = document.createElement("div");
			option.innerHTML = `
				<span>${token.currency}</span>
				<img src="assets/tokens/${token.currency}.svg" alt="${token.currency}">
			`;
			option.dataset.currency = token.currency;
			option.dataset.price = token.price;

			option.addEventListener("click", () => {
				dropdownElement.querySelector(".dropdown-button").textContent =
					token.currency;
				dropdownElement.dataset.currency = token.currency;
				dropdownElement.dataset.price = token.price;
				calculateOutputAmount(tokens);
				dropdownContent.classList.remove("show");
			});

			dropdownContent.appendChild(option);
		});
};

const toggleDropdown = (dropdownElement) => {
	const dropdownContent = dropdownElement.querySelector(".dropdown-content");
	dropdownContent.classList.toggle("show");
};

/**
 * Calculate the output amount based on selected tokens and input amount.
 * @param {Array} tokensData - The array of token data.
 */
const calculateOutputAmount = (tokensData) => {
	const inputToken = document.querySelector("#input-token").dataset;
	const outputToken = document.querySelector("#output-token").dataset;
	const inputAmount =
		parseFloat(document.querySelector("#input-amount").value) || 0;

	const inputRate = tokensData.find(
		(token) => token.currency === inputToken.currency
	)?.price;
	const outputRate = tokensData.find(
		(token) => token.currency === outputToken.currency
	)?.price;

	const outputAmount = (inputAmount * inputRate) / outputRate;
	document.querySelector("#output-amount").value = outputAmount
		? outputAmount.toFixed(4)
		: "";
};

/**
 * Prevents user from entering invalid characters in the input amount field.
 */
const restrictInvalidCharacters = (event) => {
	const invalidKeys = ["-", "e", "E"];
	if (invalidKeys.includes(event.key)) {
		event.preventDefault();
	}
};

/**
 * Updates the state of the Swap button based on form validity.
 */
const updateSwapButtonState = (inputToken, outputToken, inputAmount) => {
	const swapButton = document.querySelector("#swap-button");
	swapButton.disabled = !(
		inputToken.dataset.price &&
		outputToken.dataset.price &&
		inputAmount.value.trim() !== ""
	);
};

/**
 * Open confirmation modal.
 */
const openConfirmationModal = (
	modal,
	inputToken,
	inputAmount,
	outputToken,
	outputAmount
) => {
	document.querySelector("#confirm-input-token").textContent =
		inputToken.dataset.currency;
	document.querySelector("#confirm-input-amount").textContent =
		inputAmount.value;
	document.querySelector("#confirm-output-token").textContent =
		outputToken.dataset.currency;
	document.querySelector("#confirm-output-amount").textContent =
		outputAmount.value;
	modal.style.display = "flex";
};

/**
 * Close confirmation modal.
 */
const closeConfirmationModal = (modal) => {
	modal.style.display = "none";
};

/**
 * Simulate a swap transaction when the confirm button is clicked.
 */
const acceptSwap = (modal) => {
	modal.querySelector(".modal-info").style.display = "none";
	modal.querySelector(".modal-loader").style.display = "block";
	setTimeout(() => {
		modal.querySelector(".modal-loader").style.display = "none";
		modal.querySelector(".modal-announcement").style.display = "block";
	}, 3000); // Simulate a 3-second transaction
};

/**
 * Main function
 */
const main = async () => {
	const tokenData = await fetchTokenData();

	const inputToken = document.querySelector("#input-token");
	const outputToken = document.querySelector("#output-token");
	const inputAmountField = document.querySelector("#input-amount");
	const outputAmountField = document.querySelector("#output-amount");
	const swapButton = document.querySelector("#swap-button");
	const confirmationModal = document.querySelector("#confirmation-modal");

	populateCustomDropdown(inputToken, tokenData);
	populateCustomDropdown(outputToken, tokenData);

	inputAmountField.addEventListener("keydown", restrictInvalidCharacters);
	inputAmountField.addEventListener("input", () => {
		calculateOutputAmount(tokenData);
		updateSwapButtonState(inputToken, outputToken, inputAmountField);
	});

	updateSwapButtonState(inputToken, outputToken, inputAmountField);

	swapButton.addEventListener("click", () => {
		openConfirmationModal(
			confirmationModal,
			inputToken,
			inputAmountField,
			outputToken,
			outputAmountField
		);
	});

	document.querySelector("#confirm-cancel").addEventListener("click", () => {
		closeConfirmationModal(confirmationModal);
	});
	document.querySelector("#confirm-close").addEventListener("click", () => {
		closeConfirmationModal(confirmationModal);
		inputAmountField.value = "";
		outputAmountField.value = "";
	});
	document.querySelector("#confirm-accept").addEventListener("click", () => {
		acceptSwap(confirmationModal);
	});

	document.querySelectorAll(".dropdown-button").forEach((button) => {
		button.addEventListener("click", () => {
			toggleDropdown(button.closest(".custom-dropdown"));
			updateSwapButtonState(inputToken, outputToken, inputAmountField);
		});
	});

	document.addEventListener("click", (event) => {
		if (!event.target.closest(".custom-dropdown")) {
			document
				.querySelectorAll(".dropdown-content.show")
				.forEach((dropdown) => {
					dropdown.classList.remove("show");
				});
		}
	});
};

document.addEventListener("DOMContentLoaded", main);
