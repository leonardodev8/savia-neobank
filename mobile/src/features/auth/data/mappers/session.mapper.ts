/**
  Pure DTO -> entity mapper. The only place that imports 'SessionDTO'
**/
import type { SessionDTO } from "../dto/session.dto";
import type { Session } from "@/features/auth/domain/entities/Session";

const initialsOf = (first: string, last: string): string =>
  `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

const maskAccount = (accountNumber: string): string => {
  const last4 = accountNumber.slice(-4).padStart(4, "•");
  return `**** **** ${last4}`;
};

export const toSession = (dto: SessionDTO): Session => ({
  token: dto.access_token,
  issuedAt: dto.issued_at,
  user: {
    id: dto.account.id,
    fullName: `${dto.account.first_name} ${dto.account.last_name}`.trim(),
    initials: initialsOf(dto.account.first_name, dto.account.last_name),
    maskedAccount: maskAccount(dto.account.account_number),
  },
});
