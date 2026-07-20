/**
  Reads money text and returns whole cents (the opposite of format.ts)
  Numbers are kept as text, so no decimals (floats) touch the amount.
**/

// "4820", "4820.5", "4,820.50" comma groups optional, 1-2 decimals, no sign
const AMOUNT_PATTERN = /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{1,2})?$/;

// Returns integer cents, or null when the text is not a valid amount.
// Amounts with more than two decimals are rejected, never silently rounded
export const parseMoney = (input: string): number | null => {
  const raw = input.trim().replace(/^S\/\s*/, "");
  if (!AMOUNT_PATTERN.test(raw)) return null;

  const [wholePart = "", fractionPart = ""] = raw.split(".");
  const whole = Number(wholePart.replace(/,/g, ""));
  const cents = whole * 100 + Number(fractionPart.padEnd(2, "0"));
  return Number.isSafeInteger(cents) ? cents : null;
};
