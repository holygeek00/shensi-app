// 封装一个tablist

import React, {useEffect} from 'react'
import Link from "next/link";
import {cn} from "classnames";
import {clsx} from "clsx";
import {useRouter, usePathname} from "next/navigation";

export function NavTabLists({tabList}){

    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
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
                {/*<Link href='/talk' legacyBehavior>*/}
                {/*    <a role="tab" className="tab hover:bg-blue-300">AI对话</a>*/}
                {/*</Link>*/}

                {/*<Link href='/dalle' legacyBehavior>*/}
                {/*    <a role="tab" className="tab hover:bg-blue-300">AI绘画</a>*/}
                {/*</Link>*/}
            </div>
    )
}