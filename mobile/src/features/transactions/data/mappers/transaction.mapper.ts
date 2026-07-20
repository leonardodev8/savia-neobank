import { toInitials } from "@/shared/utils/initials";
import type { Transaction } from "@/features/transactions/domain/entities/Transaction";
import type { TransactionsPage } from "@/features/transactions/domain/repositories/ITransactionsRepository";
import type {
  TransactionDTO,
  TransactionsPageDTO,
} from "../dto/transaction.dto";

export const toTransaction = (dto: TransactionDTO): Transaction => ({
  id: dto.id,
  title:
    dto.category === "salary"
      ? `Sueldo - ${dto.counterparty}`
      : dto.counterparty,
  initials: toInitials(dto.counterparty),
  category: dto.category,
  amountInCents: dto.amount_cents,
  status: dto.status,
  occurredAt: dto.occurred_at,
});

export const toTransactionsPage = (
  dto: TransactionsPageDTO,
): TransactionsPage => ({
  items: dto.items.map(toTransaction),
  nextCursor: dto.next_cursor,
});
