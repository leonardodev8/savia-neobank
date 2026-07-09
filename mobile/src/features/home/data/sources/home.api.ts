/**
  Mock home source for now, while keeping every layer above it identical to a real HTTP source
**/
import type { HomeSummaryDTO } from "../dto/home.dto";

const MOCK_DELAY_MS = 500;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Timestamps relative to "today" so recent rows always read "Hoy 08:02"
const todayAt = (hours: number, minutes: number): string => {
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
};

export const homeApi = {
  async getSummary(): Promise<HomeSummaryDTO> {
    await delay(MOCK_DELAY_MS);
    return {
      account: {
        id: "acc_001",
        alias: "Cuenta Soles",
        account_number: "00000000004821",
        balance_cents: 482_050, // _ (numeric separator), 482 mil centavos = S/ 4,820.50
        currency: "PEN",
      },
      recent_movements: [
        {
          id: "mov_003",
          counterparty: "Mercado de Abastos",
          category: "purchase",
          amount_cents: -6_450,
          occurred_at: todayAt(12, 40),
        },
        {
          id: "mov_002",
          counterparty: "Ursula Flores",
          category: "transfer",
          amount_cents: -12_000,
          occurred_at: todayAt(10, 24),
        },
        {
          id: "mov_001",
          counterparty: "Inversiones del Sur",
          category: "salary",
          amount_cents: 320_000,
          occurred_at: todayAt(8, 2),
        },
      ],
    };
  },
};
