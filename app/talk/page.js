'use client'

import { useChat } from 'ai/react'
import Navbar from '../components/navbar'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'

export default function Chat () {
  const [key, setKey] = useState('')
  useEffect(() => {
    // 在组件挂载后从 localStorage 中获取数据
    const storedKey = localStorage.getItem('key')
    if (storedKey) {
      setKey(storedKey)
    }
  }, [])
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    headers: {
      'Authorization': key,
      // 其他头部信息
    },
  })

  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  return (
    <div className="bg-white">
      <Navbar title='深斯AI'></Navbar>
      {/* <h1 className="text-5xl font-bold m-8 text-center mb-6">深斯 AI 对话</h1> */}
      <div className="flex justify-center my-5">
        <div role="tablist" className="tabs tabs-boxed">
          <Link href='./write' legacyBehavior>
            <a role="tab" className="tab hover:bg-blue-200">AI写作</a>
          </Link>
          <a role="tab" className="tab tab-active hover:bg-blue-200">AI对话</a>
          <Link href='./image' legacyBehavior>
            <a role="tab" className="tab hover:bg-blue-200">AI绘画</a>
          </Link>

        </div>
      </div>

      <div className="flex flex-col w-full min-h-screen mx-auto bg-white">
        <div className="flex flex-col flex-grow overflow-auto pb-20">
          {messages.map(m => (
            <div key={m.id} className="bg-white w-2/3 self-center m-5">
              <div className={m.role === 'user' ? "chat chat-start" : "chat chat-end"}>
                <div className="chat-header">
                  {m.role === 'user' ? '用户: ' : 'AI: '}
                </div>
                <p className='chat-bubble bg-gray-100 text-black prose'>
                  <Markdown>
                    {m.content}
                  </Markdown>
                </p>
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>

        <form onSubmit={handleSubmit} className="fixed self-center bottom-0 w-full px-4 pb-4 md:max-w-md   rounded-lg">
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