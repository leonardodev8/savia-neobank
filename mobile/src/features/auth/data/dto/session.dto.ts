/**
  Wire shape of the auth response / Integrate the authentication response
**/
export type SessionDTO = {
  access_token: string;
  issued_at: string;
  account: {
    id: string;
    first_name: string;
    last_name: string;
    // Full account number; the mapper masks it for display
    account_number: string;
  };
};
