'use client'

import {useChat} from 'ai/react'
import {useEffect, useRef, useState} from 'react'
import Markdown from 'react-markdown'
import {useRouter} from 'next/navigation'
import remarkGfm from 'remark-gfm'
import './page.css'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {ZMessage} from "@/components/ui/toast";
import {NavTabLists} from "@/components/nav-tab-lists";
import {useAuthUser} from "@/lib/hooks/use-auth-user";
import {RxDash, RxGear, RxSection} from "react-icons/rx";
import {TbBrandAlipay} from "react-icons/tb";
import {TbHttpDelete} from "react-icons/tb";
import {CiChat1} from "react-icons/ci";
import {RiChatDeleteLine, RiDeleteBin5Line} from "react-icons/ri";

export default function Chat() {
    const [isSending, setIsSending] = useState(false) // 新增状态来追踪消息是否正在发送
    const [chatList, setChatList] = useState(undefined)
    const [key, setKey] = useState('')
    const [token, setToken] = useState('')
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
            'Token': token,
            'Content-Type': 'application/json'
        },
        body: {
            model
        },
        onError: (error) => {
            if (JSON.parse(error.message).code === 401 || JSON.parse(error.message).code === 403) {
                ZMessage().warning(JSON.parse(error.message).message)
                window.localStorage.removeItem("userInfo")
                // window.location.replace("/write")
            } else {
                ZMessage().warning(JSON.parse(error.message).message)
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
            // ZMessage().success('深斯AI已完成处理')
        }
    });


    const endOfMessagesRef = useRef(null)

    const router = useRouter()
    const {checkToken} = useAuthUser()
    useEffect(() => {
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        setKey(userInfo.key)
        setToken(userInfo.token)
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
        console.log("deleteAnyChat", id)
        // 待删除的Array
        deleteChatArray.push(id)

        // 现有对话历史
        const chatLists = JSON.parse(window.localStorage.getItem('chatList'));

        // 根据传入的id删除当前对话
        chatLists.state.chats.map((item, index) => {
            if (item.id === id) {
                chatLists.state.chats.splice(index, 1)
            }
        })

        // 不仅要更新当前历史对话列表，还需要将当前stateId进行设置，只有这样才能将当前对话的上一个对话进行标注

        console.log("deleteChatArray", deleteChatArray)
        // 判断chatLists.state.chats是否是最后一个
        if (chatLists.state.chats.length !== 0) {
            setStateId(chatLists.state.chats.at(-1).id)
        }
        // 更新localStorage中的chatList

        window.localStorage.setItem('chatList', JSON.stringify(chatLists));
        setChatList(chatLists)
    }

    const handleDeleteClick = () => {
        // 实现按钮点击切换不同颜色
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

    return (<div className="bg-white w-screen h-screen relative">
            <div onSubmit={submit}
                 className="w-screen h-screen bg-white flex flex-row justify-start items-start align-center">
                <div
                    className="lg:w-[320px] sm:hidden md:block rounded h-screen border-2 border-pink-50 bg-transparent"
                    style={{"background": "#f0f4f9"}}>
                    <div className="w-[320px] flex flex-col justify-evenly">
                        <div className="w-[320px] p-2">
                            <div
                                className="w-1/2 ml-2 border-2 border-solid text-white rounded-r-badge bg-black p-2 flex flex-row justify-center align-center items-center hover:border-black hover:text-black-100 text-sm cursor-pointer"
                                onClick={createChat}>
                                <CiChat1 size={30} className="mr-3 align-middle"/>
                                新建对话
                            </div>
                        </div>
                        <div className="w-[320px] flex flex-col overflow-x-hidden p-2 pb-20 h-full">
                            {
                                chatList !== undefined ? chatList.state.chats.map(item => (
                                        // eslint-disable-next-line react/jsx-key
                                        <div key={item.id} className="flex flex-row pl-2 justify-start items-center">
                                            <div type="checkbox" onClick={e => deleteAnyChat(item.id)}
                                                   className="delete-checkbox hidden">
                                            <RiDeleteBin5Line size={24} className="cursor-pointer mr-5 hover:text-red-500" />
                                            </div>
                                            <div key={item.id} id={item.id}
                                                 className="chatBox border-2 border-blue-500 active:bg-blue-200 border-b-gray-50 bg-white p-5 rounded-r-badge hover:bg-blue-200 cursor-pointer shadow-accent-content"
                                                 onClick={handleHistoryChat}>
                                                {item.title}
                                            </div>
                                        </div>
                                    ))
                                    : <div key={Math.random()} className="bg-gray-200 p-5 m-2 rounded font-bold">没有对话
                                    </div>
                            }

                            <div className="flex flex-row items-center absolute left-0 bottom-0 w-[320px]">
                                <button
                                    id="delete-button"
                                    className="btn-sm w-1/3 m-1 rounded p-2 bg-black text-white hover:bg-blue-500 flex flex-row items-center"
                                    onClick={handleDeleteClick}>
                                    <TbHttpDelete/>
                                    <div className="ml-0">删除对话</div>
                                </button>
                                <button
                                    className="btn-sm w-1/3 m-1 btn-block rounded p-2 bg-black text-white hover:bg-blue-500 flex flex-row items-center"
                                    onClick={e => router.push('/pay')}>
                                    <TbBrandAlipay/>
                                    <div className="ml-2">充值中心</div>
                                </button>
                                <button
                                    className="btn-sm w-1/3 m-1 btn-block rounded bg-black text-white hover:bg-blue-500 flex flex-row items-center"
                                    onClick={e => router.push('/person')}>
                                    <RxGear/>
                                    <div className="pl-2">设置</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="chat"
                    className="lg:w-[calc(100vw-320px)] sm:w-screen md:w-full lg:p-10 sm:py-2 rounded relative top-0 h-screen">
                    <div className="flex justify-center w-96 absolute left-1/2 -translate-x-1/2 top-0">
                        <NavTabLists tabList={[
                            {id: 1, name: 'AI写作', link: '/write'},
                            {id: 2, name: 'AI对话', link: '/talk'},
                            {id: 3, name: 'AI绘画', link: '/dalle'},
                        ]}/>
                    </div>
                    <div className="lg:w-[60rem] md:w-full pb-36 lg:mx-auto h-[50rem] overflow-y-scroll">
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
                    <div
                        className="lg:w-1/3 sm:w-screen lg:left-1/2 lg:right-1/2 bottom-2 lg:-translate-x-1/2 flex flex-col justify-start absolute bottom-0">
                        <div
                            className="lg:w-full sm:w-11/12 sm:m-auto bg-white border-2 border-solid border-blue-500 rounded-lg p-1">
                    <textarea
                        type="text"
                        name=""
                        id="userInput"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="输入您的问题"
                        className="lg:w-full lg:p-3.5 lg:h-20 bg-white sm:w-full text-gray-700 border border-gray-300 rounded
                                                  focus:border-indigo-500 focus:ring-indigo-500 p-2 border-none
                                                  transition duration-150 ease-in-out focus:outline-none resize-none"
                    />
                            <div
                                className="w-full lg:m-0 sm:m-auto flex flex-row justify-end mt-2 mr-2">
                                <select
                                    className="select select-bordered border-gray-300 focus:outline-0 focus:ring-1 focus:ring-indigo-100 w-full max-w-36 rounded-sm hover:ring-indigo-500"
                                    onChange={(e) => setModel(e.target.value)}>
                                    <option className="m-10">gpt-4-0125-preview</option>
                                    <option>gpt-3.5-turbo</option>
                                </select>
                                <button onClick={clearHistory}
                                        className="btn bg-white text-black hover:bg-indigo-500 rounded-sm border-gray-300 ml-2 mr-2">清除当前对话
                                </button>
                                <button
                                    className="btn lg:hidden sm:w-1/4 bg-white rounded text-white hover:bg-indigo-500 flex flex-row justify-start items-center rounded-sm border-gray-300"
                                    onClick={e => {

                                    }}>
                                    <RxGear/>
                                    <div>设置</div>
                                </button>
                                <button
                                    id="sendButton"
                                    type="button"
                                    onClick={handleSubmit}
                                    className="btn md:w-auto h-12 rounded-md bg-white hover:bg-indigo-500 text-black rounded-sm border-gray-300"
                                >
                                    {isSending ? 'AI生成中...' : '发 送'} {/* 按钮文本根据发送状态变化 */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}