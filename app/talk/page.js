'use client'

import {useChat} from 'ai/react'
import Navbar from '../components/navbar'
import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import Markdown from 'react-markdown'
import {useRouter} from 'next/navigation'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default function Chat() {
    const [isSending, setIsSending] = useState(false) // 新增状态来追踪消息是否正在发送
    const [chatList, setChatList] = useState(undefined)
    const [key, setKey] = useState('')
    let statusId = "12345";
    let shensi_ai_chat = {
        state: {
            chats: [{
                id: "12345",
                title: "New Chat 1",
                messages: [{
                    role: "assistant",
                    content: "You are ChatGPT, a large language model trained by OpenAI.\\nCarefully heed the user's instructions. \\nRespond using Markdown."
                }],
                config: {
                    model: "gpt-3.5-turbo",
                    max_tokens: 4000,
                    temperature: 1,
                    presence_penalty: 0,
                    top_p: 1,
                    frequency_penalty: 0
                },
                titleSet: false
            }]
        },
        version: 1
    }

    useEffect(() => {
        // 在组件挂载后从 localStorage 中获取数据
        const storedKey = localStorage.getItem('key')
        if (storedKey) {
            setKey(storedKey)
        }

        let chatList = JSON.parse(window.localStorage.getItem("chatList"))

        if (chatList !== null ) shensi_ai_chat = chatList;
        setChatList(shensi_ai_chat)

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
            let list = JSON.parse(window.localStorage.getItem("chatList"));
            console.log(list)
            if (list === null) {

                // let item = shensi_ai_chat.state.chats.find(item => item.id === statusId)

                console.log(shensi_ai_chat)
                //拿到数组最后一个元素

                let item = shensi_ai_chat.state.chats.at(-1)

                item.messages.push({
                    role: 'user',
                    content: input
                })

                item.messages.push({
                    role: 'assistant',
                    content: response.content
                })

                console.log(shensi_ai_chat)

                window.localStorage.setItem('chatList', JSON.stringify(shensi_ai_chat))
            } else {
                let item = list.state.chats.find(item => item.id === statusId)
                item.messages.push({
                    role: 'user',
                    content: input
                })

                item.messages.push({
                    role: 'assistant',
                    content: response.content
                })
                window.localStorage.setItem('chatList', JSON.stringify(list))
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


    const handleHistoryChat = (index) => {
        console.log(index)
        let list = JSON.parse(window.localStorage.getItem('chatList'));
        console.log((list.state.chats[0].messages));
        setMessages(list.state.chats[0].messages)
    }

    const createChat = () => {
        let list = JSON.parse(window.localStorage.getItem('chatList'))
        if(list !== null ){
            list.state.chats.push(
                {
                    id: 'id_' + Math.random().toString(36).substr(2, 9),
                    title: "New Chat 1",
                    messages: [{
                        role: "assistant",
                        content: "You are ChatGPT, a large language model trained by OpenAI.\\nCarefully heed the user's instructions. \\nRespond using Markdown."
                    }]
                }
            )
            window.localStorage.setItem('chatList', JSON.stringify(list))
            setChatList(list)
            console.log(list)
        }else{
            window.alert("别他妈的打开了")
        }
    }

    const handleCurrentChat = () => {

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
                            <div className="btn rounded-sm w-full" onClick={createChat}>新建对话</div>
                        </div>
                        <div className="flex flex-col overflow-x-hidden p-2 pb-20 h-full">
                            {

                                // 渲染对话列表
                                chatList !== undefined ? chatList.state.chats.map(item => (
                                // eslint-disable-next-line react/jsx-key
                                <h3 className="bg-gray-200 p-5 m-2 rounded font-bold" onClick={handleHistoryChat}>
                            {item.title}
                        </h3>)) : <p>1</p>
                            }

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
                                            <div className='chat-bubble bg-white-100 text-white'>
                                                <Markdown rehypePlugins={[rehypeHighlight]}>
                                                    {/*{m.content}*/}
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
                                                <Markdown rehypePlugins={[rehypeHighlight]}>
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