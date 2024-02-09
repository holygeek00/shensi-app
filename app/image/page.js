'use client'
import { useChat } from 'ai/react'
import Navbar from '../components/navbar'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import { useRouter } from 'next/navigation'
export default function Chat () {



  const [key, setKey] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false) // New state variable
  useEffect(() => {
    const storedKey = localStorage.getItem('key')
    if (storedKey) {
      setKey(storedKey)
    }
  }, [])

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/image',
    headers: {
      'Authorization': key,
    },
  })

  const endOfMessagesRef = useRef(null)
  const router = useRouter()
  useEffect(() => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (!accessToken) {
      router.push('../login')
    }
  }, [router])
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleImageGeneration = async () => {
    setIsLoading(true) // Start loading when image generation starts
    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': key
        },
        body: JSON.stringify({ messages: input })
      })
      const data = await response.json()
      setImageUrl(data.image_url) // Add new image URL to the array
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsLoading(false) // Stop loading after image generation finishes
    }
  }
  // 确保 'messages' 不为空
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null
  const handleFormSubmit = (e) => {
    e.preventDefault()
    // handleSubmit(e)
    handleImageGeneration()
  }

  return (
    <div className="bg-white-200">
      <Navbar title='深斯AI'></Navbar>
      <div className="flex justify-center">
        {/* Tabs and other components */}

        <div role="tablist" className="tabs tabs-boxed my-5">
          <Link href='./write' legacyBehavior>
            <a role="tab" className="tab hover:bg-blue-300">AI写作</a>
          </Link>
          <Link href='./talk' legacyBehavior>
            <a role="tab" className="tab hover:bg-blue-300">AI对话</a>
          </Link>
          <a role="tab" className="tab tab-active hover:bg-blue-300">AI绘画</a>
        </div>

      </div>

      <div className="flex flex-col w-full min-h-screen mx-auto bg-white">
        <div className="flex flex-col flex-grow overflow-auto pb-20">
          <div className="flex flex-col flex-grow overflow-auto pb-20">


            <div className="flex flex-col items-center justify-center h-full">
              {isLoading ? (
                <div className="flex flex-col items-center space-y-2">
                  {"稍等片刻即生成您想要的图片"}
                  <span className="loading loading-spinner w-10 h-10 flex items-center justify-center"></span>
                </div>
              ) :
                <div className="flex flex-col items-center space-y-2">
                  <div>
                    <div className="mx-auto flex max-w-6xl justify-center px-6 lg:px-8">
                      <div className="mt-8 flow-root sm:mt-16">
                        {imageUrl ? (
                          <div className="-m-2 w-fit rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10  lg:-m-4 lg:rounded-2xl lg:p-4">
                            <img src={imageUrl} alt={`Generated from AI `} className="mx-auto" />
                          </div>
                        ) : (
                          <div className="text-center text-gray-500">
                            例如输入关键词：一只可爱的小猫
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>

          </div>


        </div>

        <form onSubmit={handleFormSubmit} className="fixed self-center bottom-0 w-full px-4 pb-4 md:max-w-md   rounded-lg">
          <div className="form-control flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="text"
              className="input flex-grow input-bordered h-12 text-lg rounded-3xl px-4" // 使用flex-grow让输入框填满可用空间
              value={input}
              placeholder="输入您的问题"
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="btn w-full md:w-auto h-12 rounded-3xl bg-blue-500 hover:bg-blue-600 text-white" // 将按钮和输入框并排放置
            >
              发 送
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
