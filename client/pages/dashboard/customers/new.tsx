import { useRouter } from "next/router"
import { useRef } from "react"
import { createCustomer } from "src/fetch/createCustomer"
import DashboardLayout from "src/layouts/dashboardLayout"

export default function AddCustomer() {
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = nameRef.current?.value ?? ""
    const email = emailRef.current?.value ?? ""
    await createCustomer(name, email)
    router.push("/dashboard/customers")
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder="Name" />
        <input type="email" ref={emailRef} placeholder="Email" />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

AddCustomer.getLayout = DashboardLayout
