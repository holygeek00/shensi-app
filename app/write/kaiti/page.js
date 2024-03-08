'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import { useCompletion } from 'ai/react'
import Link from 'next/link'
import {useAuthUser} from "@/lib/hooks/use-auth-user";
import {useRouter} from "next/navigation";

export default function ThesisProposalGenerator () {
  const [formData, setFormData] = useState({
    title: '',
    keywords: '',
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const [proposalContent, setProposalContent] = useState('')

  const [key, setKey] = useState('')

  const router = useRouter()

  const {checkToken} = useAuthUser()

  useEffect(() => {
    // 在组件挂载后从 localStorage 中获取数据
    const storedKey = localStorage.getItem('key')
    if (storedKey) {
      setKey(storedKey)
    }

    checkToken(router)
  }, [])

  const { complete, completion } = useCompletion({
    api: '/api/completion',
    headers: {
      'Authorization': key,
      // 其他头部信息
    },
  })


  const handleFormInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const checkAndPublish = useCallback(async () => {
    setIsGenerating(true) // 开始生成时设置为 true

    const messageContent = `生成论文开题报告: 题目 "${formData.title}"，关键词 "${formData.keywords}"...`
    setProposalContent('') // Clear existing content
    const stream = await complete(messageContent) // Assuming this returns a stream
    let newContent = ''
    for await (const chunk of stream) {
      newContent += chunk // Append each chunk to the newContent
      setProposalContent(prevContent => prevContent + chunk) // Update the proposalContent state progressively
    }
    setIsGenerating(false) // 生成完毕后设置为 false

    return newContent // This may not be necessary if you're updating the state directly
  }, [complete, formData.title, formData.keywords])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (isGenerating) return // 如果正在生成内容，则不执行任何操作

    await checkAndPublish()
  }

  return (
    <div>
      <Navbar title='Shensi-AI写作-论文开题报告生成器'></Navbar>
      <div className="flex justify-center">
        <div role="tablist" className="tabs tabs-boxed my-5">
          <Link href='../write' legacyBehavior>
            <a role="tab" className="tab hover:bg-blue-300">返回</a>
          </Link>
          <Link href='../talk' legacyBehavior>
            <a role="tab" className="tab hover:bg-blue-300">AI对话</a>
          </Link>

          <Link href='../image' legacyBehavior>
            <a role="tab" className="tab hover:bg-blue-300">AI绘画</a>
          </Link>

        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-base-200 to-base-400 p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
          <p className="mb-6 text-gray-500">AI帮您轻松撰写开题报告内容</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">论文题目*</label>
              <input type="text" name="title" placeholder="如：儿童心理健康与原生家庭环境关系研究" className="input input-bordered w-full" value={formData.title} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">论文关键词*</label>
              <input type="text" name="keywords" placeholder="如：儿童心理健康；原生家庭；儿童成长。" className="input input-bordered w-full" value={formData.keywords} onChange={handleFormInputChange} />
            </div>

            <button type="submit" disabled={isGenerating}
              className="btn w-full">生成内容</button>
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
