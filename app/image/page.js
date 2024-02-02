'use client'
import { useChat } from 'ai/react'
import Navbar from '../components/navbar'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'

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
                            No image available
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

        <form onSubmit={handleFormSubmit} className="fixed 
        self-center bottom-0 w-full px-4 md:max-w-md">
          <div className="form-control">
            <input
              type="text"
              className="input input-bordered w-full"
              value={input}
              placeholder="输入您想画的东西"
              onChange={handleInputChange}
              required
            />
            <button className="btn btn-primary mt-2 hover:bg-blue-400 w-full md:w-auto">发送</button>
          </div>
        </form>
      </div>
    </div>
  )
}
