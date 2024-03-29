'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {useAuthUser} from "@/lib/hooks/use-auth-user";

export default function ShortVideoScriptGenerator () {
  const [formData, setFormData] = useState({
    keywordsAndRequirements: '',
    platform: '',
    length: '',
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [scriptContent, setScriptContent] = useState('')

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

  const router = useRouter()
  const {checkToken} = useAuthUser()
  useEffect(() => {
    checkToken()
  }, [router])

  const checkAndPublish = useCallback(async () => {
    setIsGenerating(true) // 开始生成时设置为 true

    const messageContent = `生成短视频脚本: 关键词和要求 "${formData.keywordsAndRequirements}"，平台 "${formData.platform}"，文案长度 "${formData.length}"...`
    setScriptContent('') // Clear existing content
    const stream = await complete(messageContent) // Assuming this returns a stream
    let newContent = ''
    for await (const chunk of stream) {
      newContent += chunk // Append each chunk to the newContent
      setScriptContent(prevContent => prevContent + chunk) // Update the scriptContent state progressively
    }
    setIsGenerating(false) // 生成完毕后设置为 false

    return newContent // This may not be necessary if you're updating the state directly
  }, [complete, formData.keywordsAndRequirements, formData.platform, formData.length])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (isGenerating) return // 如果正在生成内容，则不执行任何操作

    await checkAndPublish()
  }

  return (
    <div>
      <Navbar title='Shensi-AI写作-短视频脚本生成器'></Navbar>
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
          <p className="mb-6 text-gray-500">一键生成各类创意短视频脚本</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">关键词和要求*</label>
              <textarea name="keywordsAndRequirements" placeholder="如：摩托车拍摄，有美女模特，要求有行驶的跟拍镜头" className="textarea textarea-bordered w-full" value={formData.keywordsAndRequirements} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">短视频平台*</label>
              <select name="platform" className="select select-bordered w-full" value={formData.platform} onChange={handleFormInputChange}>
                <option value="">请选择平台</option>
                <option value="抖音">抖音</option>
                <option value="快手">快手</option>
                <option value="小红书">小红书</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700">文案长度*</label>
              <select name="length" className="select select-bordered w-full" value={formData.length} onChange={handleFormInputChange}>
                <option value="">请选择文案长度</option>
                <option value="短">短</option>
                <option value="中">中</option>
                <option value="长">长</option>
              </select>
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
