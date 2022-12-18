import { GetServerSideProps } from "next"
import Link from "next/link"
import { useEffect } from "react"
import { useAppContext } from "src/context/AppContext"
import DashboardLayout from "src/layouts/dashboardLayout"
import { Customer } from "src/types"

interface PropsType {
  data: { customers: [Customer] }
}

export default function Customers({ data }: PropsType) {
  const { setCustomers } = useAppContext()

  useEffect(() => {
    if (data.customers) {
      setCustomers(data.customers)
    }
  }, [])

  const renderCustomerRow = (c: Customer) => {
    return (
      <tr key={c.customerID}>
        <td>{c.customerID}</td>
        <td>{c.name}</td>
        <td>{c.email}</td>
      </tr>
    )
  }

  return (
    <>
      <Link href="/dashboard/customers/new">Add new customer</Link>
      <h1>Customers</h1>
      <table className="list">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{data.customers.map((c) => renderCustomerRow(c))}</tbody>
      </table>
    </>
  )
}

Customers.getLayout = DashboardLayout

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
