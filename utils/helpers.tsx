/**
 * Returns formatted text
 * @returns {string}
 * Format the text in customized way.
 * @param {Wallet} wallet .
 */
// Formats text
const textPipe = (text: any): string => {
  // If text is an object, format address
  if (typeof text === "object") {
    return formatText(text?.address);
  }

  // If text is a string
  if (typeof text === "string") {
    // If text length greater than 6, format
    if (text?.length > 6) {
      return formatText(text);
    }
    // If text length less than or equals 6, return as is
    return text;
  }
  return "";

  // Text Formatter to show the first 6 characters, ellipsis, and last 6 characters
  function formatText(address: string): string {
    return `${address?.slice(0, 6)}...${address?.slice(-6)}`;
  }
};

const HELPERS = { textPipe };

export default HELPERS;
