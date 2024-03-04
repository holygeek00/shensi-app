import {useRouter} from "next/navigation";
import {useEffect} from "react";

export function useAuthUser() {

    const router = useRouter()

    const accessToken = localStorage.getItem('access_token')

    useEffect(() => {
        if (!accessToken) {
            router.push('/')
        }
        console.log(accessToken)
    }, [])

    const checkToken = () => {

        // 检查token是否有效
        // 如果无效，则进行处理，比如清除本地存储中的token，或者重定向到登录页面

    }

    return {checkToken}

}