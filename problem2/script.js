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

const populateSelect = (selectElement, tokens, excludeToken = "") => {
	createDefaultOption(selectElement);
	tokens
		.filter((token) => token.currency !== excludeToken)
		.forEach((token) => {
			const option = document.createElement("option");
			option.textContent = token.currency;
			option.value = token.currency;
			selectElement.appendChild(option);
		});
};

/**
 * Main function to distribute tokens to the select elements.
 */
const main = async () => {
	// Fetch token data
	const tokens = await fetchTokenData();

	// Select elements
	const inputToken = document.getElementById("input-token");
	const outputToken = document.getElementById("output-token");

	// Clear existing options and add default option
	createDefaultOption(inputToken);
	createDefaultOption(outputToken);

	// Add tokens to the select elements
	populateSelect(inputToken, tokens);
	populateSelect(outputToken, tokens);

	// Add event listener to input token select element that will update the output token select element dynamically
	inputToken.addEventListener("change", () => {
		populateSelect(outputToken, tokens, inputToken.value);
	});
};

document.addEventListener("DOMContentLoaded", main);
