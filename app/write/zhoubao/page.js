'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Navbar from '../../components/navbar'
import { useCompletion } from 'ai/react'

export default function AIDailyWeeklyReportGenerator () {
  const [formData, setFormData] = useState({
    workContent: '',
    reportType: '',
    profession: '',
    articleLength: '',
  })

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

  const generateReport = useCallback(async () => {
    const messageContent = `生成${formData.reportType}：工作内容 "${formData.workContent}"，职业 "${formData.profession}"，文章长度 "${formData.articleLength}"...`
    await complete(messageContent)
  }, [complete, formData])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await generateReport()
  }

  return (
    <div>
      <Navbar title='深斯科技AI-日报周报生成器'></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
          <p className="mb-6 text-gray-500">一键生成内容丰富的工作日报、周报、月报</p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700">请表述您的工作内容*</label>
              <textarea name="workContent" placeholder="如：制作「AI模板」原型，撰写需求文档，与开发沟通相关细节" className="textarea textarea-bordered w-full h-24" value={formData.workContent} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">生成类型*</label>
              <select name="reportType" className="select select-bordered w-full" value={formData.reportType} onChange={handleFormInputChange}>
                <option value="">请选择报告类型</option>
                <option value="日报">日报</option>
                <option value="周报">周报</option>
                <option value="月报">月报</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700">职业*</label>
              <input type="text" name="profession" placeholder="请输入你的职业" className="input input-bordered w-full" value={formData.profession} onChange={handleFormInputChange} />
            </div>
            <div>
              <label className="text-gray-700">文章长度*</label>
              <select name="articleLength" className="select select-bordered w-full" value={formData.articleLength} onChange={handleFormInputChange}>
                <option value="">请选择文章长度</option>
                <option value="短">短</option>
                <option value="中">中</option>
                <option value="长">长</option>
              </select>
            </div>
            <button type="submit" className="btn w-full">生成内容</button>
          </form>
        </div>
      </div>
    </div>
  )
}
