/**
  A single account movement shown on the home
**/
export type MovementCategory = "salary" | "transfer" | "purchase";

export type Movement = {
  id: string;
  title: string;
  initials: string;
  category: MovementCategory;
  amountInCents: number;
  occurredAt: string;
};
