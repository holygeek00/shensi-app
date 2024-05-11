import OpenAI from 'openai'

export const runtime = 'edge'

export async function POST (req, res) {
  try {
    const token = req.headers.get('Token')
    if (!token) {
      return new Response(JSON.stringify({code: 401, error: '未授权', data: {}}), {status: 401})
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: `${process.env.OPENAI_PROXY_URL}/v1`
    })

    const { messages, size } = await req.json()
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
      image_url: image_url
    }
  }, { status: 200 })
  } catch (e) {
    console.error('Error:', e)
    return new Response(JSON.stringify({code: e.status, error: e.message, data: {}}), {status: e.status})
  }
}
