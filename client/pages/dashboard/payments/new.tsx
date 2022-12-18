import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { useAppContext } from "src/context/AppContext"
import { createPaymentMethod } from "src/fetch/createPaymentMethod"
import DashboardLayout from "src/layouts/dashboardLayout"
import { Customer } from "src/types"

interface PropsType {
  data: { customers: [Customer] }
}

export default function AddPaymentMethod({ data }: PropsType) {
  const router = useRouter()
  const typeRef = useRef<HTMLInputElement | null>(null)
  const customerIdRef = useRef<HTMLSelectElement | null>(null)
  const { customers, setCustomers } = useAppContext()

  useEffect(() => {
    if (data.customers) {
      setCustomers(data.customers)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const type = typeRef.current?.value ?? ""
    const customerId = customerIdRef.current?.value ?? ""
    await createPaymentMethod(type, customerId)
    router.push("/dashboard/payments")
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={typeRef} placeholder="Method Type" />

        <label htmlFor="customerId">Choose a customer:</label>
        <select name="customerId" id="customerId" ref={customerIdRef}>
          {customers.map((c) => (
            <option value={c.customerID}>{c.name}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

AddPaymentMethod.getLayout = DashboardLayout

export const getServerSideProps = (async ({ req: { cookies } }) => {
  const res = await fetch(`http://api:8081/customers`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Cookie: `token=${cookies.token}`,
    },
  })
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}) satisfies GetServerSideProps
