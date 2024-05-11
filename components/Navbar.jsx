import Link from 'next/link'
import Image from 'next/image'
import useAuth from '../lib/auth'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import useAuthUser from "@/lib/hooks/use-auth-user";
import {ZMessage} from "@/components/ui/toast"; // 导入 useAuthUser 钩子
export default function Navbar({title, isLogin}) {

    const {logout} = useAuth()

    const [user, setUser] = useState(null)
    const [userQuotas, setUserQuotas] = useState([])
    const router = useRouter()

    const fetchUserData = () => {
        const accessToken = localStorage.getItem('access_token')

        if (accessToken !== undefined && accessToken !== null &&  accessToken !== "accessToken"){
            fetch(process.env.NEXT_PUBLIC_BACK_END + '/users/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
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
                    fetchUserQuota()
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error)
                    ZMessage().error('登录过期，请重新登录')
                    window.localStorage.removeItem('access_token')
                    router.push('/')
                })
        } else {
            console.error("NavTab: access_token is undefined or null")
        }
    }

    function fetchUserQuota () {
        // 从localStorage获取access_token和token_type
        const accessToken = localStorage.getItem('access_token')

        if (accessToken !== undefined && accessToken !== null &&  accessToken !== "accessToken"){
            fetch(process.env.NEXT_PUBLIC_BACK_END + '/user-tokens', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
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
                    // router.push('/')
                })
        } else {
            console.error('No access token or token type available in localStorage')
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [isLogin])

    return (
        <div className="navbar bg-transparent static top-0 left-0 right-0 z-20">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-black">{title}</a>
            </div>
            <div className="flex-none gap-2">

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                alt="Tailwind CSS Navbar component"
                                src="/photo-1534528741775-53994a69daeb.jpg"
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                    <ul tabIndex={0}
                        className="mt-3 z-[1] shadow menu menu-sm dropdown-content bg-base-100 rounded-box lg:w-[300px]">
                        <div className="flex flex-col">
                            {user ? (
                                <div className='bg-base-100'>
                                    <div className='card-body'>
                                        <h2 className='card-title'>用户详情</h2>
                                        <div className='divider'></div>
                                        {/* 添加分隔线 */}
                                        <p><strong>电话号码:</strong> {user.phone_number}</p>
                                        <p><strong>状态:</strong> {user.is_active ? '激活' : '未激活'}</p>
                                    </div>
                                    {userQuotas.map(quota => (
                                        <div key={quota.user_id} className='card-body border-t'>
                                            <h2 className='card-title'>用户额度详情</h2>
                                            <div className='divider'></div>
                                            {/* 添加分隔线 */}
                                            <p>
                                                <strong>已使用额度:</strong> {((quota.used_quota * 14.4) / 1000000).toFixed(2)}¥
                                            </p>
                                            <p>
                                                <strong>剩余额度:</strong> {((quota.remain_quota * 14.4) / 1000000).toFixed(2)}¥
                                            </p>
                                        </div>
                                    ))}
                                    <div className="flex flex-row justify-between items-center px-7 py-3">
                                        <button className="btn btn-primary"
                                                onClick={e => router.push('/pay')}>充值中心
                                        </button>
                                        <button className="btn btn-outline" onClick={e => logout()}>退出登录</button>
                                    </div>
                                </div>
                            ) : (
                                <div className='btn'>
                                    <button onClick={e => router.replace('/')}>请登录</button>
                                </div>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </div>)
}