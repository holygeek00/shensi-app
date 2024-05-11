'use client'
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Navbar from "@/components/Navbar"
import Image from 'next/image'
import NavbarIndex from "@/components/NavbarIndex"
import CategoryCardGroup from '@/components/CategoryCardGroup'
import { ZMessage } from "@/components/ui/toast";
import { NavTabLists } from '@/components/nav-tab-lists'
import {Login} from '@/components/login'

export default function ArticleMenu() {

    const socialMediaCards = [{
        title: "AI新媒体回答生成器",
        text: "AI新媒体回答生成器，一键生成简明扼要、实用性强的新媒体干货式回答文案",
        imageUrl: "/question.png",
        link: './write/huida'
    }, {
        title: "AI新媒体问题生成器",
        text: "AI新媒体问题生成器，一键生成准确、专业、通俗的新媒体问题",
        imageUrl: "/zhihu.png",
        link: './write/wenti'
    }, {
        title: "AI文章标题生成器",
        text: "AI文章标题生成器，一键生成引人注目的新媒体文章标题",
        imageUrl: "/headline.png",
        link: './write/biaoti'
    }]

    const educationLiteratureCards = [{
        title: "小学生作文写作",
        text: "您只需要输入作文的标题和需要的字数就可以帮您生成一篇感情丰富，生动真实的作文。",
        imageUrl: "/xxszw.png",
        link: './write/article'
    }, {
        title: "AI诗歌生成器", text: "AI诗歌生成器，一键生成优美的诗歌", imageUrl: "/poem.png", link: './write/poets'
    }, {
        title: "AI节日祝福语生成器",
        text: "AI节日祝福语生成器，快速生成具有温馨感和独特性的节日祝福语",
        imageUrl: "/jrzf.png",
        link: './write/fortune'
    }, {
        title: "AI对联生成器",
        text: "AI对联生成器，根据上联内容自动生成内容呼应、对仗工整的下联",
        imageUrl: "/ddl.png",
        link: './write/duilian'
    }, {
        title: "AI专业论文生成器",
        text: "输入论文标题和关键词，在短时间内生成高质量的专业论文内容",
        imageUrl: "/zhuanyelunwen.png",
        link: './write/lunwen'
    }, {
        title: "AI文献综述生成器",
        text: "帮助您在短时间内轻松撰写出高质量的论文文献综述",
        imageUrl: "/zhuanyelunwen.png",
        link: './write/wenxian'
    }, {
        title: "AI文章风格润色工具",
        text: "帮助用户快速改进文章的语言表达风格和整体质量",
        imageUrl: "/runse.png",
        link: './write/runse'
    }, {
        title: "AI句子续写工具",
        text: "帮助用户续写句子或扩展句子，适用于写作、小说创作、广告文案等领域",
        imageUrl: "/continue.png",
        link: './write/jvzi'
    }, {
        title: "AI种草文案生成器",
        text: "AI种草文案生成器，一键生成文笔优美、内容丰富的种草文案",
        imageUrl: "/mediazc.png",
        link: './write/zhongcao'
    }, {
        title: "AI创意故事生成器",
        text: "AI创意故事生成器，一键生成情节生动、结构完整的创意故事内容",
        imageUrl: "/cygs.png",
        link: './write/chuangyi'
    }, {
        title: "AI散文生成器",
        text: "AI散文生成器，一键生成平实自然、意境深远的散文作品",
        imageUrl: "/sanwen.png",
        link: './write/sanwen'
    }, {
        title: "AI内容改写工具",
        text: "利用人工智能算法和自然语言处理技术，快速改写原文内容",
        imageUrl: "/rewrite.png",
        link: './write/neirong'
    }, {
        title: "AI藏头诗生成器",
        text: "AI藏头诗生成器，一键生成文笔优美、富有趣味的藏头诗",
        imageUrl: "/cts.png",
        link: './write/cangtoushi'
    }, {
        title: "AI对联生成器",
        text: "AI对联生成器，根据上联内容自动生成内容呼应、对仗工整的下联",
        imageUrl: "/ddl.png",
        link: './write/duilian'
    }, {
        title: "AI论文去重",
        text: "AI论文查重是利用人工智能技术来检测和比较文本相似性,识别文本中的重复内容、抄袭行为或者是与已有文献的相似度。",
        imageUrl: "/zhuanyelunwen.png",
        link: './write/chachong'
    }

        // ... 其他教育/文学类卡片
    ]

    const workCards = [{
        title: "AI日报周报生成器",
        text: "AI日报周报生成器，一键生成内容丰富的工作日报、周报",
        imageUrl: "/weekly.png",
        link: './write/zhoubao'
    }, {
        title: "AI文章要点生成器",
        text: "AI文章要点生成器，帮助用户快速梳理文章的主旨、要点",
        imageUrl: "/ydtl.png",
        link: './write/yaodian'
    }, {
        title: "AI文章摘要生成器",
        text: "AI文章摘要生成器，自动提取文章的主体内容，生成简洁、准确、通俗易懂的文章摘要",
        imageUrl: "/wzzy.png",
        link: './write/zhaiyao'
    },

        // ... 其他工作类卡片
    ]

    const shortVideoCards = [{
        title: "AI短视频脚本生成器",
        text: "帮助用户快速改进文章的语言表达风格和整体质量",
        imageUrl: "/vlogscript.png",
        link: './write/jiaoben'
    }, {
        title: "AI视频标题生成器",
        text: "快速生成符合要求的视频标题，无需花费大量时间和精力去思考",
        imageUrl: "/headline.png",
        link: './write/biaoti'
    },

        // ... 其他短视频类卡片
    ]

    const ecommerceCards = [{
        title: "AI广告语生成器",
        text: "借助AI广告语生成器，一键生成各类创意吸睛广告语",
        imageUrl: "/marketing.png",
        link: './write/guanggaogen'
    }, {
        title: "AI产品亮点生成器",
        text: "AI产品亮点生成器，自动提取产品的亮点和优势，帮助用户对产品进行推广和宣传",
        imageUrl: "/cpld.png",
        link: './write/liangdian'
    }, {
        title: "AI产品核心价值生成器",
        text: "AI产品核心价值生成器，自动识别产品的特点和亮点，确定产品的核心价值和优势",
        imageUrl: "/cphxjz.png",
        link: './write/hexinjiazhi'
    }, {
        title: "AI产品特性描述生成器",
        text: "AI产品特性描述生成器，自动识别产品的特性和功能，确定产品的核心要素和特点",
        imageUrl: "/cptxms.png",
        link: './write/texing'
    }, {
        title: "AI产品卖点生成器",
        text: "AI产品卖点生成器，自动生成具有吸引力和卖点的产品描述",
        imageUrl: "/cpmdll.png",
        link: './write/maidian'
    }, {
        title: "AI电商产品简介生成器",
        text: "AI电商产品简介生成器，快速生成具有吸引力的电商产品描述和卖点文案",
        imageUrl: "/dscpjj.png",
        link: './write/jianjie'
    }, {
        title: "AI商品评价生成器",
        text: "AI商品评价生成器，快速生成具有吸引力的好评内容，提高商品的美誉度和销量",
        imageUrl: "/spyzpj.png",
        link: './write/pingjia'
    }, {
        title: "AI达人买家测评生成器",
        text: "帮助您在短时间内轻松撰写出高质量的评测内容",
        imageUrl: "/drmjcp.png",
        link: './write/pingce'
    },

        // ... 其他电商类卡片
    ]

    const entertainmentCards = [{
        title: "AI幽默回复",
        text: "AI幽默回复，根据对方的话语自动生成诙谐幽默的回复话术",
        imageUrl: "/ymhf.png",
        link: './write/youmo'
    }, {
        title: "AI星座占卜师",
        text: "AI星座占卜师，为用户提供星座占卜、运势预测、性格分析等服务",
        imageUrl: "/xzzb.png",
        link: './write/zhanbu'
    }, {
        title: "AI疯狂星期四文案生成器",
        text: "AI疯狂星期四文案生成器，一键生成富有创意和吸引力的肯德基疯狂星期四文案",
        imageUrl: "/fkxqs.png",
        link: './write/fengkuang'
    }, {
        title: "AI旅游攻略生成器",
        text: "AI旅游攻略生成器，一键生成高质量的新媒体平台旅游攻略",
        imageUrl: "/medialy.png",
        link: './write/lvyou'
    }, {
        title: "AI邮件生成器",
        text: "AI邮件生成器，一键生成各种类型的电子邮件内容",
        imageUrl: "/email.png",
        link: './write/youjian'
    }, {
        title: "AI打卡文案生成器",
        text: "AI打卡文案生成器，一键生成内容丰富景点打卡文案内容",
        imageUrl: "/scenicspot.png",
        link: './write/daka'
    }, {
        title: "AI干货分享文案生成器",
        text: "AI干货分享文案生成器，一键生成形式多样、内容实用的干货分享类文案",
        imageUrl: "/ganhuo.png",
        link: './write/ganhuo'
    }, {
        title: "AI美食探店文案生成器",
        text: "快速生成高质量的美食探店文章，提高店铺曝光率和知名度",
        imageUrl: "/mstdwa.png",
        link: './write/tandian'
    },

        // ... 其他娱乐类卡片
    ]

    // 现在每个类别的卡片都在它们自己的数组中，可以分别处理
    const [activeTab, setActiveTab] = useState('tab1')


    const [isLogin, setIsLogin] = useState(false)

    const tabs = [
        { id: 'tab1', title: '写作', content: <CategoryCardGroup categoryTitle="写作类" cards={educationLiteratureCards} /> },
        { id: 'tab2', title: '社媒', content: <CategoryCardGroup categoryTitle="社交媒体类" cards={socialMediaCards} /> },
        { id: 'tab3', title: '工作', content: <CategoryCardGroup categoryTitle="工作类" cards={workCards} /> },
        { id: 'tab4', title: '视频', content: <CategoryCardGroup categoryTitle="短视频类" cards={shortVideoCards} /> },
        { id: 'tab5', title: '电商', content: <CategoryCardGroup categoryTitle="电商类" cards={ecommerceCards} /> },
        { id: 'tab6', title: '娱乐', content: <CategoryCardGroup categoryTitle="娱乐类" cards={entertainmentCards} /> },
    ];

    function TabComponent({ activeTab, handleTabChange }) {
        return (
            <div>
                <div className="flex lg:flex-col justify-center text-center sm:mx-2 rounded lg:mt-28 lg:fixed lg:-translate-y-1/2 lg:top-1/3">
                    {tabs.map(tab => (
                        <a key={tab.id}
                            className={`w-28 lg:h-16 sm:h-10 sm:py-3 lg:p-6 shadow m-2 ring-1 ring-white hover:scale-110 transition hover:bg-blue-500 lg:rounded-2xl sm:rounded cursor-pointer font-bold ${activeTab === tab.id ? 'ring-2 ring-blue-500 bg-blue-500 text-white' : ''}`}
                            onClick={() => handleTabChange(tab.id)}>
                            {tab.title}
                        </a>
                    ))}
                </div>
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        );
    }


    //dom
    const handleTabChange = (tabId) => {
        setActiveTab(tabId)
    }

    return (<div>
        <Login />
        <div className="bg-transparent w-screen h-screen overflow-y-scroll">
            <Navbar title='深斯AI' isLogin={isLogin}></Navbar>
            <div className="flex justify-center my-5">
                <NavTabLists tabList={[
                    { id: 1, name: 'AI写作', link: '/write' },
                    { id: 2, name: 'AI对话', link: '/talk' },
                    { id: 3, name: 'AI绘画', link: '/dalle' },
                ]} />
            </div>

            <TabComponent activeTab={activeTab} handleTabChange={(id) => {
                setActiveTab(id)
            }} />
        </div>
    </div>


    )
}
