import { GetServerSideProps } from "next";
import DashboardLayout from "../../layouts/dashboardLayout";

export default function Dashboard({ data }: { data: any }) {
  console.log(data);
  return <>Dashboard</>;
}

Dashboard.getLayout = DashboardLayout;

export const getServerSideProps = (async ({ req: { cookies } }) => {
  const res = await fetch(`http://api:8081/customers`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Cookie: `token=${cookies.token}`,
    },
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}) satisfies GetServerSideProps;
