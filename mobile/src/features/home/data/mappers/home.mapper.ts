import type { Account } from "@/features/home/domain/entities/Account";
import type { Movement } from "@/features/home/domain/entities/Movement";
import type { HomeSummary } from "@/features/home/domain/repositories/IHomeRepository";
import type { AccountDTO, HomeSummaryDTO, MovementDTO } from "../dto/home.dto";

// Spanish particles skipped when deriving initials ("Inversiones del Sur" -> "IS")
const PARTICLES = new Set(["de", "del", "la", "las", "los", "el", "y"]);

const toInitials = (name: string): string =>
  name
    .split(/\s+/)
    .filter((word) => word.length > 0 && !PARTICLES.has(word.toLowerCase()))
    .slice(0, 2)
    .map((word) => (word[0] ?? "").toUpperCase())
    .join("");

export const toAccount = (dto: AccountDTO): Account => ({
  id: dto.id,
  alias: dto.alias,
  maskedNumber: `**** ${dto.account_number.slice(-4)}`,
  balanceInCents: dto.balance_cents,
});

export const toMovement = (dto: MovementDTO): Movement => ({
  id: dto.id,
  title:
    dto.category === "salary"
      ? `Sueldo - ${dto.counterparty}`
      : dto.counterparty,
  initials: toInitials(dto.counterparty),
  category: dto.category,
  amountInCents: dto.amount_cents,
  occurredAt: dto.occurred_at,
});

export const toHomeSummary = (dto: HomeSummaryDTO): HomeSummary => ({
  account: toAccount(dto.account),
  recentMovements: dto.recent_movements.map(toMovement),
});
