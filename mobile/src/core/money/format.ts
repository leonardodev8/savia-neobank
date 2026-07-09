/**
  Money display formatting. Amounts travel through the app as integer cents
  and are only turned into a string here, at render time
**/

const numberFormat = new Intl.NumberFormat("es-PE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// "S/" is prefixed manually to guarantee "S/ 4,820.50" exactly
export const formatMoney = (amountInCents: number): string =>
  `S/ ${numberFormat.format(amountInCents / 100)}`;

// Signed variant for movements: "+ S/ 3,200.00" / "- S/ 120.00"
export const formatSignedMoney = (amountInCents: number): string =>
  amountInCents < 0
    ? `- ${formatMoney(-amountInCents)}`
    : `+ ${formatMoney(amountInCents)}`;
