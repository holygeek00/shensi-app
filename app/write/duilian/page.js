'use client'
import React, { useEffect, useRef } from 'react'
import { useState, useCallback } from 'react'
import Navbar from '../../../components/Navbar'
import { useChat } from 'ai/react'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {useAuthUser} from "@/lib/hooks/use-auth-user";
import {ReturnTabList} from "@/components/return-tab-list";

export default function PoetryGenerator () {
  const [formData, setFormData] = useState({
    shanglian: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [content, setContent] = useState('')

  const [key, setKey] = useState('')
  useEffect(() => {
    // 在组件挂载后从 localStorage 中获取数据
    const storedKey = localStorage.getItem('key')
    if (storedKey) {
      setKey(storedKey)
    }
  }, [])
  const { complete, completion } = useCompletion({
    api: '/api/completion',
    headers: {
      'Authorization': key
    },
  })


  const handleFormInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const checkAndPublish = useCallback(async (c) => {
    setIsGenerating(true) // 开始生成时设置为 true

    const stream = await complete(c) // Assuming this returns a stream
    let newContent = ''
    for await (const chunk of stream) {
      newContent += chunk // Append each chunk to the newContent
      setContent(prevContent => prevContent + chunk) // Update the content state progressively
    }
    setIsGenerating(false) // 生成完毕后设置为 false

    return newContent // This may not be necessary if you're updating the state directly
  }, [complete])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (isGenerating) return // 如果正在生成内容，则不执行任何操作

    const messageContent = `根据上联“${formData.shanglian}”创作出内容呼应、对仗工整的下联...`
    setContent('') // Clear existing content
    await checkAndPublish(messageContent)
  }
  const router = useRouter()
  const { checkToken } = useAuthUser()
  useEffect(() => {
    checkToken()
  }, [router])

  return (
    <div>
      <Navbar title='Shensi-AI写作-对联生成器'></Navbar>
            <ReturnTabList />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-base-200 to-base-400 p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
          <p className="mb-6 text-gray-500">AI对联生成器，根据上联快速创作下联</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">上联*</label>
              <input type="text" name="shanglian" placeholder="请输入对联上联,如家和万事兴" className="input input-bordered w-full" value={formData.shanglian} onChange={handleFormInputChange} />
            </div>

            <button type="submit" disabled={isGenerating}
              className="btn w-full">生成对联</button>
          </form>
        </div>
        <div className="w-full mt-2 flex justify-center items-center">
          <div className="p-3 mb-2 bg-white rounded-lg shadow w-full max-w-3xl">
            <div className="flex justify-center">
              <textarea className="text-gray-800 w-full h-64" value={completion} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
