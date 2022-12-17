import { apiNextURl } from "../../api";
import { User } from "../types";

type JSONResponse = {
  success: boolean;
  user: User | null;
};

export async function fetchSession(): Promise<JSONResponse> {
  const res = await fetch(`${apiNextURl}/session`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: (window as any).token,
    },
  });

  const response: JSONResponse = await res.json();
  return response;
}
