import { ReactElement } from "react";

export default function Dashboard(page: ReactElement) {
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
      <main>{page}</main>
    </>
  );
}
