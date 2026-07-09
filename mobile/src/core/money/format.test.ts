import { formatMoney, formatSignedMoney } from "./format";

describe("formatMoney", () => {
  it("formats zero", () => {
    expect(formatMoney(0)).toBe("S/ 0.00");
  });

  it("always shows two decimals", () => {
    expect(formatMoney(500)).toBe("S/ 5.00");
    expect(formatMoney(1)).toBe("S/ 0.01");
  });

  it("groups thousands with commas", () => {
    expect(formatMoney(482050)).toBe("S/ 4,820.50");
    expect(formatMoney(123456789)).toBe("S/ 1,234,567.89");
  });
});

describe("formatSignedMoney", () => {
  it("prefixes income with +", () => {
    expect(formatSignedMoney(320000)).toBe("+ S/ 3,200.00");
  });

  it("prefixes expenses with - and drops the negative sign from the amount", () => {
    expect(formatSignedMoney(-12000)).toBe("- S/ 120.00");
  });

  it("treats zero as positive", () => {
    expect(formatSignedMoney(0)).toBe("+ S/ 0.00");
  });
});
