import SMSClient from "./client";
import {createClient} from "@vercel/kv";

export const dynamic = 'force-dynamic' // defaults to auto

export async function OPTIONS(request: Request) {
    console.log("OPTIONS");
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };
    return new Response("", {status: 200, headers: headers});
}

export async function POST(request: Request) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }

    const {phoneNumber} = await request.json();
    if (!phoneNumber) {
        return new Response(JSON.stringify({
            code: 400,
            body: {
                code: 400,
                message: "手机号不能为空"
            }
        }))
    }

    // 检查验证码是否过期
    const kv = createClient({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
    })

    let code = await kv.get(phoneNumber)

    if (code) {
        return new Response(JSON.stringify({
            code: 500,
            body: {
                code: 400,
                message: "验证码已发送，请勿重复发送，验证码有效期1天"
            }
        }), {status: 500, headers: headers})
    }

    let {status, body} = await SMSClient.sendMessageCode(phoneNumber);
    if (status === 200) {
        return new Response(JSON.stringify({
            code: 200,
            body: body,
        }), {status: 200, headers: headers})
    } else {
        return new Response(JSON.stringify({
            code: status,
            body: body,
        }), {status: status, headers: headers})
    }
}

export async function GET(request: Request) {

    const {searchParams} = new URL(request.url)
    const phoneNumber = searchParams.get("phoneNumber")

    console.log(phoneNumber);
    const kv = createClient({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
    });

    let code = await kv.get(phoneNumber)

    return new Response(JSON.stringify({
        code: 400,
        message: 'success',
        data: {
            code: code
        }
    }), {status: 200});
}
