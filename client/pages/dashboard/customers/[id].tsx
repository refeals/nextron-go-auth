import { GetServerSideProps } from "next"
import DashboardLayout from "src/layouts/dashboardLayout"

export default function Customer({ data }: { data: any }) {
  console.log(data)
  return <>Customer</>
}

Customer.getLayout = DashboardLayout

export const getServerSideProps = (async ({ req: { cookies }, params }) => {
  try {
    const res = await fetch(`http://api:8081/customers/${params!.id}`, {
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
