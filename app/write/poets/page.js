'use client'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/navbar'
import { useChat } from 'ai/react'

export default function PoetryGenerator () {
  const [formData, setFormData] = useState({
    theme: '',
    style: '',
  })

  const { messages, append } = useChat({
    // 提供必要的配置参数
  })

  const endOfMessagesRef = useRef(null)

  const handleFormInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const messageContent = `以主题“${formData.theme}”和风格“${formData.style}”创作一首诗。这首诗应当富有创意和表现力，以独特迷人的方式反映所选的主题和风格。确保诗歌充满意象、情感和艺术语言。让你的想象力奔放，创作一部捕捉特定主题和风格本质的杰作。`
    await append({ content: messageContent, role: 'user' })
  }

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div>
      <Navbar title='Shensi-AI写作-诗歌生成器'></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
          <p className="mb-6 text-gray-500">AI诗歌生成器，根据主题和体裁快速创作诗歌</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">诗歌主题*</label>
              <input type="text" name="theme" placeholder="请输入诗歌主题" className="input input-bordered w-full" value={formData.theme} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">诗歌体裁*</label>
              <select name="style" className="select select-bordered w-full" value={formData.style} onChange={handleFormInputChange}>
                <option value="">请选择体裁</option>
                <option value="抒情">抒情</option>
                <option value="叙事">叙事</option>
                <option value="古典">古典</option>
                <option value="现代">现代</option>
                <option value="自由诗">自由诗</option>
                <option value="俳句">俳句</option>
              </select>
            </div>
            <button type="submit" className="btn w-full">生成诗歌</button>
          </form>
        </div>
        <div className="messages mt-4">
          {messages.map((message, index) => (
            message.role === 'assistant' && (
              <div key={index} className="flex items-start space-x-4 p-3 mb-2 bg-white rounded-lg shadow w-full max-w-3xl">
                <div className="flex-shrink-0">

                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600">{message.role}</div>
                  <p className="text-gray-800">{message.content}</p>
                </div>
              </div>
            )
          ))}
          <div ref={endOfMessagesRef} />
        </div>

      </div>
    </div>
  )
}
