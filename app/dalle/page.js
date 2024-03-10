'use client'
import {useChat} from 'ai/react'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import Markdown from 'react-markdown'
import {useRouter} from 'next/navigation'
import {NavTabLists} from "@/components/nav-tab-lists";

export default function Chat() {


    const [key, setKey] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false) // New state variable
    useEffect(() => {
        const storedKey = localStorage.getItem('key')
        if (storedKey) {
            setKey(storedKey)
        }
    }, [])

    const {messages, input, handleInputChange, handleSubmit} = useChat({
        api: '/api/dalle',
        headers: {
            'Authorization': key,
        },
    })

    const endOfMessagesRef = useRef(null)
    const router = useRouter()
    useEffect(() => {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
        if (!accessToken) {
            router.push('../login')
        }
    }, [router])
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    const handleImageGeneration = async () => {
        setIsLoading(true) // Start loading when dalle generation starts
        try {
            const response = await fetch('/api/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': key
                },
                body: JSON.stringify({messages: input})
            })
            const data = await response.json()
            setImageUrl(data.image_url) // Add new dalle URL to the array
        } catch (error) {
            console.error('Error generating dalle:', error)
        } finally {
            setIsLoading(false) // Stop loading after dalle generation finishes
        }
    }
    // 确保 'messages' 不为空
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null
    const handleFormSubmit = (e) => {
        e.preventDefault()
        // handleSubmit(e)
        handleImageGeneration()
    }

    return (
        <div className="bg-transparent h-screen">
            <Navbar title='深斯AI'></Navbar>
            <div className="flex justify-center">
                <div className="flex justify-center sticky top-0 left-1/2 z-50 mb-20 pointer-events-none">
                    <NavTabLists tabList={[
                        {id: 1, name: 'AI写作', link: '/write'},
                        {id: 2, name: 'AI对话', link: '/talk'},
                        {id: 3, name: 'AI绘画', link: '/dalle'},
                    ]}/>
                </div>
            </div>

            <div className="flex flex-col w-full mx-auto bg-transparent">
                <div className="flex flex-col flex-grow overflow-auto pb-20">
                    <div className="flex flex-col flex-grow overflow-auto pb-20">


                        <div className="flex flex-col items-center justify-center h-full">
                            {isLoading ? (
                                    <div className="flex flex-col items-center space-y-2">
                                        {"稍等片刻即生成您想要的图片"}
                                        <span
                                            className="loading loading-spinner w-10 h-10 flex items-center justify-center"></span>
                                    </div>
                                ) :
                                <div className="flex flex-col items-center space-y-2">
                                    <div>
                                        <div className="mx-auto flex max-w-6xl justify-center px-6 lg:px-8">
                                            <div className="mt-8 flow-root sm:mt-16">
                                                {imageUrl ? (
                                                    <div
                                                        className="-m-2 w-fit rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10  lg:-m-4 lg:rounded-2xl lg:p-4">
                                                        <img src={imageUrl} alt={`Generated from AI `}
                                                             className="mx-auton border-none"/>
                                                    </div>
                                                ) : (
                                                    <div className="text-center text-gray-500">
                                                        例如输入关键词：一只可爱的小猫
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>


                </div>

                <form onSubmit={handleFormSubmit}
                      className="fixed self-center bottom-0 w-full px-4 pb-4 md:max-w-md rounded-lg">
                    <div className="form-control flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <input
                            type="text"
                            className="border flex-grow input-bordered focus:outline-0 focus:ring-1 focus:ring-indigo-300 h-12 text-lg rounded px-4" // 使用flex-grow让输入框填满可用空间
                            value={input}
                            placeholder="输入您的问题"
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="submit"
                            className="btn w-full md:w-auto h-12 rounded bg-blue-500 hover:bg-blue-600 text-white" // 将按钮和输入框并排放置
                        >
                            发 送
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
