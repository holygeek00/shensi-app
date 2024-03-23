import OpenAI from 'openai'

export const runtime = 'edge'

export async function POST (req, res) {
  try {
    const authHeader = req.headers.get('Authorization')
    const openai = new OpenAI({
      apiKey: authHeader,
      baseURL: `${process.env.PROXY_URL}/v1`
    })

    //console.log('header: ' + authHeader)
    const { messages, size } = await req.json()
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: messages,
      n: 1,
      size: size,
    })
    const image_url = response.data[0].url
    //console.log(image_url)

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
