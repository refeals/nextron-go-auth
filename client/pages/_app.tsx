import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"
import "styles/globals.css"
import type { AppProps } from "next/app"
import { AppProvider } from "src/context/AppContext"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>
}
