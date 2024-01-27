'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Navbar from '../../components/navbar'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/navigation'

export default function ProductFeatureDescriptionGenerator () {
  const [formData, setFormData] = useState({
    productName: '',
    productFeatures: '',
  })

  const [featureDescription, setFeatureDescription] = useState('')

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
    const messageContent = `产品特性描述: 产品名称 "${formData.productName}"，产品特点 "${formData.productFeatures}"...`
    setFeatureDescription('') // 清空现有内容
    const stream = await complete(messageContent) // 假设这返回一个流
    let newContent = ''
    for await (const chunk of stream) {
      newContent += chunk // 将每个块附加到新内容上
      setFeatureDescription(prevContent => prevContent + chunk) // 逐步更新产品特性的描述
    }
    return newContent // 如果直接更新状态，这可能不是必要的
  }, [complete, formData.productName, formData.productFeatures])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await checkAndPublish()
  }

  return (
    <div>
      <Navbar title='Shensi-AI写作-AI产品特性描述生成器'></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
          <p className="mb-6 text-gray-500">AI产品特性描述生成器，自动识别产品的特性和功能，确定产品的核心要素和特点</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">产品名称*</label>
              <input type="text" name="productName" placeholder="输入提供的产品名称" className="input input-bordered w-full" value={formData.productName} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">产品特点*</label>
              <textarea name="productFeatures" placeholder="输入想要描述的产品特点" className="textarea textarea-bordered w-full" value={formData.productFeatures} onChange={handleFormInputChange} />
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
