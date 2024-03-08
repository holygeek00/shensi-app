'use client'

import Navbar from '../../components/Navbar'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {ZMessage} from "@/components/ui/toast";
import {useAuthUser} from "@/lib/hooks/use-auth-user";
const UserDetailPage = () => {

  const [user, setUser] = useState(null)
  const [userQuotas, setUserQuotas] = useState([])
  const router = useRouter()
  const {checkToken} = useAuthUser()

  // 定义一个函数来发起请求并更新状态
  const fetchUserData = () => {
    const accessToken = localStorage.getItem('access_token')

    // 检查确保我们有token
    if (accessToken !== undefined && accessToken !== null &&  accessToken !== "accessToken"){
      // 设置请求的headers
      const authHeader = `Bearer ${accessToken}`
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
            setUser(userData)
            fetchUserQuta()
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error)
            ZMessage('用户信息过期，请重新登录', {type: 'error'})
            window.localStorage.removeItem('access_token')
            router.push('/')
          })
    } else {
      console.error('No access token or token type available in localStorage')
      router.push('/')
    }
  }

  function fetchUserQuta () {
    // 从localStorage获取access_token和token_type
    const accessToken = localStorage.getItem('access_token')

    if (accessToken !== undefined && accessToken !== null &&  accessToken !== "accessToken"){
      const authHeader = `Bearer ${accessToken}`
      const backend = process.env.NEXT_PUBLIC_BACK_END
      fetch(backend + '/user-tokens', {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            if (response.ok) {
              return response.json()
            }
            throw new Error('Network response was not ok.')
          })
          .then(userQuotas => {
            setUserQuotas(userQuotas)
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error)
            ZMessage("获取用户额度失败，请重新登录", {type: "error"})
            router.push('/')
          })
    } else {
      console.error('No access token or token type available in localStorage')
      ZMessage("请重新登录", {type: "error"})
    }
  }

  useEffect(() => {

    fetchUserData()
    checkToken(router)
  }, [])

  return (
    <div className='lg:w-3/5 mx-auto p-4 min-h-screen sm:w-screen'>
      <Navbar title={'设置'} />
      {user ? (
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title'>用户详情</h2>
            <div className='divider'></div> {/* 添加分隔线 */}
            <p><strong>用户名:</strong> {user.username}</p>
            <p><strong>邮箱:</strong> {user.email}</p>
            <p><strong>电话号码:</strong> {user.phone_number}</p>
            <p><strong>状态:</strong> {user.is_active ? '激活' : '未激活'}</p>
            <p><strong>超级用户:</strong> {user.is_superuser ? '是' : '否'}</p>
          </div>
          {userQuotas.map(quota => (
            <div key={quota.user_id} className='card-body border-t'>
              <h2 className='card-title'>用户额度详情</h2>
              <div className='divider'></div> {/* 添加分隔线 */}
              <p><strong>已使用额度:</strong> {((quota.used_quota * 14.4) / 1000000).toFixed(2)}¥</p>
              <p><strong>剩余额度:</strong> {((quota.remain_quota * 14.4) / 1000000).toFixed(2)}¥</p>
              <p><strong>是否无限额度:</strong> {quota.unlimited_quota ? '是' : '否'}</p>
              {/* 可以继续添加其他需要的信息 */}
            </div>
          ))}

        </div>
      ) : (
        <div className='flex justify-center items-center h-full'>
          <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full' role='status'>
            <span className='visually-hidden'></span>
          </div>
        </div>
      )}
    </div>







  )
}

export default UserDetailPage
