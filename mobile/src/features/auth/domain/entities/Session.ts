/**
  App-shaped auth models (no DTO or API knowledge). Built from SessionDTO by the mapper
  Display fields (initials, maskedAccount) are derived here so the UI can render them directly
**/
export type AuthUser = {
  id: string;
  fullName: string;
  // Two-letter monogram for the avatar
  initials: string;
  maskedAccount: string;
};

export type Session = {
  token: string;
  user: AuthUser;
  // ISO-8601 timestamp the session was issued
  issuedAt: string;
};
