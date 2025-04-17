const {
  calculateStreetWidth,
  calculateAverageWidth,
} = require("./calculation");

describe("calculateStreetWidth", () => {
  it("should calculate the street width correctly", () => {
    const leftMargin = 10;
    const carWidth = 5;
    const rightMargin = 10;

    const result = calculateStreetWidth(leftMargin, carWidth, rightMargin);
    expect(result).toBe(25);
  });

  it("should calculate the street width correctly for a car that is 500 meters wide", () => {
    const leftMargin = 190;
    const carWidth = 500;
    const rightMargin = 190;

    const result = calculateStreetWidth(leftMargin, carWidth, rightMargin);
    expect(result).toBe(880);
  });
});

describe("calculateAverageWidth", () => {
  it("should calculate the average width correctly - 3 measurements", () => {
    const streetWidths = [10, 20, 30];
    const result = calculateAverageWidth(streetWidths);
    expect(result).toBe(20);
  });
  it("should calculcate the average width correctly - 10 measurements", () => {
    const streetWidths = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const result = calculateAverageWidth(streetWidths);
    expect(result).toBe(55);
  });
  it("should calculcate the average width correctly - 20 measurements", () => {
    const streetWidths = [
      10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
      170, 180, 190, 200,
    ];
    const result = calculateAverageWidth(streetWidths);
    expect(result).toBe(105);
  });
});
