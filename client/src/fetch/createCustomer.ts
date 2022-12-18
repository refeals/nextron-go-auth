import { apiNextURl } from "api"
import { User } from "src/types"

type JSONResponse = {
  success: boolean
  token: string
  user: User | null
  msg: string
}

export async function createCustomer(
  name: string,
  email: string
): Promise<JSONResponse> {
  const res = await fetch(`${apiNextURl}/customers`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const response: JSONResponse = await res.json()
  return response
}
