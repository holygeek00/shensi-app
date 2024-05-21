'use client'
import React, {useState, useCallback, useEffect} from 'react'
import Navbar from '../../../components/Navbar'
import {useCompletion} from 'ai/react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {useAuthUser} from "@/lib/hooks/use-auth-user";
import {ReturnTabList} from "@/components/return-tab-list";

export default function LiveSalesCopyGenerator() {
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
    })
    const [isGenerating, setIsGenerating] = useState(false)

    const [generatedScript, setGeneratedScript] = useState('')
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
            'Authorization': key
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
        const messageContent = `生成带货脚本文案: 产品名称 "${formData.productName}"，产品简介 "${formData.productDescription}"...`
        setGeneratedScript('') // 清空现有内容
        const stream = await complete(messageContent) // 假设这返回一个流
        let newContent = ''
        for await (const chunk of stream) {
            newContent += chunk // 将每个块附加到新内容上
            setGeneratedScript(prevContent => prevContent + chunk) // 逐步更新生成的带货脚本文案状态
        }
        setIsGenerating(false) // 生成完毕后设置为 false

        return newContent // 如果直接更新状态，这可能不是必要的
    }, [complete, formData.productName, formData.productDescription])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (isGenerating) return // 如果正在生成内容，则不执行任何操作

        await checkAndPublish()
    }

    return (
        <div>
            <Navbar title='Shensi-AI写作-AI带货脚本文案生成器'></Navbar>
                  <ReturnTabList />
            <div
                className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-base-200 to-base-400 p-4">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
                    <p className="mb-6 text-gray-500">AI带货脚本文案生成器，一键生成节奏紧凑、吸引力强的直播间带货脚本文案</p>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="text-gray-700">产品名称*</label>
                            <input type="text" name="productName" placeholder="如：牛仔半身裙"
                                   className="input input-bordered w-full" value={formData.productName}
                                   onChange={handleFormInputChange}/>
                        </div>
                        <div>
                            <label className="text-gray-700">产品简介*</label>
                            <textarea name="productDescription" placeholder="如：显瘦A字版型，复古牛仔蓝"
                                      className="textarea textarea-bordered w-full" value={formData.productDescription}
                                      onChange={handleFormInputChange}/>
                        </div>

                        <button type="submit" className="btn w-full" disabled={isGenerating}>生成内容</button>
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
