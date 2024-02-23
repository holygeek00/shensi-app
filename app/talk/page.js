'use client'

import {useChat} from 'ai/react'
import Navbar from '../components/navbar'
import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import Markdown from 'react-markdown'
import {useRouter} from 'next/navigation'

export default function Chat() {
    const [isSending, setIsSending] = useState(false) // 新增状态来追踪消息是否正在发送
    const [chatList, setChatList] = useState([])
    const [key, setKey] = useState('')
    useEffect(() => {
        // 在组件挂载后从 localStorage 中获取数据
        const storedKey = localStorage.getItem('key')
        if (storedKey) {
            setKey(storedKey)
        }
    }, [])

    const {messages, input, handleInputChange, handleSubmit, setMessages} = useChat({
        headers: {
            'Authorization': key,
        },
        onError: (error) => {
            console.error(error)
        },
        onFinish: (response) => {
            // 在每次有新的消息时，将它们存储到 localStorage 中
            let message = window.localStorage.getItem("messages");
            console.log(message)
            if (message === null) {
                window.localStorage.setItem('messages', JSON.stringify([{
                    role: 'user',
                    content: input
                }, {
                    role: 'assistant',
                    content: response.content
                }]))
            } else {
                window.localStorage.setItem('messages', JSON.stringify([...JSON.parse(message), {
                    role: 'user',
                    content: input
                }, {
                    role: 'assistant',
                    content: response.content
                }]))
            }
        },
        onResponse:
            (response) => {
                console.log(response)
            }
    });


    const endOfMessagesRef = useRef(null)

    // const handleSubmit = (e) => {
    //     setIsSending(true) // 开始发送消息，设置 isSending 为 true
    //     handleChatSubmit();
    // }


    const router = useRouter()
    useEffect(() => {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
        if (!accessToken) {
            router.push('../login')
        }
    }, [router])


    useEffect(() => {

        setChatList(JSON.parse(window.localStorage.getItem('messages')))

        const userInput = document.getElementById("userInput");

        userInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                // 当按下回车键时执行的操作
                console.log('Enter key pressed', userInput.value)
                console.log(messages, input)
                // handleSubmit(event);
            }
        });
    }, []);


    const handleHistoryChat = (index) => {
        setMessages(chatList)
    }

    return (
        <div className="bg-white w-screen h-screen overflow-hidden">
            <div className="fixed left-1/2 transform -translate-x-1/2 z-20 my-5">
                <div role="tablist" className="tabs tabs-boxed w-96">
                    <Link href='./write' legacyBehavior>
                        <a role="tab" className="tab hover:bg-blue-200">AI写作</a>
                    </Link>
                    <a role="tab" className="tab tab-active hover:bg-blue-200">AI对话</a>
                    <Link href='./image' legacyBehavior>
                        <a role="tab" className="tab hover:bg-blue-200">AI绘画</a>
                    </Link>
                </div>
            </div>

            <div className="w-full h-screen flex flex-row mx-auto bg-white">
                <div className="lg:w-[300px] h-screen bg-black rounded bg-transparent/200">
                    <div className="flex flex-col h-full">
                        <div className="w-full">
                            <div className="btn rounded-sm w-full">新建对话</div>
                        </div>
                        <div className="flex flex-col overflow-hidden p-2 pb-20 h-full">
                            <h3 className="bg-gray-200 p-2 rounded font-bold" onClick={handleHistoryChat}>
                                {
                                    chatList[0] === undefined ? '' : chatList[0].content
                                }
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:w-full sm:w-screen min-h-full overflow-hidden">
                    <div className="h-100 mt-24 overflow-y-scroll p-2 pb-20 overflow-hidden">
                        {
                            messages ? messages.map(m => (
                                    <div key={m.id} className="bg-white md:w-2/3 w-full  self-center m-2">
                                        <div className={m.role === 'user' ? "chat chat-start" : "chat chat-start"}>
                                            <div className="chat-header text-lg font-bold">
                                                {m.role === 'user' ? '用户: ' : '深斯AI: '}
                                            </div>
                                            <div className='chat-bubble bg-blue-100 text-black markdown'
                                                 style={{color: 'black'}}>
                                                <Markdown className="markdown">
                                                    {m.content}
                                                </Markdown>
                                            </div>
                                        </div>
                                    </div>
                                )) : // 显示messages数组中的消息
                                messages.map(m => (
                                    <div key={m.id} className="bg-white md:w-2/3 w-full  self-center m-2">
                                        <div className={m.role === 'user' ? "chat chat-start" : "chat chat-start"}>
                                            <div className="chat-header text-lg font-bold">
                                                {m.role === 'user' ? '用户: ' : '深斯AI: '}
                                            </div>
                                            <div className='chat-bubble bg-blue-100 text-black markdown'
                                                 style={{color: 'black'}}>
                                                <Markdown>
                                                    {m.content}
                                                </Markdown>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                        <div ref={endOfMessagesRef}/>
                    </div>
                    <div
                        className="w-screen lg:w-full fixed lg:left-1/2 lg:transform lg:-translate-x-1/2 sm:ml-3 sm:w-screen fixed self-center bottom-0 sm:p-0 pl-2 md:max-w-md sm:mb-3 flex flex-row items-center">
                        <div className="lg:w-11/12 sm:w-10/12 sm:">
                            <input
                                type="text"
                                name=""
                                id="userInput"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="输入您的问题"
                                className="lg:w-full bg-white text-gray-700 border border-gray-300 rounded-md
                                                  focus:border-indigo-500 focus:ring-indigo-500 block w-full p-2.5
                                                  transition duration-150 ease-in-out focus:outline-none p-2"
                            />
                        </div>
                        <div className="relative sm:w-1/4">
                            <button
                                id="sendButton"
                                type="button"
                                onClick={handleSubmit}
                                className="btn md:w-auto h-12 ml-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                {isSending ? 'AI生成中...' : '发 送'} {/* 按钮文本根据发送状态变化 */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}