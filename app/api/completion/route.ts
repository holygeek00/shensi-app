import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { textCensorHandler } from './check'
import {jwtVerify} from "jose";
import {execSql} from "../lib/db";
export const runtime = 'edge';



export async function POST(req: Request) {

  return new Response("", {
    status: 500
  })

  const { prompt, model, streaming } = await req.json();
  const token = req.headers.get('token');
  console.log('token', token)
  if (!token) {
    return new Response(JSON.stringify({code: 401, message: '验证过期请重新登录!', data: {}}), {status: 401})
  }
  try{
    let result = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))
  }catch (e){
    return new Response(JSON.stringify({code: 401, message: '验证过期请重新登录', data: {}}), {status: 401})
  }

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

  if (user.quota <= 0) {
    return new Response(JSON.stringify({code: 402, message: '余额不足', data: {}}), {status: 402})
  }


  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: `${process.env.OPENAI_PROXY_URL}/v1`
  });
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: model || 'gpt-3.5-turbo-0125',
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