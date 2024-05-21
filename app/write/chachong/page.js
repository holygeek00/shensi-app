'use client'
import React, {useState, useCallback, useEffect} from 'react'
import Navbar from '../../../components/Navbar'
import {useCompletion} from 'ai/react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {useAuthUser} from "@/lib/hooks/use-auth-user";
import {MarkdownPreview} from "../../../components/markdown";
import {ReturnTabList} from "@/components/return-tab-list";

export default function AcademicPaperGenerator() {
    const [formData, setFormData] = useState({
        title: '',
        keywords: '',
    })

    const {checkToken} = useAuthUser()
    const [isGenerating, setIsGenerating] = useState(false)

    const [paperContent, setPaperContent] = useState('')

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
        }
    })


    const handleFormInputChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const router = useRouter()
    useEffect(() => {
        checkToken(router)
    }, [router])

    const checkAndPublish = useCallback(async () => {
        setIsGenerating(true) // 开始生成时设置为 true
        // 生成一段论文查重的prompt

        const messageContent = `文章内容: ${formData.title}\n修改方式: ${formData.keywords}\n\n请根据修改方式进行文章修改`

        setPaperContent('') // Clear existing content
        const stream = await complete(messageContent) // Assuming this returns a stream
        let newContent = ''
        for await (const chunk of stream) {
            newContent += chunk // Append each chunk to the newContent
            setPaperContent(prevContent => prevContent + chunk) // Update the paperContent state progressively
        }
        setIsGenerating(false) // 生成完毕后设置为 false

        return newContent // This may not be necessary if you're updating the state directly
    }, [complete, formData.title, formData.keywords])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (isGenerating) return
        await checkAndPublish()
    }

    return (
        <div>
            <Navbar title='Shensi-AI论文查重'></Navbar>
            <ReturnTabList />
            <div
                className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-base-200 to-base-400 p-4">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
                <p className="mb-6 text-gray-500">输入论文需要查重的部分，不可超过500字，可分段查重更改</p>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>

                        <div className="text-gray-700 mb-2">论文去重部分</div>
                        <textarea name="title" placeholder="请输入论文查重部分"
                                  className="w-full px-3 py-3 h-20 rounded-b-box border-indigo-50 border-2 border-r-2 focus:outline-none focus:ring-0 focus:border-indigo-50"
                                  value={formData.title}
                                  onChange={handleFormInputChange}/>
                    </div>
                    <div>
                        <div className="text-gray-700 mb-2">选择如何更改</div>
                        <select className="select select-bordered w-full focus:outline-0 focus:ring-indigo-300"
                                name="keywords"
                                onChange={handleFormInputChange}>
                            <option className="disabled select">请选择对文本更改的方式</option>
                            <option value="删除或合并重复或冗余的部分">删除或合并重复或冗余的部分</option>
                            <option value="改变词语和句子的表达方式">改变词语和句子的表达方式</option>
                            <option value="修改文章结构">修改文章结构</option>
                            <option value="削减内容">削减内容</option>
                            <option value="使用引用和注释">使用引用和注释</option>
                        </select>
                    </div>

                    <button type="submit" disabled={isGenerating}
                            className="btn w-full">生成新文本
                    </button>
                </form>
            </div>
                <div className="w-full mt-2 flex justify-center items-center">
                    <div className="p-3 mb-2 bg-white rounded-lg shadow w-full max-w-3xl">
                        <div className="flex justify-center">
                            <MarkdownPreview markdown={completion}/>
                            {/*<textarea className="text-gray-800 w-full h-64" value={completion} readOnly/>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
