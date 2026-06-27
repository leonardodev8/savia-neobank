/**
  Auth repository implementation: calls the data source, runs the mapper, 
  returns a Session entity for the view model
**/
import { toSession } from "../mappers/session.mapper";
import { authApi } from "../sources/auth.api";
import type { IAuthRepository } from "@/features/auth/domain/repositories/IAuthRepository";

type Deps = { api: typeof authApi };

export const createAuthRepository = ({ api }: Deps): IAuthRepository => ({
  async login(params) {
    const dto = await api.login(params);
    return toSession(dto);
  },
});

export const authRepository = createAuthRepository({ api: authApi });
