import { apiNextURl } from "../../api";

type JSONResponse = {
  success: boolean;
  errors: [string];
  msg: string;
};

export async function fetchRegister(
  name: string,
  email: string,
  password: string
): Promise<JSONResponse> {
  const res = await fetch(`${apiNextURl}/register`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const response: JSONResponse = await res.json();
  return response;
}
