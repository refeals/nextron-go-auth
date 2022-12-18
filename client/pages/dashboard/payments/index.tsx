import { GetServerSideProps } from "next"
import DashboardLayout from "src/layouts/dashboardLayout"

export default function PaymentMethods({ data }: { data: any }) {
  console.log(data)
  return <>PaymentMethods</>
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
