import React, { useState, useRef } from "react"
import { useRouter } from "next/router"
import { fetchRegister } from "src/fetch/fetchRegister"

export default function Register() {
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [state, setState] = useState<any>({
    isSubmitting: false,
    message: "",
    errors: null,
  })

  const { message, isSubmitting, errors } = state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState({ ...state, isSubmitting: true })

    try {
      const name = nameRef.current?.value ?? ""
      const email = emailRef.current?.value ?? ""
      const password = passwordRef.current?.value ?? ""
      const res = await fetchRegister(name, email, password)
      const { success, msg, errors } = res

      if (!success) {
        return setState({
          isSubmitting: false,
        })
      }

      router.push("/login")
    } catch (e: any) {
      setState({ ...state, message: e.toString(), isSubmitting: false })
    }
  }

  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input className="input" type="text" placeholder="Name" ref={nameRef} />
      <input
        className="input"
        type="email"
        placeholder="Email"
        ref={emailRef}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        ref={passwordRef}
      />

      <button disabled={isSubmitting}>
        {isSubmitting ? "....." : "Sign Up"}
      </button>
      <div className="message">{message && <p>&bull; {message}</p>}</div>
      <div>
        {errors &&
          errors.map((error: any, id: string) => {
            return <p key={id}> &bull; {error}</p>
          })}
      </div>
    </form>
  )
}
