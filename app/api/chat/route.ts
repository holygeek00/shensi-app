import OpenAI from 'openai'
import {OpenAIStream, StreamingTextResponse} from 'ai'
import {execSql} from "../lib/db";
import {jwtVerify} from "jose";

import { openai } from '@ai-sdk/openai';


export const runtime = 'edge'

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
    try{
        let result = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))
    }catch (e){
        return new Response(JSON.stringify({code: 401, message: '验证过期请重新登录', data: {}}), {status: 401})
    }
    return chatStreamText(req)
}


const chatStreamText = async (req) => {

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: `${process.env.OPENAI_PROXY_URL}/v1`
        });
        const {messages, model} = await req.json()
        // 拿到headers中的key
        const apiKey = req.headers.get('Authorization');

        if (!apiKey) {
            return new Response(JSON.stringify({code: 401, message: '请传入正确的api key', data: {}}), {status: 401})
        }
        // 查询当前用户余额
        const result = await execSql('SELECT * FROM users WHERE api_key = $1', [apiKey]);


        console.log(result.rowCount)

        const response = await openai.chat.completions.create({
            model: model,
            stream: true,
            messages,
            temperature: 0.7,
            top_p: 0.7,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 4096
        })
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({code: e.status, error: e.message, data: {}}), {status: e.status})
    }

}