import { formatMoney } from "./format";
import { parseMoney } from "./parse";

describe("parseMoney", () => {
  it("parses plain integers as whole soles", () => {
    expect(parseMoney("120")).toBe(12000);
    expect(parseMoney("0")).toBe(0);
  });

  it("parses two-decimal amounts", () => {
    expect(parseMoney("4820.50")).toBe(482050);
    expect(parseMoney("0.05")).toBe(5);
  });

  it("pads a single decimal digit", () => {
    expect(parseMoney("4820.5")).toBe(482050);
    expect(parseMoney("0.5")).toBe(50);
  });

  it("accepts thousands separators", () => {
    expect(parseMoney("4,820.50")).toBe(482050);
    expect(parseMoney("1,234,567.89")).toBe(123456789);
  });

  it("accepts the currency prefix with or without space", () => {
    expect(parseMoney("S/ 4,820.50")).toBe(482050);
    expect(parseMoney("S/120")).toBe(12000);
  });

  it("round-trips with formatMoney", () => {
    expect(parseMoney(formatMoney(482050))).toBe(482050);
    expect(parseMoney(formatMoney(0))).toBe(0);
  });

  it("rejects more than two decimals instead of rounding", () => {
    expect(parseMoney("1.234")).toBeNull();
  });

  it("rejects negative amounts", () => {
    expect(parseMoney("-5")).toBeNull();
  });

  it("rejects malformed input", () => {
    expect(parseMoney("")).toBeNull();
    expect(parseMoney("abc")).toBeNull();
    expect(parseMoney("12.")).toBeNull();
    expect(parseMoney("1,23.00")).toBeNull();
  });
});
