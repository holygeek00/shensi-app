'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {useAuthUser} from "@/lib/hooks/use-auth-user";

export default function EcommerceProductDescriptionGenerator () {
  const [formData, setFormData] = useState({
    productName: '',
    productFeatures: '',
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [productDescription, setProductDescription] = useState('')

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

    const messageContent = `生成电商产品简介: 产品名称 "${formData.productName}"，产品特点 "${formData.productFeatures}"...`
    setProductDescription('') // 清空现有内容
    const stream = await complete(messageContent) // 假设这返回一个流
    let newContent = ''
    for await (const chunk of stream) {
      newContent += chunk // 将每个块附加到新内容上
      setProductDescription(prevContent => prevContent + chunk) // 逐步更新产品描述和卖点文案
    }
    setIsGenerating(false) // 生成完毕后设置为 false

    return newContent // 如果直接更新状态，这可能不是必要的
  }, [complete, formData.productName, formData.productFeatures])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (isGenerating) return // 如果正在生成内容，则不执行任何操作

    await checkAndPublish()
  }

  return (
    <div>
      <Navbar title='Shensi-AI写作-AI电商产品简介生成器'></Navbar>
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
          <p className="mb-6 text-gray-500">AI电商产品简介生成器，快速生成具有吸引力的电商产品描述和卖点文案</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">产品名称*</label>
              <input type="text" name="productName" placeholder="输入提供的产品名称" className="input input-bordered w-full" value={formData.productName} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">产品特点*</label>
              <textarea name="productFeatures" placeholder="输入一段产品介绍的内容" className="textarea textarea-bordered w-full" value={formData.productFeatures} onChange={handleFormInputChange} />
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
