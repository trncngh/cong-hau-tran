const EXCHANGE_API = "https://interview.switcheo.com/prices.json";
/**
 * Fetch token data from the API.
 * @returns {Promise<Array>} The array of tokens.
 * tokenCurrencies = {
 *    currency: string;
 *   date: string;
 *  price: number;
 * }[]
 */
const fetchTokenData = async () => {
	try {
		// Fetch data from the API
		const response = await fetch(EXCHANGE_API);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const tokens = await response.json();
		return tokens;
	} catch (error) {
		console.error(error);
		return [];
	}
};

/**
 * Create a default option for a dropdown.
 * @param {HTMLElement} selectElement - The select element to add the default option to.
 */
const createDefaultOption = (selectElement) => {
	selectElement.innerHTML = ""; // Clear existing options
	const defaultOption = document.createElement("option");
	defaultOption.textContent = "Select a token";
	defaultOption.value = "";
	selectElement.appendChild(defaultOption);
};

/**
 * Populate a selects with token data.
 * @param {HTMLElement} selectElement - The select element to populate.
 * @param {Array} tokens - The array of token data.
 * @param {string} excludeToken - The token to exclude from the select element.
 */
const populateSelect = (
	selectElement,
	tokens,
	excludeToken = { value: "" }
) => {
	createDefaultOption(selectElement);
	tokens
		.filter((token) => token.currency !== excludeToken.value)
		.forEach((token) => {
			const option = document.createElement("option");
			option.textContent = token.currency;
			option.value = token.currency;
			selectElement.appendChild(option);
		});
};

/**
 * Calculate the output amount based on selected tokens and input amount.
 * @param {Array} tokensData - The array of token data.
 */
const calculateOutputAmount = (tokensData) => {
	const inputToken = document.getElementById("input-token").value;
	const outputToken = document.getElementById("output-token").value;
	const inputAmount =
		parseFloat(document.getElementById("input-amount").value) || 0;

	// Find rates for the selected tokens
	const inputRate = tokensData.find(
		(token) => token.currency === inputToken
	)?.price;
	const outputRate = tokensData.find(
		(token) => token.currency === outputToken
	)?.price;

	// Calculate output amount
	const outputAmount = (inputAmount * inputRate) / outputRate;

	// Update the output amount field
	document.getElementById("output-amount").value = outputAmount
		? outputAmount.toFixed(4)
		: "";
};

/**
 * Prevents user from entering negative sign "-" and "e" in the input amount field.
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
	const swapButton = document.getElementById("swap-button");
	swapButton.disabled = !(
		inputToken.value !== "" &&
		outputToken.value !== "" &&
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
	document.getElementById("confirm-input-token").textContent = inputToken.value;
	document.getElementById("confirm-input-amount").textContent =
		inputAmount.value;
	document.getElementById("confirm-output-token").textContent =
		outputToken.value;
	document.getElementById("confirm-output-amount").textContent =
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
	modal.getElementsByClassName("modal-info")[0].style.display = "none";
	modal.getElementsByClassName("modal-loader")[0].style.display = "block";
	setTimeout(() => {
		modal.getElementsByClassName("modal-loader")[0].style.display = "none";
		modal.getElementsByClassName("modal-announcement")[0].style.display =
			"block";
	}, 3000); // Simulate a 3-second transaction
};

/**
 * Main function
 */
const main = async () => {
	// Fetch token data
	const tokenData = await fetchTokenData();

	// Select elements
	const inputToken = document.getElementById("input-token");
	const outputToken = document.getElementById("output-token");
	const inputAmountField = document.getElementById("input-amount");
	const outputAmountField = document.getElementById("output-amount");
	const swapButton = document.getElementById("swap-button");
	const confirmationModal = document.getElementById("confirmation-modal");

	// Clear existing options and add default option
	createDefaultOption(inputToken);
	createDefaultOption(outputToken);

	// Add tokens to the select elements
	populateSelect(inputToken, tokenData);
	populateSelect(outputToken, tokenData);

	// Add event listener to input token select element that will update the output token select element dynamically
	inputToken.addEventListener("change", () => {
		if (inputToken.value === outputToken.value || outputToken.value === "") {
			populateSelect(outputToken, tokenData, inputToken);
		}
		calculateOutputAmount(tokenData);
		updateSwapButtonState(inputToken, outputToken, inputAmountField);
	});
	inputAmountField.addEventListener("keydown", restrictInvalidCharacters);
	inputAmountField.addEventListener("input", () => {
		calculateOutputAmount(tokenData);
		updateSwapButtonState(inputToken, outputToken, inputAmountField);
	});
	outputToken.addEventListener("change", () => {
		calculateOutputAmount(tokenData);
		updateSwapButtonState(inputToken, outputToken, inputAmountField);
	});
	updateSwapButtonState(inputToken, outputToken, inputAmountField);
	// Add event listener to swap button
	swapButton.addEventListener("click", () => {
		openConfirmationModal(
			confirmationModal,
			inputToken,
			inputAmountField,
			outputToken,
			outputAmountField
		);
	});
	// Add event listener to modal's buttons
	document.getElementById("confirm-cancel").addEventListener("click", () => {
		closeConfirmationModal(confirmationModal);
	});
	document.getElementById("confirm-close").addEventListener("click", () => {
		closeConfirmationModal(confirmationModal);
		inputAmountField.value = "";
		outputAmountField.value = "";
	});
	document.getElementById("confirm-accept").addEventListener("click", () => {
		acceptSwap(confirmationModal);
	});
};

document.addEventListener("DOMContentLoaded", main);
