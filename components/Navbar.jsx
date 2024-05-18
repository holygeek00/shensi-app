import Link from 'next/link'
import Image from 'next/image'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
export default function Navbar({title, isLogin}) {

    const [userInfo, setUserInfo] = useState(null)
    const router = useRouter()

    useEffect(() => {
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        (async () => {
            try {
                // 构建查询参数
                const params = new URLSearchParams({ api_key: userInfo.key });
                const response = await fetch(`/api/user/info?${params}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': `${userInfo.token}`
                    }
                });

                console.log(response)
                // 检查响应状态
                if (response.status !== 200) {
                    window.localStorage.removeItem('userInfo')
                    router.replace('/write')
                }

                const userData = await response.json();
                userInfo.quota = userData.data.quota
                window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                setUserInfo(userInfo)
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (window.localStorage.getItem('userInfo') === null || window.localStorage.getItem('userInfo') === undefined) {
                    router.replace('/write')
                }
            }
        })()
    }, [router]);

    useEffect(() => {
        if (isLogin){
            setUserInfo(JSON.parse(window.localStorage.getItem('userInfo')))
        }
    }, [isLogin])

    return (
        <div className="navbar bg-transparent static top-0 left-0 right-0 z-20">
            <div className="flex-1">
                <Link prefetch={true} href="/write" className="btn btn-ghost text-xl text-black">{title}</Link>
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
                            {userInfo ? (
                                <div className='bg-base-100'>
                                    <div className='card-body'>
                                        <h2 className='card-title'>用户详情</h2>
                                        <div className='divider'></div>
                                        {/* 添加分隔线 */}
                                        <p><strong>电话号码:</strong> {userInfo.phoneNumber}</p>
                                        {/*<p><strong>状态:</strong> {user.is_active ? '激活' : '未激活'}</p>*/}
                                    </div>
                                    <div className='card-body border-t'>
                                        <h2 className='card-title'>用户额度详情</h2>
                                        <div className='divider'></div>
                                        {/* 添加分隔线 */}
                                        {/*<p>*/}
                                        {/*    <strong>已使用额度:</strong> {((quota.used_quota * 14.4) / 1000000).toFixed(2)}¥*/}
                                        {/*</p>*/}
                                        <p>
                                            <strong>剩余额度:</strong> {userInfo.quota}
                                        </p>
                                    </div>
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