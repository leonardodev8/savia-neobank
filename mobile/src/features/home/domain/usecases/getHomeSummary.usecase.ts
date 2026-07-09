/**
  Loads everything the Home needs: main account + latest movements
**/
import type {
  HomeSummary,
  IHomeRepository,
} from "../repositories/IHomeRepository";

export type GetHomeSummaryOutput = HomeSummary;

export const makeGetHomeSummaryUseCase =
  (repo: IHomeRepository) => (): Promise<GetHomeSummaryOutput> =>
    repo.getSummary();
