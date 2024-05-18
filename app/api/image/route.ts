import OpenAI from 'openai'
import {execSql} from "../lib/db";

export const runtime = 'edge'

export async function POST(req, res) {
    try {
        const token = req.headers.get('Token')
        if (!token) {
            return new Response(JSON.stringify({code: 401, error: '未授权', data: {}}), {status: 401})
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: `${process.env.OPENAI_PROXY_URL}/v1`
        })

        // 拿到headers中的key
        const apiKey = req.headers.get('Authorization');

        if (!apiKey) {
            return new Response(JSON.stringify({code: 401, message: '请传入正确的api key', data: {}}), {status: 401})
        }
        // 查询当前用户余额
        const result = await execSql('SELECT * FROM users WHERE api_key = $1', [apiKey]);

        // 查询api_key
        const user = result.rows[0];

        if (!user) {
            return new Response(JSON.stringify({code: 401, message: '请传入正确的api key', data: {}}), {status: 401})
        }

        console.log('user', user)
        if (user.quota < 500) {
            return new Response(JSON.stringify({code: 402, message: '余额不足', data: {}}), {status: 402})
        }
        const updateResult = await execSql('UPDATE users SET quota = $1 WHERE phone_number = $2', [user.quota - 500, user.phone_number]);
        const {messages, size} = await req.json()
          const response = await openai.images.generate({
              model: "dall-e-3",
              prompt: messages,
              n: 1,
              size: size,
          })
          console.log(response)
          const image_url = response.data[0].url

        return Response.json({
            code: 200,
            message: '图像生成成功',
            data: {
                image_url: "image_url"
            }
        }, {status: 200})
    } catch (e) {
        console.error('Error:', e)
        return new Response(JSON.stringify({code: e.status, error: e.message, data: {}}), {status: e.status})
    }
}
