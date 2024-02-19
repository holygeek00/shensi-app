'use client'
import React, {useEffect, useState} from "react"
import Link from 'next/link'
import Navbar from "../components/navbar"
import Image from 'next/image'
import NavbarIndex from "../components/navbarIndex"
import {useRouter} from 'next/navigation'
import CategoryCardGroup from './components/CategoryCardGroup'

export default function ArticleMenu() {

    const socialMediaCards = [
        {
            title: "AI新媒体回答生成器",
            text: "AI新媒体回答生成器，一键生成简明扼要、实用性强的新媒体干货式回答文案",
            imageUrl: "/question.png",
            link: './write/huida'
        },
        {
            title: "AI新媒体问题生成器",
            text: "AI新媒体问题生成器，一键生成准确、专业、通俗的新媒体问题",
            imageUrl: "/zhihu.png",
            link: './write/wenti'
        },
        {
            title: "AI文章标题生成器",
            text: "AI文章标题生成器，一键生成引人注目的新媒体文章标题",
            imageUrl: "/headline.png",
            link: './write/biaoti'
        },

    ]

    const educationLiteratureCards = [
        {
            title: "小学生作文写作",
            text: "您只需要输入作文的标题和需要的字数就可以帮您生成一篇感情丰富，生动真实的作文。",
            imageUrl: "/xxszw.png",
            link: './write/article'
        },
        {
            title: "AI诗歌生成器",
            text: "AI诗歌生成器，一键生成优美的诗歌",
            imageUrl: "/poem.png",
            link: './write/poets'
        },
        {
            title: "AI节日祝福语生成器",
            text: "AI节日祝福语生成器，快速生成具有温馨感和独特性的节日祝福语",
            imageUrl: "/jrzf.png",
            link: './write/fortune'
        },
        {
            title: "AI对联生成器",
            text: "AI对联生成器，根据上联内容自动生成内容呼应、对仗工整的下联",
            imageUrl: "/ddl.png",
            link: './write/duilian'
        },
        {
            title: "AI专业论文生成器",
            text: "输入论文标题和关键词，在短时间内生成高质量的专业论文内容",
            imageUrl: "/zhuanyelunwen.png",
            link: './write/lunwen'
        },
        {
            title: "AI文献综述生成器",
            text: "帮助您在短时间内轻松撰写出高质量的论文文献综述",
            imageUrl: "/zhuanyelunwen.png",
            link: './write/wenxian'
        },
        {
            title: "AI文章风格润色工具",
            text: "帮助用户快速改进文章的语言表达风格和整体质量",
            imageUrl: "/runse.png",
            link: './write/runse'
        },
        {
            title: "AI句子续写工具",
            text: "帮助用户续写句子或扩展句子，适用于写作、小说创作、广告文案等领域",
            imageUrl: "/continue.png",
            link: './write/jvzi'
        },
        {
            title: "AI种草文案生成器",
            text: "AI种草文案生成器，一键生成文笔优美、内容丰富的种草文案",
            imageUrl: "/mediazc.png",
            link: './write/zhongcao'
        },
        {
            title: "AI创意故事生成器",
            text: "AI创意故事生成器，一键生成情节生动、结构完整的创意故事内容",
            imageUrl: "/cygs.png",
            link: './write/chuangyi'
        },
        {
            title: "AI散文生成器",
            text: "AI散文生成器，一键生成平实自然、意境深远的散文作品",
            imageUrl: "/sanwen.png",
            link: './write/sanwen'
        },
        {
            title: "AI内容改写工具",
            text: "利用人工智能算法和自然语言处理技术，快速改写原文内容",
            imageUrl: "/rewrite.png",
            link: './write/neirong'
        },
        {
            title: "AI藏头诗生成器",
            text: "AI藏头诗生成器，一键生成文笔优美、富有趣味的藏头诗",
            imageUrl: "/cts.png",
            link: './write/cangtoushi'
        },
        {
            title: "AI对联生成器",
            text: "AI对联生成器，根据上联内容自动生成内容呼应、对仗工整的下联",
            imageUrl: "/ddl.png",
            link: './write/duilian'
        },

        // ... 其他教育/文学类卡片
    ]

    const workCards = [
        {
            title: "AI日报周报生成器",
            text: "AI日报周报生成器，一键生成内容丰富的工作日报、周报",
            imageUrl: "/weekly.png",
            link: './write/zhoubao'
        },
        {
            title: "AI文章要点生成器",
            text: "AI文章要点生成器，帮助用户快速梳理文章的主旨、要点",
            imageUrl: "/ydtl.png",
            link: './write/yaodian'
        },
        {
            title: "AI文章摘要生成器",
            text: "AI文章摘要生成器，自动提取文章的主体内容，生成简洁、准确、通俗易懂的文章摘要",
            imageUrl: "/wzzy.png",
            link: './write/zhaiyao'
        },

        // ... 其他工作类卡片
    ]

    const shortVideoCards = [
        {
            title: "AI短视频脚本生成器",
            text: "帮助用户快速改进文章的语言表达风格和整体质量",
            imageUrl: "/vlogscript.png",
            link: './write/jiaoben'
        },
        {
            title: "AI视频标题生成器",
            text: "快速生成符合要求的视频标题，无需花费大量时间和精力去思考",
            imageUrl: "/headline.png",
            link: './write/biaoti'
        },

        // ... 其他短视频类卡片
    ]

    const ecommerceCards = [
        {
            title: "AI广告语生成器",
            text: "借助AI广告语生成器，一键生成各类创意吸睛广告语",
            imageUrl: "/marketing.png",
            link: './write/guanggaogen'
        },
        {
            title: "AI产品亮点生成器",
            text: "AI产品亮点生成器，自动提取产品的亮点和优势，帮助用户对产品进行推广和宣传",
            imageUrl: "/cpld.png",
            link: './write/liangdian'
        },
        {
            title: "AI产品核心价值生成器",
            text: "AI产品核心价值生成器，自动识别产品的特点和亮点，确定产品的核心价值和优势",
            imageUrl: "/cphxjz.png",
            link: './write/hexinjiazhi'
        },
        {
            title: "AI产品特性描述生成器",
            text: "AI产品特性描述生成器，自动识别产品的特性和功能，确定产品的核心要素和特点",
            imageUrl: "/cptxms.png",
            link: './write/texing'
        },
        {
            title: "AI产品卖点生成器",
            text: "AI产品卖点生成器，自动生成具有吸引力和卖点的产品描述",
            imageUrl: "/cpmdll.png",
            link: './write/maidian'
        },
        {
            title: "AI电商产品简介生成器",
            text: "AI电商产品简介生成器，快速生成具有吸引力的电商产品描述和卖点文案",
            imageUrl: "/dscpjj.png",
            link: './write/jianjie'
        },
        {
            title: "AI商品评价生成器",
            text: "AI商品评价生成器，快速生成具有吸引力的好评内容，提高商品的美誉度和销量",
            imageUrl: "/spyzpj.png",
            link: './write/pingjia'
        },
        {
            title: "AI达人买家测评生成器",
            text: "帮助您在短时间内轻松撰写出高质量的评测内容",
            imageUrl: "/drmjcp.png",
            link: './write/pingce'
        },

        // ... 其他电商类卡片
    ]

    const entertainmentCards = [
        {
            title: "AI幽默回复",
            text: "AI幽默回复，根据对方的话语自动生成诙谐幽默的回复话术",
            imageUrl: "/ymhf.png",
            link: './write/youmo'
        },
        {
            title: "AI星座占卜师",
            text: "AI星座占卜师，为用户提供星座占卜、运势预测、性格分析等服务",
            imageUrl: "/xzzb.png",
            link: './write/zhanbu'
        },
        {
            title: "AI疯狂星期四文案生成器",
            text: "AI疯狂星期四文案生成器，一键生成富有创意和吸引力的肯德基疯狂星期四文案",
            imageUrl: "/fkxqs.png",
            link: './write/fengkuang'
        },
        {
            title: "AI旅游攻略生成器",
            text: "AI旅游攻略生成器，一键生成高质量的新媒体平台旅游攻略",
            imageUrl: "/medialy.png",
            link: './write/lvyou'
        },
        {
            title: "AI邮件生成器",
            text: "AI邮件生成器，一键生成各种类型的电子邮件内容",
            imageUrl: "/email.png",
            link: './write/youjian'
        },
        {
            title: "AI打卡文案生成器",
            text: "AI打卡文案生成器，一键生成内容丰富景点打卡文案内容",
            imageUrl: "/scenicspot.png",
            link: './write/daka'
        },
        {
            title: "AI干货分享文案生成器",
            text: "AI干货分享文案生成器，一键生成形式多样、内容实用的干货分享类文案",
            imageUrl: "/ganhuo.png",
            link: './write/ganhuo'
        },
        {
            title: "AI美食探店文案生成器",
            text: "快速生成高质量的美食探店文章，提高店铺曝光率和知名度",
            imageUrl: "/mstdwa.png",
            link: './write/tandian'
        },
        // ... 其他娱乐类卡片
    ]

    // 现在每个类别的卡片都在它们自己的数组中，可以分别处理
    const [activeTab, setActiveTab] = useState('tab1')

    let [phone, setPhone] = useState('');

    let [smsCaptcha, setSmsCaptcha] = useState('');

    let [smsCaptchaDisabled, setSmsCaptchaDisabled] = useState(false);

    let [agreement, setAgreement] = useState(false);

    let [smsCaptchaCountDown, setSmsCaptchaCountDown] = useState(60);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId)
    }

    const router = useRouter()
    useEffect(() => {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        document.getElementById('my_modal_1').showModal();

        // if (!accessToken) {
        //   router.push('../login')
        // } else {
        //   fetchUserData(accessToken) // Call fetchUserData with accessToken
        // }
    }, [router]);

    const sendSmsCaptcha = () => {
        if (phone && agreement) {
            console.log(phone);
            console.log(smsCaptcha);
            console.log(agreement);
            setSmsCaptchaDisabled(true);
            let count = 60;
            // 显示消息验证码倒计时
            let interval = setInterval(function() {
                if (count < 0) {
                    clearInterval(interval);
                    setSmsCaptchaCountDown("获取验证码");
                    setSmsCaptchaDisabled(false);
                } else {
                    setSmsCaptchaCountDown(count);
                    count--;
                }
            }, 1000);
            fetch(process.env.NEXT_PUBLIC_BACK_END + '/users/send_verify_code?mobile=' + phone, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
        .then(data => {
                console.log('Success:', data);
            })
                .catch((error) => {
                    console.error('Error:', error);
                })
            // window.alert("我要登陆了")
        } else {
            window.alert("请输入正确的手机号和验证码");
        }
    }

    const login = () => {
        if (phone && smsCaptcha && agreement) {

            fetch(process.env.NEXT_PUBLIC_BACK_END + '/users/auth?verification_code='+smsCaptcha, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                            phone_number: phone
                        }
                    )
                }
            )
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        } else {

        }
    }

    function fetchUserData() {

        // 从localStorage获取access_token和token_type
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

        const tokenType = typeof window !== 'undefined' ? localStorage.getItem('token_type') : null
        // 检查确保我们有token
        if (accessToken && tokenType) {
            // 设置请求的headers
            const authHeader = `${tokenType} ${accessToken}`
            const backend = process.env.NEXT_PUBLIC_BACK_END
            // 发起请求
            fetch(backend + '/users/me', {
                method: 'GET',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {

                        return response.json() // 如果响应是JSON，这里将其解析
                    }
                    throw new Error('Network response was not ok.')
                })
                .then(userData => {

                    localStorage.setItem('key', userData.bound_keys)
                    // console.log(userData.bound_keys)
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error)
                })
        } else {
            console.error('No access token or token type available in localStorage')
        }
    }


    return (
        <div>
            <div className="z-20 w-1/3 h-1/3 absolute">
                <div role="alert" className="w-screen alert z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="stroke-info shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>12 unread messages. Tap to see.</span>
                </div>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        {/*    <div className="flex flex-row ">*/}
                        {/*        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"*/}
                        {/*             className="w-6 h-6 opacity-70">*/}
                        {/*            <path*/}
                        {/*                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>*/}
                        {/*        </svg>*/}
                        {/*        <h3 className="font-bold text-lg ml-2">*/}
                        {/*            用户登录*/}
                        {/*        </h3>*/}
                        {/*    </div>*/}
                        {/*    <div className="mt-12 mb-3">*/}
                        {/*        <div className="w-full flex flex-row justify-between">*/}
                        {/*            <label*/}
                        {/*                className="w-3/4 input input-bordered focus:ring-2 focus:ring-blue-500 flex justify-between items-center gap-2 mb-5">*/}
                        {/*                /!*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"*!/*/}
                        {/*                /!*     className="w-4 h-4 opacity-70">*!/*/}
                        {/*                /!*    <path*!/*/}
                        {/*                /!*        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>*!/*/}
                        {/*                /!*    <path*!/*/}
                        {/*                /!*        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>*!/*/}
                        {/*                /!*</svg>*!/*/}
                        {/*                <input type="text" className="grow" placeholder="请输入手机号"/>*/}
                        {/*            </label>*/}
                        {/*            <button className="btn w-1/4 ml-2">发送验证码</button>*/}
                        {/*        </div>*/}
                        {/*        <label className="input input-bordered flex justify-between gap-2 mb-5 focus">*/}
                        {/*            /!*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"*!/*/}
                        {/*            /!*     className="w-4 h-4 opacity-70">*!/*/}
                        {/*            /!*    <path*!/*/}
                        {/*            /!*        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>*!/*/}
                        {/*            /!*</svg>*!/*/}
                        {/*            <input type="text" className="grow" placeholder="请输入验证码"/>*/}
                        {/*        </label>*/}
                        {/*    </div>*/}
                        {/*    <div className="modal-action">*/}
                        {/*        <form method="dialog">*/}
                        {/*            /!* if there is a button in form, it will close the modal *!/*/}
                        {/*            <button className="btn">登录</button>*/}
                        {/*        </form>*/}
                        {/*    </div>*/}

                        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <img
                                    className="mx-auto h-20 w-auto"
                                    src="http://localhost:3000/_next/image?url=%2Fshensi.png&w=640&q=100"
                                    alt="Your Company"
                                />
                                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    用户登录
                                </h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="phone"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            手机号码
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="phone"
                                                value={phone}
                                                autoComplete="phone"
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm border-x-2 border-y-2 border-gray-200 placeholder:text-gray-400 focus:border-x-2 focus:border-y-2 focus:border-blue-300 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="smsCaptcha"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                验证码
                                            </label>
                                        </div>
                                        <div className="mt-2 flex flex-row">
                                            <input
                                                id="smsCaptcha"
                                                name="smsCaptcha"
                                                value={smsCaptcha}
                                                type="smsCaptcha"
                                                required
                                                onChange={(e) => setSmsCaptcha(e.target.value)}
                                                className="w-full lg:w-4/6 sm:1/2 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm border-x-2 border-y-2 border-gray-200 placeholder:text-gray-400 focus:border-x-2 focus:border-y-2 focus:border-blue-300 sm:text-sm sm:leading-6"
                                            />
                                            <button className="btn lg:w-2/6 md:1/3 sm:w-1/2 ml-2"
                                                    onClick={sendSmsCaptcha} disabled={smsCaptchaDisabled}>
                                                {smsCaptchaDisabled ? <span>{smsCaptchaCountDown}秒后重试</span> : <span>发送验证码</span>}
                                            </button>
                                        </div>
                                    </div>

                                    <div className=" mt-10 text-sm text-gray-500 flex flex-row justify-center">
                                        <input type="checkbox" value={agreement} onChange={(e) =>
                                            setAgreement(e.target.checked)
                                        } className="w-3 h-3 mt-1.5 mr-1 checked:bg-blue-500"/>
                                        <div>
                                            未注册手机号将自动注册。勾选即代表您阅读并同意
                                            <a href="#"
                                               className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                                《用户协议》
                                            </a>
                                            和
                                            <a href="#"
                                               className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                                《隐私政策协议》
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            onClick={login}
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            登录
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </dialog>
            </div>
            <div className="bg-white w-screen h-screen">
                <Navbar title='深斯AI'></Navbar>
                <h1 className="text-5xl font-bold m-8 text-center mb-6">深斯 AI 写作</h1>
                <div className="flex justify-center">
                    <div role="tablist" className="tabs tabs-boxed my-5">
                        <a role="tab" className="tab tab-active hover:bg-blue-300">AI写作</a>
                        <Link href='./talk' legacyBehavior>
                            <a role="tab" className="tab hover:bg-blue-300">AI对话</a>
                        </Link>

                        <Link href='./image' legacyBehavior>
                            <a role="tab" className="tab hover:bg-blue-300">AI绘画</a>
                        </Link>

                    </div>
                </div>


                <div role="tablist" className="tabs tabs-boxed text-center">
                    <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab1' ? 'tab-active' : ''}`}
                       onClick={() => handleTabChange('tab1')}>写作</a>
                    <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab2' ? 'tab-active' : ''}`}
                       onClick={() => handleTabChange('tab2')}>社媒</a>

                    <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab3' ? 'tab-active' : ''}`}
                       onClick={() => handleTabChange('tab3')}>工作</a>
                    <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab4' ? 'tab-active' : ''}`}
                       onClick={() => handleTabChange('tab4')}>视频</a>
                    <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab5' ? 'tab-active' : ''}`}
                       onClick={() => handleTabChange('tab5')}>电商</a>
                    <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab6' ? 'tab-active' : ''}`}
                       onClick={() => handleTabChange('tab6')}>娱乐</a>
                </div>
                {activeTab === 'tab2' && <CategoryCardGroup categoryTitle="社交媒体类" cards={socialMediaCards}/>}
                {activeTab === 'tab1' &&
                    <CategoryCardGroup categoryTitle="写作类" cards={educationLiteratureCards}/>}
                {activeTab === 'tab3' && <CategoryCardGroup categoryTitle="工作类" cards={workCards}/>}
                {activeTab === 'tab4' && <CategoryCardGroup categoryTitle="短视频类" cards={shortVideoCards}/>}
                {activeTab === 'tab5' && <CategoryCardGroup categoryTitle="电商类" cards={ecommerceCards}/>}
                {activeTab === 'tab6' && <CategoryCardGroup categoryTitle="娱乐类" cards={entertainmentCards}/>}


                {/* <CategoryCardGroup categoryTitle="社交媒体类" cards={socialMediaCards} />
      <CategoryCardGroup categoryTitle="写作类" cards={educationLiteratureCards} />
      <CategoryCardGroup categoryTitle="社交媒体类" cards={workCards} />
      <CategoryCardGroup categoryTitle="短视频类" cards={shortVideoCards} />
      <CategoryCardGroup categoryTitle="社交媒体类" cards={ecommerceCards} />
      <CategoryCardGroup categoryTitle="娱乐类" cards={entertainmentCards} /> */}
                <div className="flex flex-wrap justify-center  gap-10 m-8 p-4 ">

                    {/* {cards.map((card, index) => (
          <div key={index} className="card max-w-xs md:max-w-xs lg:w-1/5 bg-gradient-to-b from-base-200 to-base-400 shadow-xl">
            <figure className="px-10 pt-10">
              <Image src={card.imageUrl} alt="logo" className="rounded" width={60} height={60} />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{card.title}</h2>
              <p>{card.text}</p>
              <div className="card-actions">
                <Link href={card.link}>
                  <button className="btn btn-primary">开始使用</button>
                </Link>
              </div>
            </div>
          </div>

        ))} */}
                </div>
            </div>
        </div>


    )
}
