import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { textCensorHandler } from './check'
export const runtime = 'edge';



export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt, model, streaming } = await req.json();
  // const authHeader = req.headers.get('Authorization');
  const authHeader = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: authHeader,
    baseURL: `${process.env.OPENAI_PROXY_URL}/v1`
  });
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: model || 'gpt-4-0125-preview',
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: 'user',
        content: `${prompt}`,
      },
    ],

    temperature: 0, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  // const [stream1, stream2] = response.tee();

  // let content = '';
  // for await (const chunk of stream1) {
  //   content += chunk.choices[0].delta.content;

  // }


  // 检查内容
  // if (await contentMeetsCriteria(content) === '存在政治敏感不合规') {
  //   console.log('Content does not meet moderation criteria');
  //   // 创建一个包含自定义消息的新流
  //   const customMessage = '存在政治敏感不合规内容，故不展示';
  //   const customStream = new ReadableStream({
  //     start(controller) {
  //       controller.enqueue(customMessage);
  //       controller.close();
  //     }
  //   });

  //   return new StreamingTextResponse(customStream);
  // }

  // 如果内容符合标准，则使用第二个流
  // const stream = OpenAIStream(stream2);
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);

  // async function contentMeetsCriteria(content) {
  //   const result = await textCensorHandler(content);
  //   console.log(result)
  //   return result
  // }

}