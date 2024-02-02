'use client'
import { useChat } from 'ai/react'
import Navbar from '../components/navbar'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'

export default function Chat() {
  const [key, setKey] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const storedKey = localStorage.getItem('key')
    if (storedKey) {
      setKey(storedKey)
    }
  }, [])

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    headers: {
      'Authorization': key,
    },
  })

  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleImageGeneration = async () => {
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
      setImageUrl(data.image_url)
    } catch (error) {
      console.error('Error generating image:', error)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleSubmit(e)
    handleImageGeneration()
  }

  return (
    <div className="bg-blue-200">
      <Navbar title='深斯AI'></Navbar>
      <div className="flex justify-center">
        {/* Tabs and other components */}
      </div>

      <div className="flex flex-col w-full min-h-screen mx-auto bg-blue-200">
        <div className="flex flex-col flex-grow overflow-auto pb-20">
          {/* Messages rendering */}
          {imageUrl && <img src={imageUrl} alt="Generated from AI" />}
         
        </div>

        <form onSubmit={handleFormSubmit} className="fixed 
        self-center bottom-0 w-full px-4 md:max-w-md">
           <div className="form-control">
            <input
              type="text"
              className="input input-bordered w-full"
              value={input}
              placeholder="输入您的问题或评论..."
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
