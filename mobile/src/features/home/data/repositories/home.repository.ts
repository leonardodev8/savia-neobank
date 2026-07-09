/**
  Home repository implementation: calls the data source, runs the mapper,
  returns domain entities for the view model
**/
import { toHomeSummary } from "../mappers/home.mapper";
import { homeApi } from "../sources/home.api";
import type { IHomeRepository } from "@/features/home/domain/repositories/IHomeRepository";

type Deps = { api: typeof homeApi };

export const createHomeRepository = ({ api }: Deps): IHomeRepository => ({
  async getSummary() {
    const dto = await api.getSummary();
    return toHomeSummary(dto);
  },
});

export const homeRepository = createHomeRepository({ api: homeApi });
