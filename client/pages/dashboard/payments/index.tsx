import { GetServerSideProps } from "next"
import Link from "next/link"
import DashboardLayout from "src/layouts/dashboardLayout"
import { PaymentMethod } from "src/types"

interface PropsType {
  data: { payments: [PaymentMethod] }
}

export default function PaymentMethods({ data }: PropsType) {
  // const { setCustomers } = useAppContext()

  // useEffect(() => {
  //   if (data.customers) {
  //     setCustomers(data.customers)
  //   }
  // }, [])

  const renderPaymentMethodRow = (p: PaymentMethod) => {
    return (
      <tr key={p.paymentMethod.paymentMethodId}>
        <td>{p.paymentMethod.paymentMethodId}</td>
        <td>{p.customerId}</td>
        <td>{p.paymentMethod.methodType}</td>
      </tr>
    )
  }

  return (
    <>
      <Link href="/dashboard/payments/new">Add new payment method</Link>
      <h1>Payment Methods</h1>
      <table className="list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Method Type</th>
          </tr>
        </thead>
        <tbody>{data.payments.map((c) => renderPaymentMethodRow(c))}</tbody>
      </table>
    </>
  )
}

PaymentMethods.getLayout = DashboardLayout

export const getServerSideProps = (async ({ req: { cookies } }) => {
  const res = await fetch(`http://api:8081/paymentmethods`, {
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
