/**
 *
 * @param {number} carWidth the size of the car
 * @param {number} streetSize the size of the street
 * @returns {boolean} true if the car will fit, false otherwise
 */
function willCarFit(carWidth, streetSize) {
  return carWidth <= streetSize;
}

/**
 *
 * @param {number} gpsLocation
 * @returns {boolean} true if the gps location is approximately in the area of Pilsen, false otherwise
 */
function isGPSLocationValid(gpsLocation) {
  return (
    gpsLocation.n >= 49.9 &&
    gpsLocation.n <= 50.1 &&
    gpsLocation.e >= 14.3 &&
    gpsLocation.e <= 14.5
  );
}

module.exports = { willCarFit, isGPSLocationValid };
