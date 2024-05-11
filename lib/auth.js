// useAuthUser.js
import {redirect, useRouter} from 'next/navigation'

const useAuth = () => {
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('token_type')
    router.replace('/')
  }

  // 检验token
  const checkToken = () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.replace('/')
    }
  }

  return { logout, checkToken }
}

export default useAuth
