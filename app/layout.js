import {Inter} from "next/font/google"
import "./globals.css"

const inter = Inter({subsets: ["latin"]})


export const metadata = {
    title: "深斯AI",
    description: "南昌深斯科技",
}

export default function RootLayout({children}) {

    return (
        <html lang="zh-cn">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <script defer src="https://www.googletagmanager.com/gtag/js?id=G-0BKCT3XTPZ"></script>
            <script
                defer
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
        <body className={inter.className} style={{
            "backgroundImage": "url('./bg-page.jpeg')",
            "backgroundSize": "100% 100%", "backgroundPosition": "center", "backgroundRepeat": "no-repeat"}}>
        {children}
        </body>

        </html>
    )
}
