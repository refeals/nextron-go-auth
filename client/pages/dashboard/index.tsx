import { GetServerSideProps } from "next";

export default function Dashboard({ data }: { data: any }) {
  console.log(data);
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>Customers</li>
            <li>Customers</li>
            <li>Customers</li>
            <li>Customers</li>
          </ul>
        </nav>
      </header>
      <main>Dashboard</main>
    </>
  );
}

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
