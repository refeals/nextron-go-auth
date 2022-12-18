import { apiNextURl } from "api"

type JSONResponse = {
  success: boolean
  msg: string
}

export async function createPaymentMethod(
  type: string,
  customerId: string
): Promise<JSONResponse | { success: boolean }> {
  try {
    const res = await fetch(`${apiNextURl}/paymentmethods`, {
      method: "POST",
      body: JSON.stringify({
        method_type: type,
        customer_id: parseInt(customerId),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response: JSONResponse = await res.json()
    return response
  } catch (e) {
    console.error(e)
    return { success: false }
  }
}
