// Next
import { NextResponse } from "next/server";

// Utils
import numberToWords from "number-to-words";

// Currencies
import currenciesDetails from "@/public/assets/data/currencies.json";
import { CurrencyDetails } from "@/types";

/**
 * Formats a number with commas and decimal places
 *
 * @param {number} number - Number to format
 * @returns {string} A styled number to be displayed on the invoice
 */
const formatNumberWithCommas = (number: number) => {
  return number.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * @param {string} currency - The currency that is currently selected 
 * @returns {Object} - An object containing the currency details as
 * ```
 * {
    "currency": "United Arab Emirates Dirham",
    "decimals": 2,
    "beforeDecimal": "Dirham",
    "afterDecimal": "Fils"
 }
 */
const fetchCurrencyDetails = (currency: string): CurrencyDetails | null => {
  const data = currenciesDetails as Record<string, CurrencyDetails>;
  const currencyDetails = data[currency];
  return currencyDetails || null;
};

/**
 * Turns a number into words for invoices
 *
 * @param {number} price - Number to format
 * @returns {string} Number in words
 */
const formatPriceToString = (price: number, currency: string): string => {
  // Initialize variables
  let decimals: number;
  let beforeDecimal: string | null = null;
  let afterDecimal: string | null = null;

  const currencyDetails = fetchCurrencyDetails(currency);

  // If currencyDetails is available, use its values, else dynamically set decimals
  if (currencyDetails) {
    decimals = currencyDetails.decimals;
    beforeDecimal = currencyDetails.beforeDecimal;
    afterDecimal = currencyDetails.afterDecimal;
  } else {
    // Dynamically get decimals from the price if currencyDetails is null
    const priceString = price.toString();
    const decimalIndex = priceString.indexOf(".");
    decimals = decimalIndex !== -1 ? priceString.split(".")[1].length : 0;
  }

  // Ensure the price is rounded to the appropriate decimal places
  const roundedPrice = parseFloat(price.toFixed(decimals));

  // Split the price into integer and fractional parts
  const integerPart = Math.floor(roundedPrice);

  const fractionalMultiplier = Math.pow(10, decimals);
  const fractionalPart = Math.round(
    (roundedPrice - integerPart) * fractionalMultiplier
  );

  // Convert the integer part to words with a capitalized first letter
  const integerPartInWords = numberToWords
    .toWords(integerPart)
    .replace(/^\w/, (c) => c.toUpperCase());

  // Convert fractional part to words
  const fractionalPartInWords =
    fractionalPart > 0 && Number.isSafeInteger(fractionalPart)
      ? numberToWords.toWords(fractionalPart)
      : null;

  // Handle zero values for both parts
  if (integerPart === 0 && fractionalPart === 0) {
    return "Zero";
  }

  // Combine the parts into the final string
  let result = integerPartInWords;

  // Check if beforeDecimal is not null
  if (beforeDecimal !== null) {
    result += ` ${beforeDecimal}`;
  }

  if (fractionalPartInWords) {
    // Check if afterDecimal is not null
    if (afterDecimal !== null) {
      // Concatenate the after decimal and fractional part
      result += ` and ${fractionalPartInWords} ${afterDecimal}`;
    } else {
      // If afterDecimal is null, concatenate the fractional part
      result += ` point ${fractionalPartInWords}`;
    }
  }

  return result;
};

/**
 * This method flattens a nested object. It is used for xlsx export
 *
 * @param {Record<string, T>} obj - A nested object to flatten
 * @param {string} parentKey - The parent key
 * @returns {Record<string, T>} A flattened object
 */
const flattenObject = <T>(
  obj: Record<string, T>,
  parentKey = ""
): Record<string, T> => {
  const result: Record<string, T> = {};

  for (const key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const flattened = flattenObject(
        obj[key] as Record<string, T>,
        parentKey + key + "_"
      );
      for (const subKey in flattened) {
        result[parentKey + subKey] = flattened[subKey];
      }
    } else {
      result[parentKey + key] = obj[key];
    }
  }

  return result;
};

/**
 * A method to validate an email address
 *
 * @param {string} email - Email to validate
 * @returns {boolean} A boolean indicating if the email is valid
 */
const isValidEmail = (email: string) => {
  // Regular expression for a simple email pattern
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * A method to check if a string is a data URL
 *
 * @param {string} str - String to check
 * @returns {boolean} Boolean indicating if the string is a data URL
 */
const isDataUrl = (str: string) => str.startsWith("data:");

/**
 * Dynamically imports and retrieves an invoice template React component based on the provided template ID.
 *
 * @param {number} templateId - The ID of the invoice template.
 * @returns {Promise<React.ComponentType<any> | null>} A promise that resolves to the invoice template component or null if not found.
 * @throws {Error} Throws an error if there is an issue with the dynamic import or if a default template is not available.
 */
const getInvoiceTemplate = async (templateId: number) => {
  // Dynamic template component name
  const componentName = `InvoiceTemplate${templateId}`;

  try {
    const module = await import(
      `@/app/components/templates/invoice-pdf/${componentName}`
    );
    return module.default;
  } catch (err) {
    console.error(`Error importing template ${componentName}: ${err}`);

    // Provide a default template
    return null;
  }
};

/**
 * Convert a file to a buffer. Used for sending invoice as email attachment.
 * @param {File} file - The file to convert to a buffer.
 * @returns {Promise<Buffer>} A promise that resolves to a buffer.
 */
const fileToBuffer = async (file: File) => {
  // Convert Blob to ArrayBuffer
  const arrayBuffer = await new NextResponse(file).arrayBuffer();

  // Convert ArrayBuffer to Buffer
  const pdfBuffer = Buffer.from(arrayBuffer);

  return pdfBuffer;
};

/**
 * Convert a number to its word representation with percent
 * @param {number} number - The number to convert
 * @returns {string} Number in words with percent
 */
const formatNumberToPercent = (number: number): string => {
  const units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if (number === 0) return "zero percent";
  if (number === 100) return "one hundred percent";

  let words = "";

  if (number >= 100) {
    words += units[Math.floor(number / 100)] + " hundred ";
    number %= 100;
  }

  if (number >= 10) {
    if (number < 20) {
      words += teens[number - 10];
      return words + " percent";
    }
    words += tens[Math.floor(number / 10)];
    number %= 10;
    if (number > 0) words += "-";
  }

  if (number > 0) {
    words += units[number];
  }

  return words + " percent";
};

const roundToDecimals = (num: number, round = 2) => {
  const decimalPart = num.toString().split(".")[1];

  if (decimalPart && decimalPart.length > round) {
    return parseFloat(num.toFixed(round));
  }

  return num;
};

export {
  formatNumberWithCommas,
  formatPriceToString,
  flattenObject,
  isValidEmail,
  isDataUrl,
  getInvoiceTemplate,
  fileToBuffer,
  formatNumberToPercent,
  roundToDecimals,
};
