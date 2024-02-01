
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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0BKCT3XTPZ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-0BKCT3XTPZ');
              `,
          }}
        />
      </head>
      <body className={inter.className}>{children}

      </body>

    </html>
  )
}
