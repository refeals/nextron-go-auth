import React, { useRef, useState } from "react"
import { useRouter } from "next/router"
import { fetchLogin } from "src/fetch/fetchLogin"
import { useAppContext } from "src/context/AppContext"
import { createCookie } from "utils"

export default function Login() {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const { setUser, setToken } = useAppContext()
  const [state, setState] = useState({
    isSubmitting: false,
    message: "",
  })

  const { isSubmitting, message } = state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState({ ...state, isSubmitting: true })

    try {
      const email = emailRef.current?.value ?? ""
      const password = passwordRef.current?.value ?? ""
      const res = await fetchLogin(email, password)

      const { token, success, user } = res

      if (!success) {
        return setState({
          ...state,
          isSubmitting: false,
        })
      }

      // expire in 30 minutes(same time as the cookie is invalidated on the backend)
      ;(window as any).token = token
      createCookie("token", token, 0.5)

      setUser(user)
      setToken(token)

      router.push({ pathname: "/dashboard" })
    } catch (e: any) {
      setState({ ...state, message: e.toString(), isSubmitting: false })
    }
  }

  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        className="input"
        type="email"
        placeholder="email"
        ref={emailRef}
      />
      <input
        className="input"
        type="password"
        placeholder="password"
        ref={passwordRef}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "....." : "login"}
      </button>
      <div className="message">{message}</div>
    </form>
  )
}
