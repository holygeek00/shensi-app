'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Navbar from '../../components/navbar'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/navigation'

export default function FoodExplorationCopyGenerator() {
  const [formData, setFormData] = useState({
    restaurantName: '川渝食府', // 示例默认值
    location: '杭州市西湖区西园二路', // 示例默认值
    signatureDishes: '麻婆豆腐、回锅肉', // 示例默认值
  })
  const [isGenerating, setIsGenerating] = useState(false);
  const [explorationCopy, setExplorationCopy] = useState('')

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
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      router.push('../login')
    }
  }, [router])

  const checkAndPublish = useCallback(async () => {
    setIsGenerating(true); // 开始生成时设置为 true

    const messageContent = `生成美食探店文案: 餐馆名称 "${formData.restaurantName}"，位置 "${formData.location}"，招牌菜 "${formData.signatureDishes}"...`
    setExplorationCopy('') // 清空现有内容
    const stream = await complete(messageContent) // 假设这返回一个流
    let newContent = ''
    for await (const chunk of stream) {
      newContent += chunk // 将每个块附加到新内容上
      setExplorationCopy(prevContent => prevContent + chunk) // 逐步更新美食探店文案
    }
    setIsGenerating(false); // 生成完毕后设置为 false

    return newContent // 如果直接更新状态，这可能不是必要的
  }, [complete, formData.restaurantName, formData.location, formData.signatureDishes])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (isGenerating) return; // 如果正在生成内容，则不执行任何操作

    await checkAndPublish()
  }

  return (
    <div>
      <Navbar title='Shensi-AI写作-AI美食探店文案生成器'></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
          <p className="mb-6 text-gray-500">快速生成高质量的美食探店文章，提高店铺曝光率和知名度</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">餐馆名称*</label>
              <input type="text" name="restaurantName" placeholder="川渝食府" className="input input-bordered w-full" value={formData.restaurantName} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">餐馆位置*</label>
              <input type="text" name="location" placeholder="杭州市西湖区西园二路" className="input input-bordered w-full" value={formData.location} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">招牌菜*</label>
              <input type="text" name="signatureDishes" placeholder="麻婆豆腐、回锅肉" className="input input-bordered w-full" value={formData.signatureDishes} onChange={handleFormInputChange} />
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
