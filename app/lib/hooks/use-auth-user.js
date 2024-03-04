export function useAuthUser() {

    const checkToken = (router) => {

        const accessToken = localStorage.getItem('access_token')

        if (!accessToken) {
            router.push('/')
        }

    }

    return {checkToken}

}