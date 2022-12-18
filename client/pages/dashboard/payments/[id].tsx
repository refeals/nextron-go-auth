import { GetServerSideProps } from "next"
import DashboardLayout from "src/layouts/dashboardLayout"

export default function PaymentMethod({ data }: { data: any }) {
  console.log(data)
  return <>PaymentMethod</>
}

PaymentMethod.getLayout = DashboardLayout

export const getServerSideProps = (async ({ req: { cookies }, params }) => {
  try {
    const res = await fetch(`http://api:8081/paymentmethod/${params!.id}`, {
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
  } catch (e) {
    return { props: {} }
  }
}) satisfies GetServerSideProps
