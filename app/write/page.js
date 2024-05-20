'use client'
import React, {useState} from "react"
import Navbar from "@/components/Navbar"
import Image from 'next/image'
import CategoryCardGroup from '@/components/CategoryCardGroup'
import {NavTabLists} from '@/components/nav-tab-lists'
import {Login} from '@/components/login'
import {Notice} from "@/components/notice";
import {
    AiChat,
    AiDrawer,
    ecommerceCards,
    educationLiteratureCards,
    entertainmentCards,
    shortVideoCards,
    socialMediaCards,
    workCards
} from "@/app/write/data";

export default function ArticleMenu() {


    // 现在每个类别的卡片都在它们自己的数组中，可以分别处理
    const [activeTab, setActiveTab] = useState('tab1')


    const [isLogin, setIsLogin] = useState(false)

    const tabs = [{
        id: 'tab1', title: '写作', content: <CategoryCardGroup categoryTitle="写作类" cards={educationLiteratureCards}/>
    }, {
        id: 'tab2', title: '社媒', content: <CategoryCardGroup categoryTitle="社交媒体类" cards={socialMediaCards}/>
    }, {id: 'tab3', title: '工作', content: <CategoryCardGroup categoryTitle="工作类" cards={workCards}/>}, {
        id: 'tab4', title: '视频', content: <CategoryCardGroup categoryTitle="短视频类" cards={shortVideoCards}/>
    }, {
        id: 'tab5', title: '电商', content: <CategoryCardGroup categoryTitle="电商类" cards={ecommerceCards}/>
    }, {id: 'tab6', title: '娱乐', content: <CategoryCardGroup categoryTitle="娱乐类" cards={entertainmentCards}/>}, {
        id: 'tab7', title: 'AI对话', content: <CategoryCardGroup categoryTitle="AI类" cards={AiChat}/>
    }, {
    id: 'tab8', title: 'AI绘图', content: <CategoryCardGroup categoryTitle="AI类" cards={AiDrawer}/>
    }
    ];

    function TabComponent({activeTab, handleTabChange}) {
        return (<div>
            <div
                className="flex lg:flex-col justify-center text-center sm:mx-2 rounded lg:mt-28 lg:fixed lg:-translate-y-1/2 lg:top-1/3">
                {tabs.map(tab => (<a key={tab.id}
                                     className={`w-28 lg:h-16 sm:h-10 sm:py-3 lg:p-6 shadow m-2 ring-1 ring-white hover:scale-110 transition hover:bg-blue-500 lg:rounded-2xl sm:rounded cursor-pointer font-bold ${activeTab === tab.id ? 'ring-2 ring-blue-500 bg-blue-500 text-white' : ''}`}
                                     onClick={() => handleTabChange(tab.id)}>
                    {tab.title}
                </a>))}
            </div>
            {tabs.find(tab => tab.id === activeTab)?.content}
        </div>);
    }


    //dom
    const handleTabChange = (tabId) => {
        setActiveTab(tabId)
    }

    return (<div>
        <Login isLogin={isLogin} setIsLogin={setIsLogin}/>
        {/*<Notice noticeText={"Functions are opening up one by one"}/>*/}
        <div className="bg-transparent w-screen h-screen overflow-y-scroll">
            <Navbar title='深斯AI' isLogin={isLogin}></Navbar>
            {/*<div className="flex justify-center my-5">*/}
            {/*    <NavTabLists tabList={[{id: 1, name: 'AI写作', link: '/write'}, {*/}
            {/*        id: 2, name: 'AI对话', link: '/talk'*/}
            {/*    }, {id: 3, name: 'AI绘画', link: '/dalle'},]}/>*/}
            {/*</div>*/}

            <TabComponent activeTab={activeTab} handleTabChange={(id) => {
                setActiveTab(id)
            }}/>
        </div>
    </div>)
}
