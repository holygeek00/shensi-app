'use client'

import {useChat} from 'ai/react'
import {useEffect, useRef, useState} from 'react'
import Markdown from 'react-markdown'
import {useRouter} from 'next/navigation'
import remarkGfm from 'remark-gfm'
import './page.css'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {ZMessage} from "../../components/ui/toast";
import {NavTabLists} from "@/components/nav-tab-lists";
import {useAuthUser} from "@/lib/hooks/use-auth-user";

export default function Chat() {
    const [isSending, setIsSending] = useState(false) // 新增状态来追踪消息是否正在发送
    const [chatList, setChatList] = useState(undefined)
    const [key, setKey] = useState('')
    let [stateId, setStateId] = useState('')
    const [model, setModel] = useState('gpt-4-0125-preview')
    let deleteChatArray = []

    let shensi_ai_chat = {
        state: {
            chats: [{
                id: "12345", title: "新对话-" + new Date().toLocaleString(),
                messages: [{
                    role: "assistant",
                    content: "我是深斯AI对话助手, 请问有什么可以帮助你的吗？ "
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
        }, version: '1.0-preview.0'
    }

    useEffect(() => {
        const storedKey = localStorage.getItem('key')
        if (storedKey) {
            setKey(storedKey)
        }

        let chatList = JSON.parse(window.localStorage.getItem("chatList"))

        if (chatList !== null || chatList != undefined) {

            shensi_ai_chat = chatList;
            if (chatList.state.chats.length > 0) {
                // 设置消息
                setMessages(chatList.state.chats.at(-1).messages)
                setChatList(chatList)
                setStateId(chatList.state.chats.at(-1).id)
            } else {
                setMessages([{
                    role: "assistant",
                    content: "我是深斯AI对话助手, 请问有什么可以帮助你的吗？ "
                }])
                chatList.state.chats.push({
                    id: "12345", title: "新对话-" + new Date().toLocaleString(),
                    messages: [{
                        role: "assistant",
                        content: "我是深斯AI对话助手, 请问有什么可以帮助你的吗？ "
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
                })
                window.localStorage.setItem("chatList", JSON.stringify(chatList))
            }
        } else {
            setChatList(shensi_ai_chat)
            window.localStorage.setItem("chatList", JSON.stringify(shensi_ai_chat))
        }
    }, [])

    const {messages, input, handleInputChange, handleSubmit, setMessages} = useChat({
        headers: {
            'Authorization': key,
            'Content-Type': 'application/json'
        },
        body: {
            model
        },
        onError: (error) => {
            console.error(error)
            if (JSON.parse(error.message).code === 401 || JSON.parse(error.message).code === 403) {
                ZMessage(JSON.parse(error.message).error + ", 请前往充值页面，及时充值！", {type: 'error'})
            } else {
                ZMessage(JSON.parse(error.message).error, {type: 'error'})
            }
        }, onFinish: (response) => {
            // 在每次有新的消息时，将它们存储到 localStorage 中
            let list = JSON.parse(window.localStorage.getItem("chatList"));
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
    const {checkToken} = useAuthUser()
    useEffect(() => {
        checkToken()
    }, [router])


    const handleHistoryChat = (e) => {
        let list = JSON.parse(window.localStorage.getItem('chatList'));
        let findList = list.state.chats.find((item) => item.id === e.target.id)

        if (findList.id === e.target.id) {
            let chatBox = document.getElementsByClassName('chatBox')

            for (let i = 0; i < chatBox.length; i++) {
                chatBox[i].classList.remove('text-blue-500')
            }
            e.target.classList.add('text-blue-500')
            // stateId = id;
        }
        setMessages(findList.messages)
        setStateId(e.target.id)
    }

    const createChat = () => {
        document.querySelectorAll('.delete-checkbox').forEach((checkbox) => {
            if (!checkbox.classList.contains('hidden')) {
                checkbox.classList.add('hidden')
            }
        })
        let list = JSON.parse(window.localStorage.getItem('chatList'))
        if (list !== null) {
            list.state.chats.push({
                id: 'id_' + Math.random().toString(36).substr(2, 9),
                title: "新对话-" + new Date().toLocaleString(),
                messages: [{
                    role: "assistant",
                    content: "我是深斯AI对话助手, 请问有什么可以帮助你的吗？ "
                }]
            })
            window.localStorage.setItem('chatList', JSON.stringify(list))
            setChatList(list)
            setMessages(list.state.chats[list.state.chats.length - 1].messages)

            setStateId(list.state.chats[list.state.chats.length - 1].id)
        } else {
            window.localStorage.setItem('chatList', JSON.stringify(shensi_ai_chat))
            setChatList(shensi_ai_chat)
            const elementNodeListOf = document.querySelectorAll('.chatBox');
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
                    content: "我是深斯AI对话助手, 请问有什么可以帮助你的吗？ "
                }]
                setMessages(item.messages)
            }
        })

        // 更新localStorage中的chatList
        window.localStorage.setItem('chatList', JSON.stringify(chatLists));
    }

    const deleteAnyChat = (id) => {
        deleteChatArray.push(id)

        const chatLists = JSON.parse(window.localStorage.getItem('chatList'));

        // 根据传入的id删除当前对话
        chatLists.state.chats.map((item, index) => {
            if (item.id === id) {
                chatLists.state.chats.splice(index, 1)
            }
        })

        setChatList(chatLists)

        // 不仅要更新当前历史对话列表，还需要将当前stateId进行设置，只有这样才能将当前对话的上一个对话进行标注
        setStateId(chatLists.state.chats.at(-1).id)

        // 更新localStorage中的chatList
        window.localStorage.setItem('chatList', JSON.stringify(chatLists));
    }

    const handleDeleteClick = () => {
        document.querySelectorAll('.delete-checkbox').forEach((checkbox) => {
            if (checkbox.classList.contains('hidden')) {
                checkbox.classList.remove('hidden')
            } else {
                checkbox.classList.add('hidden')
            }
        })
    }

    useEffect(() => {
        if (endOfMessagesRef.current !== null) {
            endOfMessagesRef.current.scrollTop = endOfMessagesRef.current.scrollHeight;
            endOfMessagesRef.current.scrollIntoView({behavior: "smooth"});
        }

        return () => {
            hljs.highlightAll()
        }

    }, [shensi_ai_chat])

    useEffect(() => {
        const chatBox = document.getElementsByClassName('chatBox')
        if (chatBox !== null) {
            if (stateId !== null) {
                [...chatBox].map((item, index) => {
                    if (item.id === stateId) {
                        item.classList.add('text-blue-500')
                    } else {
                        item.classList.remove('text-blue-500')
                    }
                })
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

            <div className="flex justify-center w-96 absolute left-1/2 -translate-x-1/2 mb-20">
                <NavTabLists tabList={[
                    {id: 1, name: 'AI写作', link: '/write'},
                    {id: 2, name: 'AI对话', link: '/talk'},
                    {id: 3, name: 'AI绘画', link: '/dalle'},
                ]}/>
            </div>

            <div onSubmit={submit} className="w-full h-full mx-auto bg-white overflow-y-scroll flex flex-row">
                <div
                    className="2xl:w-[300px] xl:w-[300px] lg:w-[300px] md:w-[300px] sm:hidden md:block rounded h-screen overflow-y-scroll"
                    style={{"background": "#f0f4f9"}}>
                    <div className="flex flex-col">
                        <div className="w-full p-2">
                            <div
                                className="btn rounded-lg w-full btn-primary border-s-4 hover:border-gray-500 hover:text-black-100"
                                onClick={createChat}>新建对话
                            </div>
                        </div>
                        <div className="flex flex-col overflow-x-hidden p-2 pb-20 h-full">
                            {
                                chatList !== undefined ? chatList.state.chats.map(item => (
                                        // eslint-disable-next-line react/jsx-key
                                        <div key={item.id} className="flex flex-row justify-between items-center">
                                            <input type="checkbox" onClick={e => deleteAnyChat(item.id)}
                                                   className="delete-checkbox checkbox-sm checkbox-info hidden"/>
                                            <div key={item.id} id={item.id}
                                                 className="chatBox border-2 border-blue-500 active:bg-blue-200 border-lime-200 border-b-gray-50 bg-white p-5 rounded-lg m-2 hover:bg-blue-200 cursor-pointer shadow-accent-content"
                                                 onClick={handleHistoryChat}>
                                                {item.title}
                                            </div>
                                        </div>
                                    ))
                                    : <div key={Math.random()} className="bg-gray-200 p-5 m-2 rounded font-bold">没有对话
                                    </div>
                            }

                            <div className="flex flex-row items-center absolute left-0 bottom-0 w-[300px]">
                                <button className="btn btn-block bg-black w-1/2 text-white focus:bg-indigo-500"
                                        onClick={handleDeleteClick}>删除对话
                                </button>
                                <button className="btn btn-block bg-black w-1/2 text-white"
                                        onClick={e => router.push('/pay')}>充值中心
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="chat"
                    className="sm:w-screen lg:w-1/2 lg:ml-[200px] md:w-full md:ml-[100px] translate-y-10 lg:p-10 sm:py-2 sm:my-10 rounded overflow-y-scroll">
                    <div className="md:w-full h-100 pl-100 pb-36">
                        {messages ? messages.map(m => (<div key={Math.random().toString()}
                                                            className="bg-white md:w-2/3 lg:w-full self-center m-2">
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
                className="lg:w-1/3 sm:w-screen fixed lg:left-1/2 lg:right-1/2 bottom-2 lg:-translate-x-1/2 flex flex-col justify-start">
                <div className="lg:w-full sm:w-11/12 sm:m-auto">
                    <textarea
                        type="text"
                        name=""
                        id="userInput"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="输入您的问题"
                        className="lg:w-full lg:p-3.5 lg:h-20 bg-white sm:w-full text-gray-700 border border-gray-300 rounded
                                                  focus:border-indigo-500 focus:ring-indigo-500 p-3
                                                  transition duration-150 ease-in-out focus:outline-none"
                    />
                </div>
                <div className="w-52 lg:m-0 sm:w-11/12 sm:m-auto flex flex-row justify-start mt-2">
                    <button
                        id="sendButton"
                        type="button"
                        onClick={handleSubmit}
                        className="btn md:w-auto h-12 rounded-md bg-blue-500 hover:bg-indigo-500 text-white"
                    >
                        {isSending ? 'AI生成中...' : '发 送'} {/* 按钮文本根据发送状态变化 */}
                    </button>
                    <select
                        className="select select-bordered outline-0 focus:outline-0 focus:ring-1 focus:ring-indigo-100 w-full max-w-36"
                        onChange={(e) => setModel(e.target.value)}>
                        <option>gpt-4-0125-preview</option>
                        <option>gpt-3.5-turbo</option>
                    </select>
                    <button onClick={clearHistory} className="btn text-white bg-black">清除当前对话</button>
                </div>
            </div>
        </div>


    )
}