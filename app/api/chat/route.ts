import {OpenAI} from 'openai'
import {OpenAIStream, StreamingTextResponse} from 'ai'
import {execSql} from "../lib/db";
import {jwtVerify} from "jose";
import {getEncoding, encodingForModel, getEncodingNameForModel} from "js-tiktoken";

export const runtime = 'nodejs'

export async function GET(req: Request) {

    return new Response('页面测试成功');
}

export async function POST(req: Request) {
    // 验证token是否过期
    // 解析出token
    const token = req.headers.get('token');
    if (!token) {
        return new Response(JSON.stringify({code: 401, message: '验证过期请重新登录!', data: {}}), {status: 401})
    }
    try {
        let result = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))
    } catch (e) {
        return new Response(JSON.stringify({code: 401, message: '验证过期，请重新登录', data: {}}), {status: 401})
    }
    return chatStreamText(req)
}


const chatStreamText = async (req) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: `${process.env.OPENAI_PROXY_URL}/v1`
        });
        const {messages, model} = await req.json();
        const apiKey = req.headers.get('Authorization');

        if (!apiKey) {
            return new Response(JSON.stringify({code: 401, message: '请传入正确的api key', data: {}}), {status: 401});
        }

        const result = await execSql('SELECT * FROM users WHERE api_key = $1', [apiKey]);
        const user = result.rows[0];

        if (!user) {
            return new Response(JSON.stringify({code: 401, message: '请传入正确的api key', data: {}}), {status: 401});
        }

        if (user.quota <= 0) {
            return new Response(JSON.stringify({code: 402, message: '余额不足', data: {}}), {status: 402});
        }

        // console.log(messages)

        // 计算传入的messages的token数量
        const messageToken = await processMessageToken(JSON.stringify(messages), model);

        console.log(`Message token count: ${messageToken}`)

        const r = await openai.chat.completions.create({
            model: model,
            stream: true,
            messages,
            temperature: 0.7,
            top_p: 0.7,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 4096
        });

        const stream = r.tee();
        const reader = OpenAIStream(stream[1]).getReader();

        const totalTokens = await processStream(reader, model);

        console.log(`Total token count: ${totalTokens}`);

        const readableStream = OpenAIStream(stream[0]);
        const updateResult = await execSql('UPDATE users SET quota = $1 WHERE phone_number = $2', [user.quota - totalTokens - totalTokens - messageToken, user.phone_number]);

        return new StreamingTextResponse(readableStream);
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({code: e.status, error: e.message, data: {}}), {status: e.status});
    }
}

async function processStream(reader, model) {

    const enc = getEncoding(getEncodingNameForModel("gpt-4-turbo"));

    const decoder = new TextDecoder();
    let totalTokens = 0;

    try {
        while (true) {
            const {done, value} = await reader.read();
            if (done) break;

            const text = decoder.decode(value);
            const tokens = enc.encode(text);
            totalTokens += tokens.length;
        }
    } catch (error) {
        console.error(error);
    }

    return totalTokens;
}

async function processMessageToken(message:string, gtpModel: string) {
    const enc = getEncoding(getEncodingNameForModel("gpt-4-turbo"));

    let totalTokens = 0;

    try {
        console.log(1)
        const tokens = enc.encode(message);
        totalTokens += tokens.length;
    } catch (error) {
        console.error(error);
    }

    return totalTokens;
}