
import { Inter } from "next/font/google"
import "./globals.css"
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ["latin"] })


export const metadata = {
  title: "深斯AI",
  description: "南昌深斯科技",
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}

      </body>

    </html>
  )
}
