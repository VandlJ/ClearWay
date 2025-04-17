/**
 *
 * @param {number} leftMargin
 * @param {number} carWidth
 * @param {number} rightMargin
 * @returns {number} the width of the street
 */
function calculateStreetWidth(leftMargin, carWidth, rightMargin) {
  return leftMargin + carWidth + rightMargin;
}

/**
 *
 * @param {array} array of measured street widths
 * @returns {number} the average width of the street
 */
function calculateAverageWidth(streetWidths) {
  return (
    streetWidths.reduce((acc, curr) => acc + curr, 0) / streetWidths.length
  );
}

module.exports = { calculateStreetWidth, calculateAverageWidth };
