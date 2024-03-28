import {Html, Main, Head, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html lang="zh-cn">
            <Head>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
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
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}