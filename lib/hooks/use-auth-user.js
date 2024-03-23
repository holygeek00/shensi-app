import {useRouter} from 'next/navigation'

const useAuthUser = () => {
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem('access_token')
        router.replace('/')
    }

    const checkToken = () => {
        const token = window.localStorage.getItem('access_token')
        if (!token) {
            router.replace('/')
        }
    }

    return { logout, checkToken }
}

export {
    useAuthUser
}