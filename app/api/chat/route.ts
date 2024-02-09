import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'


export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const authHeader = req.headers.get('Authorization');
  // const authHeader = 'sk-NKt5fonF0F563xye73D7D329E72749F49473FeA3C33b0e13'
  const openai = new OpenAI({
    apiKey: authHeader,

    baseURL: `${process.env.PROXY_URL}/v1`
  });
  //console.log('header'+authHeader)
  const { messages } = await req.json()
  const response = await openai.chat.completions.create({
    model: 'gpt-4-0125-preview',
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