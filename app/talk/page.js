'use client'

import {useChat} from 'ai/react'
import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import Markdown from 'react-markdown'
import {useRouter} from 'next/navigation'
import remarkGfm from 'remark-gfm'
import './page.css'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default function Chat() {
    const [isSending, setIsSending] = useState(false) // 新增状态来追踪消息是否正在发送
    const [chatList, setChatList] = useState(undefined)
    const [key, setKey] = useState('')
    let [stateId, setStateId] = useState('')
    let shensi_ai_chat = {
        state: {
            chats: [{
                id: "12345", title: "新对话-" + new Date().toLocaleString(), messages: [{
                    role: "assistant",
                    content: "I am ChatGPT, a large language model trained by OpenAI. Carefully heed the user's instructions. Respond using Markdown."
                }], config: {
                    model: "gpt-4-turbo",
                    max_tokens: 4000,
                    temperature: 1,
                    presence_penalty: 0,
                    top_p: 1,
                    frequency_penalty: 0
                }, titleSet: false
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

        // console.log(chatList)

        if (chatList !== null || chatList != undefined) {
            // console.log(2)
            // console.log(chatList)
            shensi_ai_chat = chatList;
            // 设置消息
            setMessages(chatList.state.chats.at(-1).messages)
            setChatList(chatList)
        } else {
            // console.log(1)
            setChatList(shensi_ai_chat)
            window.localStorage.setItem("chatList", JSON.stringify(shensi_ai_chat))
        }

    }, [])

    const {messages, input, handleInputChange, handleSubmit, setMessages} = useChat({
        headers: {
            'Authorization': key,
        }, onError: (error) => {
            console.error(error)
        }, onFinish: (response) => {
            // 在每次有新的消息时，将它们存储到 localStorage 中
            let list = JSON.parse(window.localStorage.getItem("chatList"));
            // console.log(list)
            let item = null;
            if (list === null) {

                // let item = shensi_ai_chat.state.chats.find(item => item.id === statusId)

                // console.log(shensi_ai_chat)
                //拿到数组最后一个元素
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

                // console.log(shensi_ai_chat)

                window.localStorage.setItem('chatList', JSON.stringify(shensi_ai_chat))
            } else {
                if (stateId === '') {
                    item = list.state.chats.at(-1)
                    // console.log(stateId)
                } else {
                    console.log(shensi_ai_chat)
                    item = list.state.chats.find(item => item.id === stateId)
                    // console.log(item)
                    // console.log(stateId)
                }
                // console.log(item)
                item.messages.push({
                    role: 'user', content: input
                })

                item.messages.push({
                    role: 'assistant', content: response.content
                })
                // console.log(item)
                // console.log(list)
                window.localStorage.setItem('chatList', JSON.stringify(list))
                const theme = "github"; // 这里使用 'atom-one-dark' 主题，你可以选择其他主题
                hljs.configure({
                    tabReplace: "    ", // 使用 4 个空格替换制表符
                    useBR: false, // 使用 <br> 标签替换换行符
                    languages: [], // 指定要支持的语言，留空表示支持所有语言
                    theme: theme, // 设置主题色
                });
                hljs.highlightAll();
            }
        }, onResponse: (response) => {
            console.log(response)
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
        console.log(e.target)
        e.target.style.color = "blue"
        e.target.style.border = "1px solid blue"
        let list = JSON.parse(window.localStorage.getItem('chatList'));
        let findList = list.state.chats.find((item) => item.id === e.target.id)
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
        } else {
            window.localStorage.setItem('chatList', JSON.stringify(shensi_ai_chat))
            setChatList(shensi_ai_chat)
        }
    }

    useEffect(() =>{
        const theme = "atom-one-dark"; // 这里使用 'atom-one-dark' 主题，你可以选择其他主题
        hljs.configure({
            tabReplace: "    ",
            useBR: false,
            languages: []
        });
        hljs.highlightAll();
    }, [shensi_ai_chat])

    return (
        <div className="bg-white w-screen h-screen overflow-hidden">
            {/*tab lists*/}
            <div className="fixed left-1/2 transform -translate-x-1/2 z-20 lg:my-2">
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

            <div className="w-full h-full mx-auto bg-white overflow-y-scroll">
                <div
                    className="2xl:w-[300px] xl:w-[300px] lg:w-[300px] md:w-[300px] sm:hidden md:block bg-black rounded bg-transparent/200 fixed h-screen">
                    <div className="flex flex-col">
                        <div className="w-full">
                            <div className="btn rounded-sm w-full" onClick={createChat}>新建对话</div>
                        </div>
                        <div className="flex flex-col overflow-x-hidden p-2 pb-20 h-full">
                            {// 渲染对话列表
                                chatList !== undefined ? chatList.state.chats.map(item => (// eslint-disable-next-line react/jsx-key
                                    <div key={item.id} id={item.id}
                                         className="active:bg-blue-200 border-lime-200 border-b-gray-50 bg-gray-200 p-5 m-2 rounded hover:bg-blue-200 cursor-pointer"
                                         onClick={handleHistoryChat}>
                                        {item.title}
                                    </div>)) : <h3 key={Math.random()}
                                                   className="bg-gray-200 p-5 m-2 rounded font-bold">没有对话</h3>}
                        </div>
                    </div>
                </div>
                <div
                    className="sm:w-screen lg:w-1/2 lg:translate-x-1/2 translate-y-10 lg:p-10 sm:py-2 sm:my-10 rounded overflow-y-scroll">
                    <div className="h-100 pl-100 pb-20">
                        {messages ? messages.map(m => (<div key={Math.random().toString()}
                                                            className="bg-white md:w-2/3 lg:w-full  self-center m-2">
                                <div className={m.role === 'user' ? "leading-normal" : ""}>
                                    <div className="text-lg font-bold w-20 h-10">
                                        {m.role === 'user' ? '用户: ' : '深斯AI: '}
                                    </div>
                                    <div
                                        className={m.role === 'user' ? 'p-0 rounded-sm' : 'p-0.5 bg-gray-100 rounded'}>
                                        {/* eslint-disable-next-line react/no-children-prop */}
                                        <Markdown className={m.role === 'user' ? 'rounded' : 'markdown-body'}
                                                  markPlugins={[remarkGfm]}>{m.content}
                                        </Markdown>
                                    </div>
                                </div>
                            </div>)) : // 显示messages数组中的消息
                            messages.map(m => (<div key={m.id} className="bg-white md:w-2/3 w-full  self-center m-2">
                                <div className={m.role === 'user' ? "" : ""}>
                                    <div className="text-lg font-bold">
                                        {m.role === 'user' ? '用户: ' : '深斯AI: '}
                                    </div>
                                    <div className="mockup-code"
                                         style={{color: 'black'}}>
                                        <Markdown className=""
                                                  remarkPlugins={[remarkGfm]}>
                                            {m.content}
                                        </Markdown>
                                    </div>
                                </div>
                            </div>))}
                        {/*<div ref={endOfMessagesRef}/>*/}
                    </div>
                </div>
            </div>
            <div
                className="lg:w-1/3 sm:w-full fixed left-1/2 right-1/2 bottom-2 -translate-x-1/2 flex flex-row items-center justify-center">
                <div className="lg:w-11/12 sm:w-3/5">
                    <input
                        type="text"
                        name=""
                        id="userInput"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="输入您的问题"
                        className="lg:w-full lg:p-3.5 bg-white text-gray-700 border border-gray-300 rounded-md
                                                  focus:border-indigo-500 focus:ring-indigo-500 p-3
                                                  transition duration-150 ease-in-out focus:outline-none"
                    />
                </div>
                <div className="w-20">
                    <button
                        id="sendButton"
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-info md:w-auto h-12 ml-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        {isSending ? 'AI生成中...' : '发 送'} {/* 按钮文本根据发送状态变化 */}
                    </button>
                </div>
            </div>
        </div>


    )
}