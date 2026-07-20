/**
  Pure list-shaping logic for the movements screen: filtering, search and
  date grouping. No React so every rule here is unit-testable
**/
import { formatSignedMoney } from "@/core/money/format";
import { tokens } from "@/core/theme/tokens";
import { formatClockTime, formatDayLabel } from "@/shared/utils/format";
import type {
  Transaction,
  TransactionCategory,
} from "@/features/transactions/domain/entities/Transaction";

export type MovementsFilterId = "all" | "income" | "expense" | "month";

export const MOVEMENT_FILTERS: { id: MovementsFilterId; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "income", label: "Ingresos" },
  { id: "expense", label: "Egresos" },
  { id: "month", label: "Este mes" },
];

type AvatarToneName = keyof typeof tokens.avatarTone;

const CATEGORY_META: Record<
  TransactionCategory,
  { tone: AvatarToneName; label: string }
> = {
  salary: { tone: "green", label: "Abono de haberes" },
  transfer: { tone: "teal", label: "Transferencia" },
  refund: { tone: "green", label: "Reembolso" },
  purchase: { tone: "amber", label: "Compras" },
  food: { tone: "amber", label: "Comida" },
  phone: { tone: "blue", label: "Telefonía" },
  fuel: { tone: "clay", label: "Combustible" },
  health: { tone: "olive", label: "Salud" },
  entertainment: { tone: "gray", label: "Entretenimiento" },
  utilities: { tone: "gray", label: "Recibo" },
  cash: { tone: "gray", label: "Efectivo" },
};

// Diacritic-insensitive so "ursula" finds "Úrsula"
const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const filterTransactions = (
  transactions: Transaction[],
  filter: MovementsFilterId,
  query: string,
  now = new Date(),
): Transaction[] => {
  const needle = normalize(query.trim());

  return transactions.filter((t) => {
    if (filter === "income" && t.amountInCents <= 0) return false;
    if (filter === "expense" && t.amountInCents >= 0) return false;
    if (filter === "month") {
      const date = new Date(t.occurredAt);
      if (
        date.getMonth() !== now.getMonth() ||
        date.getFullYear() !== now.getFullYear()
      ) {
        return false;
      }
    }
    return needle.length === 0 || normalize(t.title).includes(needle);
  });
};

export type TransactionRowVM = {
  id: string;
  initials: string;
  tone: AvatarToneName;
  title: string;
  subtitle: string;
  amountText: string;
  isIncome: boolean;
};

export type MovementsListItem =
  | { type: "header"; id: string; label: string }
  | { type: "row"; id: string; movement: TransactionRowVM };

const toRowVM = (t: Transaction): TransactionRowVM => {
  const meta = CATEGORY_META[t.category];
  const label =
    t.category === "transfer" && t.amountInCents > 0
      ? "Transferencia recibida"
      : meta.label;

  return {
    id: t.id,
    initials: t.initials,
    tone: meta.tone,
    title: t.title,
    subtitle: `${label} | ${formatClockTime(t.occurredAt)}`,
    amountText: formatSignedMoney(t.amountInCents),
    isIncome: t.amountInCents >= 0,
  };
};

// Flattens into headers + rows for FlashList; assumes newest-first input,
// which is the order the API returns
export const buildMovementsList = (
  transactions: Transaction[],
  now = new Date(),
): { items: MovementsListItem[]; stickyHeaderIndices: number[] } => {
  const items: MovementsListItem[] = [];
  const stickyHeaderIndices: number[] = [];
  let currentLabel: string | null = null;

  for (const t of transactions) {
    const label = formatDayLabel(t.occurredAt, now);
    if (label !== currentLabel) {
      currentLabel = label;
      stickyHeaderIndices.push(items.length);
      items.push({ type: "header", id: `header_${label}`, label });
    }
    items.push({ type: "row", id: t.id, movement: toRowVM(t) });
  }

  return { items, stickyHeaderIndices };
};
