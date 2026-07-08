/**
  The single error type the app sees above the data layer
**/
export const ErrorCodes = {
  Network: "NETWORK",
  Timeout: "TIMEOUT",
  Unauthorized: "UNAUTHORIZED",
  Forbidden: "FORBIDDEN",
  NotFound: "NOT_FOUND",
  Validation: "VALIDATION",
  Server: "SERVER",
  // Biometric hardware/enrollment problem (no sensor, no face/fingerprint enrolled, lockout)
  Biometric: "BIOMETRIC",
  Cancelled: "CANCELLED",
  TooManyAttempts: "TOO_MANY_ATTEMPTS",
  Unknown: "UNKNOWN",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

type AppErrorArgs = {
  code: ErrorCode;
  message: string;
  cause?: unknown;
  status?: number;
  i18nKey?: string;
  // Structured, non-sensitive context for the UI (remaining attempts, retryAtMs).
  // Never put secrets (codes, tokens) in here
  meta?: Record<string, unknown>;
};

export class AppError extends Error {
  readonly code: ErrorCode;
  override readonly cause?: unknown;
  readonly status?: number;
  readonly i18nKey?: string;
  readonly meta?: Record<string, unknown>;

  constructor(args: AppErrorArgs) {
    super(args.message);
    this.name = "AppError";
    this.code = args.code;
    this.cause = args.cause;
    this.status = args.status;
    this.i18nKey = args.i18nKey;
    this.meta = args.meta;
  }

  static from(err: unknown): AppError {
    if (err instanceof AppError) return err;
    if (err instanceof Error) {
      return new AppError({
        code: ErrorCodes.Unknown,
        message: err.message,
        cause: err,
      });
    }
    return new AppError({
      code: ErrorCodes.Unknown,
      message: "Ocurrió un error inesperado",
      cause: err,
    });
  }
}
