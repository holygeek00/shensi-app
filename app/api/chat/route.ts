import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { MY_CONSTANT } from '../../../app/constants'

const openai = new OpenAI({
  apiKey: MY_CONSTANT,
  baseURL: `${process.env.PROXY_URL}/v1`
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
    temperature: 0.7,

    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}