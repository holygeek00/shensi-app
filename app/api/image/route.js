import OpenAI from 'openai';

export const runtime = 'edge';

export async function POST(req, res) {
  try {
    const authHeader = req.headers.get('Authorization');
    const openai = new OpenAI({
      apiKey: authHeader,
      baseURL: `${process.env.PROXY_URL}/v1`
    });

    console.log('header: ' + authHeader)
    const { messages } = await req.json();
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: messages,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data[0].url;
    console.log(image_url);

    res.status(200).json({ image_url:image_url });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
