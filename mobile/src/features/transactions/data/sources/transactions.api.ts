/**
  Mock transactions source: a seeded deterministic generator so the history is
  large (~2,000 rows) and stable across reloads, served in offset-cursor pages
  exactly like a real HTTP source would be
**/
import type {
  TransactionCategoryDTO,
  TransactionDTO,
  TransactionsPageDTO,
} from "../dto/transaction.dto";

const MOCK_DELAY_MS = 450;
const TARGET_COUNT = 2000;
const DEFAULT_PAGE_SIZE = 50;
const SEED = 0x5a71a;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// mulberry32: tiny deterministic PRNG, plenty for mock data
const mulberry32 = (seed: number) => (): number => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type Rng = () => number;

// Index is always in range because rng() < 1
const pick = <T>(rng: Rng, items: readonly T[]): T =>
  items[Math.floor(rng() * items.length)] as T;

type Pool = {
  category: TransactionCategoryDTO;
  names: readonly string[];
  // Amount range in cents (absolute value)
  min: number;
  max: number;
};

const EXPENSE_POOL: readonly Pool[] = [
  {
    category: "purchase",
    names: [
      "Mercado de Abastos",
      "Mercado Central",
      "Plaza Vea",
      "Bodega Don Pepe",
      "Mercado Libre",
    ],
    min: 1_500,
    max: 25_000,
  },
  {
    category: "food",
    names: [
      "Restaurante El Olivar",
      "Pollería Rockys",
      "Café 107",
      "Cevicheria El Punto Marino",
    ],
    min: 800,
    max: 9_000,
  },
  {
    category: "phone",
    names: ["Recarga celular", "Claro Perú", "Movistar"],
    min: 1_000,
    max: 6_000,
  },
  {
    category: "fuel",
    names: ["Estación de servicio", "Grifo Primax", "Repsol"],
    min: 5_000,
    max: 15_000,
  },
  {
    category: "health",
    names: ["Botica Perú", "Mifarma", "Clínica San Camilo"],
    min: 900,
    max: 12_000,
  },
  {
    category: "entertainment",
    names: ["NetFlix", "MovieTime", "Disney+"],
    min: 1_500,
    max: 6_000,
  },
  {
    category: "utilities",
    names: ["Electro Dunas", "Semapach", "Internet"],
    min: 3_000,
    max: 18_000,
  },
  {
    category: "cash",
    names: ["Retiro en cajero"],
    min: 2_000,
    max: 40_000,
  },
  {
    category: "transfer",
    names: [
      "Carmen Parvina",
      "Frank Soto",
      "Ursula Flores",
      "Jhosmar Andres",
      "Maria Pomasonco",
    ],
    min: 1_000,
    max: 50_000,
  },
] as const;

const INCOME_POOL: readonly Pool[] = [
  {
    category: "transfer",
    names: [
      "Carmen Parvina",
      "Frank Soto",
      "Jhosmar Andres",
      "Maria Pomasonco",
    ],
    min: 2_000,
    max: 60_000,
  },
  {
    category: "refund",
    names: ["Devolución - Mercado Libre", "Reembolso - Seguro Rimac"],
    min: 500,
    max: 15_000,
  },
] as const;

const SALARY_IN_CENTS = 320_000;
const SALARY_DAY_OF_MONTH = 28;

const statusFor = (
  rng: Rng,
  category: TransactionCategoryDTO,
  ageInDays: number,
): TransactionDTO["status"] => {
  // Recent transfers may still be settling; a small tail of anything can fail
  if (category === "transfer" && ageInDays < 2 && rng() < 0.35)
    return "pending";
  if (rng() < 0.02) return "failed";
  return "completed";
};

const generate = (): TransactionDTO[] => {
  const rng = mulberry32(SEED);
  const rows: TransactionDTO[] = [];
  const day = new Date();
  day.setHours(0, 0, 0, 0);
  let ageInDays = 0;

  while (rows.length < TARGET_COUNT) {
    const perDay = 2 + Math.floor(rng() * 5);
    for (let i = 0; i < perDay && rows.length < TARGET_COUNT; i++) {
      const isIncome = rng() < 0.12;
      const pool = pick(rng, isIncome ? INCOME_POOL : EXPENSE_POOL);
      const rawAmount = pool.min + Math.floor(rng() * (pool.max - pool.min));
      // ATM withdrawals come in S/ 10 steps
      const amount =
        pool.category === "cash" ? rawAmount - (rawAmount % 1_000) : rawAmount;
      const occurred = new Date(day);
      occurred.setHours(
        7 + Math.floor(rng() * 16),
        Math.floor(rng() * 60),
        0,
        0,
      );

      rows.push({
        id: "",
        counterparty: pick(rng, pool.names),
        category: pool.category,
        amount_cents: isIncome ? amount : -amount,
        status: statusFor(rng, pool.category, ageInDays),
        occurred_at: occurred.toISOString(),
      });
    }

    if (day.getDate() === SALARY_DAY_OF_MONTH) {
      const occurred = new Date(day);
      occurred.setHours(8, 2, 0, 0);
      rows.push({
        id: "",
        counterparty: "Inversiones del Sur",
        category: "salary",
        amount_cents: SALARY_IN_CENTS,
        status: "completed",
        occurred_at: occurred.toISOString(),
      });
    }

    day.setDate(day.getDate() - 1);
    ageInDays += 1;
  }

  return rows
    .sort((a, b) => b.occurred_at.localeCompare(a.occurred_at))
    .map((row, i) => ({ ...row, id: `txn_${String(i + 1).padStart(4, "0")}` }));
};

let cache: TransactionDTO[] | null = null;
const allTransactions = (): TransactionDTO[] => (cache ??= generate());

export const transactionsApi = {
  async getTransactions(params: {
    cursor?: string;
    limit?: number;
  }): Promise<TransactionsPageDTO> {
    await delay(MOCK_DELAY_MS);
    const all = allTransactions();
    const offset = params.cursor ? Number(params.cursor) : 0;
    const limit = params.limit ?? DEFAULT_PAGE_SIZE;
    const end = offset + limit;
    return {
      items: all.slice(offset, end),
      next_cursor: end < all.length ? String(end) : null,
    };
  },
};
