// 封装一个tablist

import React, {useEffect} from 'react'
import Link from "next/link";
import {clsx} from "clsx";
import {useRouter, usePathname} from "next/navigation";
import {useAuthUser} from "@/lib/hooks/use-auth-user";

export function NavTabLists({tabList}){

    const router = useRouter()
    const pathname = usePathname()

    const {checkToken} = useAuthUser()
    useEffect(() => {
        checkToken()
    }, [])


    return (
            <div role="tablist" className="lg:w-fit sm:w-2/3 tabs tabs-boxed my-5">
                {tabList.map(tab => (
                    <Link
                        id={tab.id}
                        href={tab.link}
                        key={tab.id}
                        legacyBehavior
                    >
                        <a role="tab" onClick={event => {
                            event.preventDefault();
                            router.push(tab.link)
                        }}
                           className={clsx("tab hover:bg-blue-300", {['tab-active']: pathname === tab.link})}>{tab.name}</a>
                    </Link>  
                ))}
            </div>
    )
}