import Link from "next/link";
import React from "react";

export function ReturnTabList() {
    return <div className="flex justify-center">
        <div role="tablist" className="tabs tabs-boxed my-5">

            <Link href='../write' legacyBehavior>
                <a role="tab" className="tab hover:bg-blue-300">返回</a>
            </Link>
            <Link href='../talk' legacyBehavior>
                <a role="tab" className="tab tab-active hover:bg-blue-300">AI对话</a>
            </Link>

            <Link href='../image' legacyBehavior>
                <a role="tab" className="tab hover:bg-blue-300">AI绘画</a>
            </Link>

        </div>
    </div>
}