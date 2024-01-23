'use client'
import React, { useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { Markdown } from '@lobehub/ui'
import Navbar from '../../components/navbar'
import { useState } from 'react'
export default function Chat () {
  const [formData, setFormData] = useState({
    sender: '',
    recipient: '',
    relationship: '',
    festival: '',
  })

  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    // 提供必要的配置参数
  })

  const endOfMessagesRef = useRef(null)

  // 处理表单输入变化
  const handleFormInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // 提交表单
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // 生成祝福语请求
    const messageContent = `生成祝福语: ${formData.sender} 致 ${formData.recipient} 的 ${formData.festival} 祝福`
    await append({ content: messageContent, role: 'user' })
  }

  // 滚动到消息列表的底部
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  return (
    <div>
      <Navbar title='Shensi-AI写作-祝福语生成器'></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">


        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">

          <p className="mb-6 text-gray-500">AI节日祝福语生成器，快速生成具有温馨感和独特性的节日祝福语</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">祝福人*</label>
              <input type="text" name="sender" placeholder="您的名字" className="input input-bordered w-full" value={formData.sender} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">被祝福人*</label>
              <input type="text" name="recipient" placeholder="接受祝福的名字" className="input input-bordered w-full" value={formData.recipient} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">关系*</label>
              <select name="relationship" className="select select-bordered w-full" value={formData.relationship} onChange={handleFormInputChange}>
                <option value="">请选择关系</option>
                <option value="父母">父母</option>
                <option value="朋友">朋友</option>
                <option value="子女">子女</option>
                <option value="同事">同事</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700">节日类型*</label>
              <select name="festival" className="select select-bordered w-full" value={formData.festival} onChange={handleFormInputChange}>
                <option value="">请选择节日</option>
                <option value="春节">春节</option>
                <option value="元宵">元宵</option>
                <option value="生日">生日</option>
                <option value="中秋">中秋</option>
              </select>
            </div>
            <button type="submit" className="btn w-full">生成祝福</button>
          </form>
        </div>
        <div className="messages mt-4">
          {messages.map((message, index) => (
            message.role === 'assistant' && (
              <div key={index} className="p-3 my-2 bg-white-200 rounded-lg">
                {message.content}
              </div>
            )
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

    </div>
  )
}
