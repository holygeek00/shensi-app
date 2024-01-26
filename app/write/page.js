'use client'
import React, { useEffect } from "react"
import Link from 'next/link'
import Navbar from "../components/navbar"

import { useRouter } from 'next/navigation'
export default function ArticleMenu () {
  const cards = [
    {
      title: "小学生作文写作",
      text: "您只需要输入作文的标题和需要的字数就可以帮您生成一篇感情丰富，生动真实的作文。",
      imageUrl: "/xiezuo.webp",
      link: './write/article'
    },
    // Add more card objects here if needed
    {
      title: "AI诗歌生成器",
      text: "AI诗歌生成器，一键生成优美的诗歌",
      imageUrl: "/xiezuo.webp",
      link: './write/poets'
    },
    {
      title: "AI节日祝福语生成器",
      text: "AI节日祝福语生成器，快速生成具有温馨感和独特性的节日祝福语",
      imageUrl: "/xiezuo.webp",
      link: './write/fortune'
    },

  ]
  const accessToken = localStorage.getItem('access_token')
  
  if (!accessToken) {
    const router = useRouter()
    router.push('./login')
  }
  function fetchUserData () {
    // 从localStorage获取access_token和token_type
    const accessToken = localStorage.getItem('access_token')
    const tokenType = localStorage.getItem('token_type')

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
          setUser(userData) // 将获取的用户数据存储在状态变量中
          localStorage.setItem('key', data.key)
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    } else {
      console.error('No access token or token type available in localStorage')
    }
  }

  // 调用函数来发起请求
  fetchUserData()




  return (
    <div className=" ">
      <Navbar title='深斯AI写作'></Navbar>
      <h1 className="text-5xl font-bold m-8 text-center mb-6">深斯 AI 写作</h1>
      <div className="flex flex-wrap justify-center gap-4 m-8 p-4">

        {cards.map((card, index) => (
          <div key={index} className="card max-w-xs md:max-w-xs lg:w-1/5 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={card.imageUrl} alt="Shoes" className="rounded-xl" />
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

        ))}
      </div>
    </div>


  )
}
