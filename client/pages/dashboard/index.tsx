import React, { useEffect } from "react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import { useAppContext } from "src/context/AppContext"
import { User } from "src/types"

export default function DashboardLayout({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { setUser } = useAppContext()

  useEffect(() => {
    setUser(data.user)
    router.push("/dashboard/customers")
  }, [])

  return <>...</>
}

type JSONResponse = {
  success: boolean
  user: User | null
}

export const getServerSideProps = (async ({ req: { cookies } }) => {
  const res = await fetch(`http://api:8081/session`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Cookie: `token=${cookies.token}`,
    },
  })
  const data: JSONResponse = await res.json()

  if (!data.success) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    }
  }

  return {
    props: {
      data,
    },
  }
}) satisfies GetServerSideProps
