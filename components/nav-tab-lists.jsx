// 封装一个tablist

import React, {useEffect} from 'react'
import Link from "next/link";
import {cn} from "classnames";
import {clsx} from "clsx";
import {useRouter, usePathname} from "next/navigation";

export function NavTabLists() {

    const tabList = [
        {id: 1, name: 'AI写作', link: '/write'},
        {id: 2, name: 'AI对话', link: '/talk'},
        {id: 3, name: 'AI绘画', link: '/dalle'},
    ];

    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
    }, [])


    return (
        <div className="flex justify-center static left-1/2 z-50 mb-20">
            <div role="tablist" className="sm:fixed sm:w-fit tabs tabs-boxed my-5 fixed z-50">
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
        </div>
    )
}