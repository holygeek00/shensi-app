'use client'

import UserContent from "@/app/admin/users";
import {useEffect, useState} from "react";
import DashboardContent from "@/app/admin/dashboard";
import {useRouter} from "next/navigation";
import AnalysisContent from "@/app/admin/analysis";
import SettingsContent from "@/app/admin/settings";

export default function Admin() {

    const [item, setItem] = useState('dashboard')

    const navItems = [{}]

    const router = useRouter()

    function changeContent() {
        if (item) {
            let button = document.getElementById(item);
            console.log(button)
            button.classList.add('bg-gray-200')
        }
        switch (item) {
            case 'dashboard':
                return <DashboardContent/>
                break
            case 'users':
                return <UserContent/>
                break
            case 'analysis':
                return <AnalysisContent/>
                break
            case 'settings':
                return <SettingsContent/>
                break
            default:
                return <DashboardContent/>

        }
    }

    return (
        <div>
            <div>
                <div className="flex h-screen w-full flex-col">
                    <header
                        className="flex h-16 items-center justify-between border-2 border-s-black bg-transparent px-6">
                        <a className="flex items-center gap-2" href="#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLineca="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                            >
                                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                            </svg>
                            <span className="text-lg font-semibold">SHENSI AI Dashboard</span>
                        </a>
                        <nav className="flex items-center gap-4">
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLineca="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                                </svg>
                                <span className="sr-only">Notifications</span>
                            </button>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
                                type="button"
                                id="radix-:rk:"
                                aria-haspopup="menu"
                                aria-expanded="false"
                                data-state="closed"
                            >
                                <img
                                    src="/placeholder.svg"
                                    width="32"
                                    height="32"
                                    className="rounded-full"
                                    alt="Avatar"
                                    style={{aspectRatio: "32 / 32", objectFit: "cover"}}
                                />
                                <span className="sr-only">User menu</span>
                            </button>
                        </nav>
                    </header>
                    <div className="flex flex-1">
                        <aside className="border-r p-4 bg-transparent">
                            <nav className="grid gap-2">
                                <button
                                    id="dashboard"
                                    className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start gap-2"
                                    onClick={() => {
                                        setItem("dashboard")
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLineca="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                                        <path
                                            d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                                    </svg>
                                    Dashboard
                                </button>
                                <button
                                    id="analysis"
                                    className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start gap-2"
                                    onClick={() => {
                                        setItem("analysis")
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLineca="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                    </svg>
                                    Analytics
                                </button>
                                <button
                                    id="users"
                                    className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start gap-2"
                                    onClick={() => {
                                        setItem("users")
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLineca="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    Users
                                </button>
                                <button
                                    id="settings"
                                    className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start gap-2"
                                    onClick={() => {
                                        setItem("settings")
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLineca="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    Settings
                                </button>
                            </nav>
                        </aside>
                        <main className="flex-1 p-6">
                            {changeContent()}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}