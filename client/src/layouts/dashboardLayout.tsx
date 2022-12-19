import Link from "next/link"
import { ReactElement } from "react"

export default function Dashboard(page: ReactElement) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/dashboard/customers">Customers</Link>
            </li>
            <li>
              <Link href="/dashboard/payments">Payment Methods</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-content">{page}</div>
    </>
  )
}
