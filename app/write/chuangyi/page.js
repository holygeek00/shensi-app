'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {useAuthUser} from "@/lib/hooks/use-auth-user";
import {ReturnTabList} from "@/components/return-tab-list";

export default function CreativeStoryGenerator() {
  const [formData, setFormData] = useState({
    plotDescription: '张三和李四是生活在热带雨林的两位疯狂的科学家。一天，张三发现了一个神秘的发光物体，他们被吓坏了。', // 示例默认值
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const [storyContent, setStoryContent] = useState('')
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

  const router = useRouter()
  const {checkToken} = useAuthUser()
  useEffect(() => {
    checkToken()
  }, [router])

  const checkAndPublish = useCallback(async () => {
    setIsGenerating(true) // 开始生成时设置为 true
    const messageContent = `生成创意故事: 剧情描述 "${formData.plotDescription}"...`
    setStoryContent('') // 清空现有内容
    const stream = await complete(messageContent) // 假设这返回一个流
    let newContent = ''
    for await (const chunk of stream) {
      newContent += chunk // 将每个块附加到新内容上
      setStoryContent(prevContent => prevContent + chunk) // 逐步更新创意故事内容
    }
    setIsGenerating(false) // 生成完毕后设置为 false

    return newContent // 如果直接更新状态，这可能不是必要的
  }, [complete, formData.plotDescription])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (isGenerating) return // 如果正在生成内容，则不执行任何操作

    await checkAndPublish()
  }

  return (
    <div>
      <Navbar title='Shensi-AI写作-AI创意故事生成器'></Navbar>
      <ReturnTabList />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-base-200 to-base-400 p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
          <p className="mb-6 text-gray-500">AI创意故事生成器，一键生成情节生动、结构完整的创意故事内容</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">剧情描述*</label>
              <textarea name="plotDescription" placeholder="如：张三和李四是生活在热带雨林的两位疯狂的科学家。一天，张三发现了一个神秘的发光物体，他们被吓坏了。" className="textarea textarea-bordered w-full h-64" value={formData.plotDescription} onChange={handleFormInputChange} />
            </div>

            <button type="submit" disabled={isGenerating} className="btn w-full">生成内容</button>
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
