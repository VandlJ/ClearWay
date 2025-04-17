const { parseTime } = require("./time-utils");

describe("parseTime", () => {
  it("should parse time string correctly", () => {
    const timeStr = "12:34:56";
    const expectedDate = new Date();
    expectedDate.setHours(12, 34, 56, 0);

    const result = parseTime(timeStr);
    expect(result).toEqual(expectedDate);
  });

  it("should handle leading zeros", () => {
    const timeStr = "01:02:03";
    const expectedDate = new Date();
    expectedDate.setHours(1, 2, 3, 0);

    const result = parseTime(timeStr);
    expect(result).toEqual(expectedDate);
  });

  it("should handle single digit hours", () => {
    const timeStr = "9:05:06";
    const expectedDate = new Date();
    expectedDate.setHours(9, 5, 6, 0);

    const result = parseTime(timeStr);
    expect(result).toEqual(expectedDate);
  });
});
