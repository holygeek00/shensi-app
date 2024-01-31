
import { Inter } from "next/font/google"
import "./globals.css"
import dynamic from 'next/dynamic'
import ReactGA from "react-ga4"
const inter = Inter({ subsets: ["latin"] })

ReactGA.initialize("G-0BKCT3XTPZ")
export const metadata = {
  title: "深斯AI",
  description: "南昌深斯科技",
}

export default function RootLayout ({ children }) {
  ReactGA.initialize("G-0BKCT3XTPZ")
  return (
    <html lang="en">
      <body className={inter.className}>{children}

      </body>

    </html>
  )
}
