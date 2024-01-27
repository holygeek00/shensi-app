import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { MY_CONSTANT } from '../../../app/constants'
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: MY_CONSTANT,
  baseURL: `${process.env.PROXY_URL}/v1`
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: 'user',
        content: `${prompt}
        Output:\n`,
      },
    ],

    temperature: 0, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}