'use client'
import React, {useState, useCallback, useEffect} from 'react'
import Navbar from '../../../components/Navbar'
import {useCompletion} from 'ai/react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {useAuthUser} from "@/lib/hooks/use-auth-user";

export default function ReportGenerator() {
    const [formData, setFormData] = useState({
        workContent: '',
        reportType: '日报', // 默认选项
        profession: '',
        length: '中', // 默认选项
    })

    const [reportContent, setReportContent] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [key, setKey] = useState('')
    useEffect(() => {
        // 在组件挂载后从 localStorage 中获取数据
        const storedKey = localStorage.getItem('key')
        if (storedKey) {
            setKey(storedKey)
        }
    }, [])
    const {complete, completion} = useCompletion({
        api: '/api/completion',
        headers: {
            'Authorization': key,
            // 其他头部信息
        },
    })


    const handleFormInputChange = (e) => {
        const {name, value} = e.target
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

        const messageContent = `生成${formData.reportType}: 工作内容 "${formData.workContent}"，职业 "${formData.profession}"，文章长度 "${formData.length}"的日报，Your report should include insights into key activities, achievements, issues faced, and future plans. Aim to write in a structured manner with clear, direct information. Feel free to be creatively flexible—for instance, provide original solutions to problems or suggest ways to improve workflow efficiency. Ensure the content of the report is concise, clear, accurate, and relevant.`
        setReportContent('') // 清空现有内容
        const stream = await complete(messageContent) // 假设这返回一个流
        let newContent = ''
        for await (const chunk of stream) {
            newContent += chunk // 将每个块附加到新内容上
            setReportContent(prevContent => prevContent + chunk) // 逐步更新报告内容状态
        }
        setIsGenerating(false) // 生成完毕后设置为 false

        return newContent // 如果直接更新状态，这可能不是必要的
    }, [complete, formData.workContent, formData.reportType, formData.profession, formData.length])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (isGenerating) return // 如果正在生成内容，则不执行任何操作

        await checkAndPublish()
    }

    return (
        <div>
            <Navbar title='Shensi-AI写作-日报周报生成器'></Navbar>
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

            <div
                className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-base-200 to-base-400 p-4">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
                    <p className="mb-6 text-gray-500">快速生成日报、周报或月报，帮助您高效记录工作进展</p>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="text-gray-700">工作内容*</label>
                            <textarea name="workContent" placeholder="请输入您的工作内容"
                                      className="textarea textarea-bordered w-full" value={formData.workContent}
                                      onChange={handleFormInputChange}/>
                        </div>
                        <div>
                            <label className="text-gray-700">生成类型*</label>
                            <select name="reportType" className="select select-bordered w-full"
                                    value={formData.reportType} onChange={handleFormInputChange}>
                                <option value="日报">日报</option>
                                <option value="周报">周报</option>
                                <option value="月报">月报</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-700">职业*</label>
                            <input type="text" name="profession" placeholder="请输入您的职业"
                                   className="input input-bordered w-full" value={formData.profession}
                                   onChange={handleFormInputChange}/>
                        </div>
                        <div>
                            <label className="text-gray-700">文章长度*</label>
                            <select name="length" className="select select-bordered w-full" value={formData.length}
                                    onChange={handleFormInputChange}>
                                <option value="短">短</option>
                                <option value="中">中</option>
                                <option value="长">长</option>
                            </select>
                        </div>

                        <button type="submit" disabled={isGenerating}
                                className="btn w-full">生成内容
                        </button>
                    </form>
                </div>
                <div className="w-full mt-2 flex justify-center items-center">
                    <div className="p-3 mb-2 bg-white rounded-lg shadow w-full max-w-3xl">
                        <div className="flex justify-center">
                            <textarea className="text-gray-800 w-full h-64" value={completion} readOnly/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
