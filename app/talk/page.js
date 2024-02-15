'use client'

import { useChat } from 'ai/react'
import Navbar from '../components/navbar'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import { useRouter } from 'next/navigation'
export default function Chat () {
  const [isSending, setIsSending] = useState(false) // 新增状态来追踪消息是否正在发送

  const [key, setKey] = useState('')
  useEffect(() => {
    // 在组件挂载后从 localStorage 中获取数据
    const storedKey = localStorage.getItem('key')
    if (storedKey) {
      setKey(storedKey)
    }
  }, [])
  const { messages, input, handleInputChange, handleSubmit: handleChatSubmit, } = useChat({
    api: '/api/chat',
    headers: {
      'Authorization': key,
      // 其他头部信息
    },
    onFinish: (message) => {
      // 当消息发送完成且聊天流结束时，这里的代码会被执行
      setIsSending(false)
      // 你可以在这里更新UI或执行其他需要的逻辑
    },
  })

  const endOfMessagesRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault() // 阻止表单默认提交行为
    setIsSending(true) // 开始发送消息，设置 isSending 为 true
    handleChatSubmit(e) // 调用 useChat 钩子提供的 handleSubmit 方法
  }
  const router = useRouter()
  useEffect(() => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (!accessToken) {
      router.push('../login')
    }
  }, [router])
  // useEffect(() => {
  //   endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [messages])
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
          {messages.length === 0 ? (
            // 当messages为空时显示的AI初始对话
            <div className="bg-white md:w-2/3 w-full self-center m-2">
              <div className="chat chat-start">
                {/* <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src="/avatar.svg" />
                  </div>
                </div> */}
                <div className="chat-header text-lg font-bold">深斯AI: </div>
                <p className='chat-bubble bg-white text-black'>
                  您好！我是深斯AI助手。有什么可以帮助您的吗？
                </p>
              </div>
            </div>
          ) : (
            // 显示messages数组中的消息
            messages.map(m => (
              <div key={m.id} className="bg-white md:w-2/3 w-full  self-center m-2">
                <div className={m.role === 'user' ? "chat chat-start" : "chat chat-start"}>
                  {/* <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img alt="Tailwind CSS chat bubble component" src="/avatar.svg" />
                    </div>
                  </div> */}
                  <div className="chat-header text-lg font-bold">
                    {m.role === 'user' ? '用户: ' : '深斯AI: '}
                  </div>
                  <p className='chat-bubble bg-white text-black markdown' style={{ color: 'black' }}>
                    <Markdown>
                      {m.content}
                    </Markdown>

                  </p>
                </div>
              </div>
            ))
          )}
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
              className="btn w-full md:w-auto h-12 rounded-3xl bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isSending} // 当消息正在发送时禁用按钮
            >
              {isSending ? 'AI生成中...' : '发 送'} {/* 按钮文本根据发送状态变化 */}
            </button>
          </div>
        </form>




      </div>
    </div>


  )
}