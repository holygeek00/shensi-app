// pages/user.js
'use client'

import Navbar from '../components/navbar'
import React, { useState, useEffect } from 'react'
const UserDetailPage = () => {
  // 从localStorage获取access_token和token_type
  const accessToken = localStorage.getItem('access_token')
  const tokenType = localStorage.getItem('token_type')
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 定义一个函数来发起请求并更新状态
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
        fetch(+ backend + '/users/me', {
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
  }, []) // 空数组作为第二个参数表示这个effect只在组件挂载时运行一次

  return (
    user ? (<div className='flex flex-col w-full md:max-w-md  lg:max-w-lg xl:max-w-xl mx-auto h-screen from-blue-500 to-pink-500'>
      <Navbar title={'用户详情'}></Navbar>
      <div className="flex flex-col items-center  min-h-screen p-4">

        <div className="w-full max-w-md mx-auto bg-base-100 shadow-xl rounded-lg overflow-hidden md:max-w-lg">
          <div className="p-4">

            <div className="mt-4">
              <p><strong>用户名:</strong> {user.username}</p>
              <p><strong>邮箱:</strong> {user.email}</p>
              <p><strong>电话号码:</strong> {user.phone_number}</p>
              <p><strong>状态:</strong> {user.is_active ? '激活' : '未激活'}</p>
              <p><strong>超级用户:</strong> {user.is_superuser ? '是' : '否'}</p>
            </div>
          </div>
        </div>
      </div>

    </div>) : (<div>Loading</div>)







  )
}

export default UserDetailPage
