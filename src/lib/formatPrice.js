/**
 * Universally format a price value into a standard decimal format (e.g., 604.80).
 * Handles null, undefined, string, and number inputs securely.
 * @param {string | number} price - The price value to format
 * @returns {string} The formatted price
 */
export function formatPrice(price) {
    if (price === null || price === undefined || isNaN(Number(price))) {
        return '0.00';
    }
    return Number(price).toFixed(2);
}
