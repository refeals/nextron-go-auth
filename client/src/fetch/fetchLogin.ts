import { apiNextURl } from "../../api";
import { User } from "../types";

type JSONResponse = {
  success: boolean;
  token: string;
  user: User | null;
  msg: string;
};

export async function fetchLogin(
  email: string,
  password: string
): Promise<JSONResponse> {
  const res = await fetch(`${apiNextURl}/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response: JSONResponse = await res.json();
  return response;
}
