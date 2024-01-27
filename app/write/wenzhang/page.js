'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Navbar from '../../components/navbar'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/navigation'

export default function StyleEnhancer () {
  const [formData, setFormData] = useState({
    keywords: '',
    style: '专业的', // 默认选项
  })

  const [enhancedContent, setEnhancedContent] = useState('')

  const { complete, completion } = useCompletion({
    api: '/api/completion',
  })

  const handleFormInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const router = useRouter()
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      router.push('../login')
    }
  }, [router])

  const checkAndPublish = useCallback(async () => {
    const messageContent = `润色文章: 关键词/中心句 "${formData.keywords}"，风格 "${formData.style}"...`
    setEnhancedContent('') // 清空现有内容
    const stream = await complete(messageContent) // 假设这返回一个流
    let newContent = ''
    for await (const chunk of stream) {
      newContent += chunk // 将每个块附加到新内容上
      setEnhancedContent(prevContent => prevContent + chunk) // 逐步更新润色后的内容状态
    }
    return newContent // 如果直接更新状态，这可能不是必要的
  }, [complete, formData.keywords, formData.style])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await checkAndPublish()
  }

  return (
    <div>
      <Navbar title='Shensi-AI写作-AI文章风格润色工具'></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
          <p className="mb-6 text-gray-500">帮助用户快速改进文章的语言表达风格和整体质量</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">关键词或中心句*</label>
              <textarea name="keywords" placeholder="请填写段落相关的关键词或关键句" className="textarea textarea-bordered w-full" value={formData.keywords} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">输入或选择一个风格*</label>
              <select name="style" className="select select-bordered w-full" value={formData.style} onChange={handleFormInputChange}>
                <option value="专业的">专业的</option>
                <option value="文艺的">文艺的</option>
                <option value="通俗易懂的">通俗易懂的</option>
                <option value="幽默的">幽默的</option>
              </select>
            </div>

            <button type="submit" className="btn w-full">生成内容</button>
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
