'use client'
import {useChat} from 'ai/react'
import Navbar from '../../components/Navbar'
import {CiPaperplane, CiPill} from "react-icons/ci";
import {useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/navigation'
import {NavTabLists} from "@/components/nav-tab-lists";
import {ZMessage} from "@/components/ui/toast";
import {LoadingOutlined} from "@/components/loading-outlined";

export default function Chat() {


    const [key, setKey] = useState('')
    const [token, setToken] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // 后续加入状态管理全部删掉
    useEffect(() => {
        const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        if (userInfo) {
            setKey(userInfo.key)
            setToken(userInfo.token)
        }
    }, [])

    const {messages, input, handleInputChange, handleSubmit, setInput} = useChat({})

    const endOfMessagesRef = useRef(null)
    const router = useRouter()
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    const handleImageGeneration = async () => {
        setIsLoading(true)
        console.log(key)
        try {
            let response = await fetch('/api/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': key,
                    "Token": token
                },
                body: JSON.stringify({messages: input})
            })
            let data = await response.json()
            if (data.code !== 200) {
                ZMessage().error(data.error.split("(")[0])
            } else {
                ZMessage().success('Image generated successfully')
                let hisic = window.localStorage.getItem("historyImagesCollection")
                if (hisic !== null) {
                    window.localStorage.setItem('historyImagesCollection', JSON.stringify({
                        images: [...(JSON.parse(window.localStorage.getItem('historyImagesCollection'))?.images || []), {
                            id: Date.now().toString(),
                            image_url: data.data.image_url,
                            prompt: input,
                            timestamp: new Date().toLocaleString()
                        }],
                        version: "1.0.0"
                    }))
                    setHistoryImages(JSON.parse(window.localStorage.getItem('historyImagesCollection')))
                } else {
                    window.localStorage.setItem('historyImagesCollection', JSON.stringify({
                        images: [{
                            id: Date.now().toString(),
                            image_url: data.data.image_url,
                            prompt: input,
                            timestamp: new Date().toLocaleString()
                        }],
                        version: "1.0.0"
                    }))
                }
                setImageUrl(data.data.image_url)
                setHistoryImages(JSON.parse(window.localStorage.getItem('historyImagesCollection')))
            }
        } catch (error) {
            console.error('Error generating dalle:', error)
            ZMessage().error(error.message)
        } finally {
            setIsLoading(false) // Stop loading after dalle generation finishes
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const copyImgUrl = (imageUrl) => {
        try {
            navigator.clipboard.writeText(imageUrl)
            ZMessage().success('Image URL copied to clipboard')
        } catch (e) {
            ZMessage().showToast('由于浏览器权限禁止复制，请手动复制')
            window.open(imageUrl, '_blank')
        }
    }

    const deleteImage = (id) => {
        let h = window.localStorage.getItem("historyImagesCollection")
        h = JSON.parse(h)
        h.images = h.images.filter(item => item.id !== id)
        window.localStorage.setItem("historyImagesCollection", JSON.stringify(h))
        setHistoryImages(h)
    }

    const prompt = [
        {
            name: "产品包装",
            prompt: "为名为[具体名称，如'绿色和谐']的[具体产品，如'有机茶']设计具有视觉吸引力的产品包装，融入代表[具体品质或主题，如'新鲜和纯净']的元素。"
        },
        {
            name: "贺卡设计",
            prompt: " 为[特定场合，如'生日']设计带有[特定主题或风格，如'花卉']设计的深情贺卡，并在贺卡中融入传达[特定情感或情绪，如'爱与感激']的信息。"
        },
        {
            name: "产品模型",
            prompt: "设计一个[具体产品，如'手机']的3D模型，使其能够清晰地展示产品的细节和功能，并使用[具体材质，如'塑料']来制作。"
        },
        {
            name: "PPT设计",
            prompt: "设计一个具有[具体主题，如'绿色和平']的PPT，其中包含[具体内容，如'保护环境']的信息，并使用[具体颜色，如'绿色']来增强视觉效果。"
        },
        {
            name: "海报设计",
            prompt: "设计一个具有[具体主题，如'绿色和平']的海报，其中包含[具体内容，如'保护环境']的信息，并使用[具体颜色，如'绿色']来增强视觉效果。"
        },
        {
            name: "网页设计",
            prompt: "设计一个具有[具体主题，如'绿色和平']的网页，其中包含[具体内容，如'保护环境']的信息，并使用[具体颜色，如'绿色']来增强视觉效果。"
        },
        {
            name: "儿童图书插图",
            prompt: "设计一本具有[具体主题，如'绿色和平']的儿童图书，其中包含[具体内容，如'保护环境']的信息"
        }
    ]

    const [word, setWord] = useState(prompt[0].prompt)

    const [historyImages, setHistoryImages] = useState(null)
    const handleSubmitComplete = async (e) => {
        setIsLoading(true)
        const response = await fetch('/api/completion', {
            method: 'POST',
            headers: {
                'authorization': key,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: word,
                model: 'gpt-3.5-turbo'
            })
        })
        const data = await response.text()
        setInput(data)
        setIsLoading(false)
    }

    useEffect(() => {
        if (window) setHistoryImages(window.localStorage.getItem('historyImagesCollection') ? JSON.parse(window.localStorage.getItem("historyImagesCollection")) : null)
    }, [router])

    useEffect(() => {
        setInput(word + "请根据要求生成新的dalle的提示词")
    }, [word])

    return (
        <div className="flex flex-row w-screen bg-transparent h-screen overflow-y-scroll">
            <div className="absolute top-0 left-0 w-full h-screen">
                <Navbar title='深斯AI'></Navbar>
            </div>
            <div
                className="overflow-y-scroll lg:w-[30rem] lg:h-[calc(100%-0em)] lg:block md:w-full rounded pt-20 shadow sm:hidden">
                {historyImages !== null ? historyImages.images.map(
                        (image, index) => (
                            <div className="card w-[29rem] m-auto glass ring-2 ring-gray-200 mb-10 shadow-2xl" key={index}>
                                <figure><img src={image.image_url} onClick={() => {
                                    setImageUrl(image.image_url)
                                }}
                                             alt="car!"/></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{image.timestamp}</h2>
                                    <p>{image.prompt}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary"
                                                onClick={() => {
                                                    deleteImage(image.id)
                                                }}>删除
                                        </button>
                                        <button className="btn btn-primary"
                                                onClick={() => copyImgUrl(image.image_url)}>复制链接
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) :
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">暂无历史记录</h1>
                    </div>
                }
            </div>
            <div
                className="flex flex-col lg:w-[calc(100%-30rem)] sm:w-full lg:h-screen bg-transparent overflow-y-scroll">
                <div className="flex justify-center my-5 sm:mt-10">
                    <NavTabLists tabList={[
                        {id: 1, name: 'AI写作', link: '/write'},
                        {id: 2, name: 'AI对话', link: '/talk'},
                        {id: 3, name: 'AI绘画', link: '/dalle'},
                    ]}/>
                </div>
                <div className="overflow-y-scroll">
                    {isLoading ? (
                            <div className="flex flex-col justify-center items-center text-center">
                                {"稍等片刻即生成您想要的图片"}
                                <span
                                    className="loading loading-spinner w-10 h-10 flex items-center justify-center"></span>
                            </div>
                        ) :
                        <div className="overflow-y-scroll">
                            <div
                                className="mx-auto flex max-w-6xl justify-center lg:px-8l">
                                {imageUrl ? (
                                    <div
                                        className="relative mx-auto flex max-w-2xl items-center justify-center sm:px-6 lg:px-8 shadow-2xl rounded">
                                        <img src={imageUrl} alt={`Generated from AI `}
                                             className="mx-auton border-none image-full"/>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500">
                                        例如输入关键词：生成背景图
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                </div>

                <form onSubmit={handleFormSubmit}
                      className="fixed self-center bottom-0 lg:w-[34rem] lg:px-4 lg:pb-4 md:w-2/3 md:m-auto rounded-lg lg:bottom-2">
                    {/*<div className="form-control flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">*/}
                    <div
                        className="lg:w-[34rem] md:w-full sm:w-screen sm:flex-col lg:h-60 md:h-72 sm:h-60 rounded p-2 bg-white flex flex-row justify-start items-end ring-1 ring-gray-300 overflow-y-scroll">
                        <div className="md:w-full sm:w-full">
                            <div className="flex lg:flex-row justify-start items-start lg:m-0">
                                <select
                                    className="h-11 ring-1 ring-gray-300 text-ellipsis focus:outline-0 focus:ring-2 focus:ring-gray-300 rounded mr-2"
                                    value={word}
                                    onChange={(event) => {
                                        setWord(event.target.value)
                                    }}>
                                    {prompt.map((item, index) =>
                                        // eslint-disable-next-line react/jsx-key
                                        <option value={item.prompt} key={index}>{item.name}</option>
                                    )}
                                </select>
                                {isLoading ? <LoadingOutlined/> :
                                    <button className="btn w-[8rem] h-8 ring-1 ring-indigo-50" onClick={handleSubmitComplete}>
                                        <CiPill />
                                        生成提示词
                                    </button>}
                            </div>
                            <textarea
                                type="text"
                                className="focus:outline-0 text-lg rounded lg:w-[28rem] sm:w-full h-44 p-2 resize-none sm:h-32"
                                value={input}
                                placeholder="输入您的问题"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button
                            onClick={handleImageGeneration}
                            className="btn w-full bg-black md:w-auto h-12 rounded border-0 hover:bg-blue-600 text-white"
                        >
                            <CiPaperplane size={24}/>
                            发 送
                        </button>
                    </div>
                    {/*</div>*/}
                </form>
            </div>
        </div>
    )
}
