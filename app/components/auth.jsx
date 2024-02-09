// useAuth.js
import { useRouter } from 'next/navigation'

const useAuth = () => {
  const router = useRouter()

  const logout = () => {
    // 清除本地存储中的认证信息
    localStorage.removeItem('access_token')
    localStorage.removeItem('token_type')
    // 重定向到登录页面
    router.push('/login')
  }

  // 返回 logout 函数，以便其他组件可以使用
  return { logout }
}

export default useAuth
