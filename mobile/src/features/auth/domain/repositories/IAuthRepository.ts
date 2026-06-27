/**
  Auth repository contract. The domain depends on this interface and the data layer implements it
  Use cases don't know whether the session comes from a real API or a mock
**/
import type { Session } from "../entities/Session";

export type LoginParams = {
  // Optional 6-digit code. If omitted, biometric authentication is used
  code?: string;
};

export interface IAuthRepository {
  login(params?: LoginParams): Promise<Session>;
}
