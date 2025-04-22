const { willCarFit, isGPSLocationValid } = require("./validation");

describe("willCarFit", () => {
  it("should return true if the car will fit", () => {
    const carWidth = 5;
    const streetWidth = 10;
    const result = willCarFit(carWidth, streetWidth);
    expect(result).toBe(true);
  });
  it("should return false if the car will not fit", () => {
    const carWidth = 5;
    const streetWidth = 3;
    const result = willCarFit(carWidth, streetWidth);
    expect(result).toBe(false);
  });
});

describe("isGPSLocationValid", () => {
  it("should return true if the GPS location is valid within the Pilsen area", () => {
    const gpsLocation = { n: 50, e: 14.4 };
    const result = isGPSLocationValid(gpsLocation);
    expect(result).toBe(true);
  });
  it("should return false if the GPS location is invalid within the Pilsen area", () => {
    const gpsLocation = { n: 30, e: 14.4 };
    const result = isGPSLocationValid(gpsLocation);
    expect(result).toBe(false);
  });
});
