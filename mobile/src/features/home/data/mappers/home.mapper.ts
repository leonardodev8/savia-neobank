import { toInitials } from "@/shared/utils/initials";
import type { Account } from "@/features/home/domain/entities/Account";
import type { Movement } from "@/features/home/domain/entities/Movement";
import type { HomeSummary } from "@/features/home/domain/repositories/IHomeRepository";
import type { AccountDTO, HomeSummaryDTO, MovementDTO } from "../dto/home.dto";

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
