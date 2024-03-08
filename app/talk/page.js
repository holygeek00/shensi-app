'use client'

import {useChat} from 'ai/react'
import Link from 'next/link'
import {useCallback, useEffect, useRef, useState} from 'react'
import Markdown from 'react-markdown'
import {useRouter} from 'next/navigation'
import remarkGfm from 'remark-gfm'
import './page.css'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {ZMessage} from "../../components/ui/toast";
import {NavTabLists} from "@/components/nav-tab-lists";

export default function Chat() {
    const [isSending, setIsSending] = useState(false) // 新增状态来追踪消息是否正在发送
    const [chatList, setChatList] = useState(undefined)
    const [key, setKey] = useState('')
    let [stateId, setStateId] = useState('')

    const chatBoxRef = useRef(null);

    let shensi_ai_chat = {
        state: {
            chats: [{
                id: "12345", title: "新对话-" + new Date().toLocaleString(),
                messages: [{
                    role: "assistant",
                    content: "I am ChatGPT, a large language model trained by OpenAI. Carefully heed the user's instructions. Respond using Markdown."
                }],
                config: {
                    model: "gpt-4-turbo",
                    max_tokens: 4000,
                    temperature: 1,
                    presence_penalty: 0,
                    top_p: 1,
                    frequency_penalty: 0
                },
                titleSet: false,
                currentState: true
            }]
        }, version: 1
    }

    useEffect(() => {
        // 在组件挂载后从 localStorage 中获取数据
        const storedKey = localStorage.getItem('key')
        if (storedKey) {
            setKey(storedKey)
        }

        let chatList = JSON.parse(window.localStorage.getItem("chatList"))

        if (chatList !== null || chatList != undefined) {

            shensi_ai_chat = chatList;
            // 设置消息
            setMessages(chatList.state.chats.at(-1).messages)
            setChatList(chatList)
            setStateId(chatList.state.chats.at(-1).id)
        } else {
            setChatList(shensi_ai_chat)
            window.localStorage.setItem("chatList", JSON.stringify(shensi_ai_chat))
        }
    }, [])

    const {messages, input, handleInputChange, handleSubmit, setMessages} = useChat({
        headers: {
            'authorization': key,
        }, onError: (error) => {
            console.error(error)
            if (JSON.parse(error.message).code === 401 || JSON.parse(error.message).code === 403) {
                ZMessage(JSON.parse(error.message).error + ", 请前往充值页面，及时充值！", {type: 'error'})
            } else {
                ZMessage(JSON.parse(error.message).error, {type: 'error'})
            }
        }, onFinish: (response) => {
            // 在每次有新的消息时，将它们存储到 localStorage 中
            let list = JSON.parse(window.localStorage.getItem("chatList"));
            console.log(list)
            let item = null;
            if (list === null) {
                if (stateId === '') {
                    item = shensi_ai_chat.state.chats.at(-1)
                    // console.log(stateId)
                } else {
                    item = shensi_ai_chat.state.chats.find(item => item.id === stateId)
                    // console.log(stateId)
                }
                // console.log(item)

                item.messages.push({
                    role: 'user', content: input
                })

                item.messages.push({
                    role: 'assistant', content: response.content
                })


                window.localStorage.setItem('chatList', JSON.stringify(shensi_ai_chat))
            } else {
                if (stateId === '') {
                    item = list.state.chats.at(-1)
                } else {
                    item = list.state.chats.find(item => item.id === stateId)
                }
                item.messages.push({
                    role: 'user', content: input
                })

                item.messages.push({
                    role: 'assistant', content: response.content
                })

                window.localStorage.setItem('chatList', JSON.stringify(list))
            }
        }, onResponse: (response) => {

        }
    });


    const endOfMessagesRef = useRef(null)

    const router = useRouter()
    useEffect(() => {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
        if (!accessToken) {
            router.push('/')
        }
    }, [router])


    const handleHistoryChat = (e) => {
        let list = JSON.parse(window.localStorage.getItem('chatList'));
        let findList = list.state.chats.find((item) => item.id === e.target.id)

        if (findList.id === e.target.id) {
            let chatbox = document.getElementsByClassName('chatbox')

            for (let i = 0; i < chatbox.length; i++) {
                chatbox[i].classList.remove('text-blue-500')
            }
            e.target.classList.add('text-blue-500')
        }
        setMessages(findList.messages)
        setStateId(e.target.id)
    }

    const createChat = () => {
        let list = JSON.parse(window.localStorage.getItem('chatList'))
        if (list !== null) {
            list.state.chats.push({
                id: 'id_' + Math.random().toString(36).substr(2, 9),
                title: "新对话-" + new Date().toLocaleString(),
                messages: [{
                    role: "assistant",
                    content: "I am ChatGPT, a large language model trained by OpenAI. Carefully heed the user's instructions. Respond using Markdown."
                }]
            })
            window.localStorage.setItem('chatList', JSON.stringify(list))
            setChatList(list)
            setMessages(list.state.chats[list.state.chats.length - 1].messages)

            const chatbox = document.querySelectorAll('.chatbox');
            chatbox[chatbox.length - 1].classList.add('text-blue-500')
            for (let i = 0; i < chatbox.length; i++) {
                console.log("what is i", i)
                chatbox[i].classList.remove('text-blue-500')
            }
        } else {
            window.localStorage.setItem('chatList', JSON.stringify(shensi_ai_chat))
            setChatList(shensi_ai_chat)
            const elementNodeListOf = document.querySelectorAll('.chatbox');
            elementNodeListOf[elementNodeListOf.length - 1].classList.add('text-blue-500')
        }
    }

    const submit = (e) => {
        if (e.key === "Enter") {
            if (input === '') {
                console.log("input is empty")
                return
            } else {
                handleSubmit(e)
            }
        }
    }

    const clearHistory = () => {
        const chatLists = JSON.parse(window.localStorage.getItem('chatList'));
        // 根据传入的id删除当前对话
        chatLists.state.chats.map((item, index) => {
            if (item.id === stateId) {
                item.messages = [{
                    role: "assistant",
                    content: "I am ChatGPT, a large language model trained by OpenAI. Carefully heed the user's instructions. Respond using Markdown."
                }]
            }
        })

        // 更新localStorage中的chatList
        window.localStorage.setItem('chatList', JSON.stringify(chatLists));
        // 更新chatList状态
        setChatList(chatLists)
    }

    useEffect(() => {
        // 每次添加新的对话内容时，自动将滚动条移动到页面的底部。
        if (endOfMessagesRef.current !== null) {
            endOfMessagesRef.current.scrollTop = endOfMessagesRef.current.scrollHeight;
            endOfMessagesRef.current.scrollIntoView({behavior: "smooth"});
        }

        return () => {
            hljs.highlightAll()
        }

    }, [shensi_ai_chat])

    useEffect(() => {
        const chatbox = document.getElementsByClassName('chatbox')
        if (chatbox !== null) {
            if (stateId !== null) {
                [...chatbox].map((item, index) => {
                    if (item.id === stateId) {
                        item.classList.add('text-blue-500')
                    } else {
                        item.classList.remove('text-blue-500')
                    }
                })
            } else {
                //选择最后一个
                [...chatbox].at(-1).classList.add('text-blue-500')
            }
        }
    }, [chatList])

    useEffect(() => {
        document.getElementById("userInput").addEventListener("keydown", submit);

        return () => {
            let input = document.getElementById("userInput")
            if (input !== null) input.removeEventListener("keydown", submit);
        }
    }, [input])

    return (<div className="bg-white w-screen h-screen overflow-hidden">
            {/*tab lists*/}
            <div className="fixed left-1/2 transform -translate-x-1/2 z-20 lg:my-2">
                <NavTabLists />
            </div>

            <div onSubmit={submit} className="w-full h-full mx-auto bg-white overflow-y-scroll flex flex-row">
                <div
                    className="2xl:w-[300px] xl:w-[300px] lg:w-[300px] md:w-[300px] sm:hidden md:block rounded h-screen overflow-y-scroll"
                    style={{"background": "#f0f4f9"}}>
                    <div className="flex flex-col">
                        <div className="w-full p-2">
                            <div
                                className="btn rounded-lg w-full btn-outline bg-gray-300 border-s-4 hover:border-gray-500 hover:text-black-100"
                                onClick={createChat}>新建对话
                            </div>
                        </div>
                        <div className="flex flex-col overflow-x-hidden p-2 pb-20 h-full">
                            {// 渲染对话列表
                                chatList !== undefined ? chatList.state.chats.map(item => (// eslint-disable-next-line react/jsx-key
                                    <div key={item.id} id={item.id}
                                         className="chatbox active:bg-blue-200 border-lime-200 border-b-gray-50 bg-white p-5 rounded-2xl m-2 rounded hover:bg-blue-200 cursor-pointer shadow-accent-content"
                                         onClick={handleHistoryChat}>
                                        {item.title}
                                        {/*<div className="mt-2">*/}
                                        {/*    <button className="btn btn-sm btn-info mr-1">Deny</button>*/}
                                        {/*    <button className="btn btn-sm mr-1">Accept</button>*/}
                                        {/*</div>*/}
                                    </div>)) : <div key={Math.random()}
                                                    className="bg-gray-200 p-5 m-2 rounded font-bold">没有对话</div>}
                        </div>
                    </div>
                </div>
                <div
                    id="chat"
                    className="sm:w-screen lg:w-1/2 lg:ml-[200px] md:w-full md:ml-[100px] translate-y-10 lg:p-10 sm:py-2 sm:my-10 rounded overflow-y-scroll">
                    <div className="md:w-full h-100 pl-100 pb-36">
                        {messages ? messages.map(m => (<div key={Math.random().toString()}
                                                            className="bg-white md:w-2/3 lg:w-full  self-center m-2">
                            <div className={m.role === 'user' ? "leading-normal" : ""}>
                                <div className="text-lg font-bold w-20 h-10">
                                    {m.role === 'user' ? '用户: ' : '深斯AI: '}
                                </div>
                                <div
                                    className={m.role === 'user' ? 'p-0 rounded-sm' : 'p-0.5 bg-gray-100 rounded'}>
                                    {/* eslint-disable-next-line react/no-children-prop */}
                                    <Markdown className={m.role === 'user' ? 'rounded' : 'markdown-body ='}
                                              markPlugins={[remarkGfm]}>{m.content}
                                    </Markdown>
                                </div>
                            </div>
                        </div>)) : (<div>加载中...</div>)
                        }
                    </div>
                    <div ref={endOfMessagesRef}/>
                </div>
            </div>
            <div
                className="lg:w-1/3 sm:w-full fixed left-1/2 right-1/2 bottom-2 -translate-x-1/2 flex flex-col items-start justify-center">
                <div className="lg:w-full sm:w-3/5">
                    <textarea
                        type="text"
                        name=""
                        id="userInput"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="输入您的问题"
                        className="lg:w-full lg:p-3.5 lg:h-20 bg-white text-gray-700 border border-gray-300 rounded-md
                                                  focus:border-indigo-500 focus:ring-indigo-500 p-3
                                                  transition duration-150 ease-in-out focus:outline-none"
                    />
                </div>
                <div className="w-52 flex flex-row justify-evenly">
                    <button
                        id="sendButton"
                        type="button"
                        onClick={handleSubmit}
                        className="btn md:w-auto h-12 ml-2 rounded-md bg-blue-500 hover:bg-indigo-500 text-white"
                    >
                        {isSending ? 'AI生成中...' : '发 送'} {/* 按钮文本根据发送状态变化 */}
                    </button>
                    <button onClick={clearHistory} className="btn text-white bg-black">清除当前对话</button>
                </div>
            </div>
        </div>


    )
}