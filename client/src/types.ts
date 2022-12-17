export interface User {
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  exp: number;
}

export type Token = string;
