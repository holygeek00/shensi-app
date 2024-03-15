import OpenAI from 'openai'
import {OpenAIStream, StreamingTextResponse} from 'ai'


export const runtime = 'edge'

export async function GET(req: Request) {

    return new Response('页面测试成功');
}

export async function POST(req: Request) {
    return GPT4(req)
    // return gpt3(req)
}


const GPT4 = async (req) => {
    try {
        // Extract the `prompt` from the body of the request
        const authHeader = req.headers.get('Authorization');
        // const authHeader = 'sk-NKt5fonF0F563xye73D7D329E72749F49473FeA3C33b0e13'
        const openai = new OpenAI({
            apiKey: authHeader,
            baseURL: `${process.env.PROXY_URL}/v1`
        });
        const {messages, model} = await req.json()
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

        const stream = OpenAIStream(response)

        return new StreamingTextResponse(stream)
    } catch (e) {
        console.log("error" + e);
        return new Response(JSON.stringify({code: e.status, error: e.message, data: {}}), {status: e.status})
    }
}

const gpt3 = async (req: Request) => {
    try {
        // const authHeader = req.headers.get('Authorization');
        const authHeader = 'sk-NKt5fonF0F563xye73D7D329E72749F49473FeA3C33b0e13'
        const openai = new OpenAI({
            apiKey: authHeader,
            baseURL: `${process.env.PROXY_URL}/v1`
        });

        const {messages} = await req.json()
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            stream: true,
            messages,
            temperature: 0.7,
            top_p: 0.7,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 4096
        })

        const stream = OpenAIStream(response)

        return new StreamingTextResponse(stream)
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({code: e.status, error: e.message, data: {}}), {status: e.status})
    }
}