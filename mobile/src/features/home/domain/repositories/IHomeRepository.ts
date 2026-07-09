import type { Account } from "../entities/Account";
import type { Movement } from "../entities/Movement";

export type HomeSummary = {
  account: Account;
  recentMovements: Movement[];
};

export interface IHomeRepository {
  getSummary(): Promise<HomeSummary>;
}
