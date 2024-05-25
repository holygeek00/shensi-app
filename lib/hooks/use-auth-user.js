import {useRouter} from 'next/navigation'

const useAuthUser = () => {
    const router = useRouter()
    const logout = () => {
        window.localStorage.removeItem('userInfo')
        router.replace('/')
    }

    const checkToken = () => {
        const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        if (userInfo !== null && userInfo !== undefined && userInfo.token) {
            // setKey(userInfo.key)
            // setToken(userInfo.token)
        }else{
            window.localStorage.removeItem('userInfo')
            if (window.location.pathname !== '/write'){
                window.location.href = '/write'
            }
        }
    }

    return { logout, checkToken }
}

export {
    useAuthUser
}