'use client'
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Navbar from "../components/navbar"
import Image from 'next/image'
import NavbarIndex from "../components/navbarIndex"
import { useRouter } from 'next/navigation'
import CategoryCardGroup from './components/CategoryCardGroup'
export default function ArticleMenu () {

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
      link: './write/guanggao'
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

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  const router = useRouter()
  useEffect(() => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (!accessToken) {
      router.push('../login')
    } else {
      fetchUserData(accessToken) // Call fetchUserData with accessToken
    }
  }, [router])
  function fetchUserData () {
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
    <div className="bg-white ">
      <Navbar title='深斯AI'></Navbar>

      {/* <h1 className="text-5xl font-bold m-8 text-center mb-6">深斯 AI 写作</h1> */}
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
        <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab1' ? 'tab-active' : ''}`} onClick={() => handleTabChange('tab1')}>写作</a>
        <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab2' ? 'tab-active' : ''}`} onClick={() => handleTabChange('tab2')}>社媒</a>

        <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab3' ? 'tab-active' : ''}`} onClick={() => handleTabChange('tab3')}>工作</a>
        <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab4' ? 'tab-active' : ''}`} onClick={() => handleTabChange('tab4')}>视频</a>
        <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab5' ? 'tab-active' : ''}`} onClick={() => handleTabChange('tab5')}>电商</a>
        <a role="tab" className={`tab tabs-sm  ${activeTab === 'tab6' ? 'tab-active' : ''}`} onClick={() => handleTabChange('tab6')}>娱乐</a>
      </div>
      {activeTab === 'tab2' && <CategoryCardGroup categoryTitle="社交媒体类" cards={socialMediaCards} />}
      {activeTab === 'tab1' && <CategoryCardGroup categoryTitle="写作类" cards={educationLiteratureCards} />}
      {activeTab === 'tab3' && <CategoryCardGroup categoryTitle="工作类" cards={workCards} />}
      {activeTab === 'tab4' && <CategoryCardGroup categoryTitle="短视频类" cards={shortVideoCards} />}
      {activeTab === 'tab5' && <CategoryCardGroup categoryTitle="社交媒体类" cards={ecommerceCards} />}
      {activeTab === 'tab6' && <CategoryCardGroup categoryTitle="娱乐类" cards={entertainmentCards} />}


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
    </div >


  )
}
