export default function AdminPage() {
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
                                    className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start gap-2">
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
                                    className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start gap-2">
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
                                    className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start gap-2">
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
                                    className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start gap-2">
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
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                                    <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                                        <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Total
                                            Revenue</h3>
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
                                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                        >
                                            <line x1="12" x2="12" y1="2" y2="22"></line>
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                        </svg>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-2xl font-bold">$45,231.89</div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                                    <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                                        <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Subscriptions</h3>
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
                                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-2xl font-bold">+2350</div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">+180.1% from last month</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                                    <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                                        <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Sales</h3>
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
                                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                        >
                                            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                                            <line x1="2" x2="22" y1="10" y2="10"></line>
                                        </svg>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-2xl font-bold">+12,234</div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">+19% from last month</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                                    <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                                        <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Active Now</h3>
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
                                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                        >
                                            <path
                                                d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
                                        </svg>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-2xl font-bold">+573</div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">+201 since last hour</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                                    <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                                        <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Recent
                                            Activities</h3>
                                        <button
                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                            View All
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="relative w-full overflow-auto">
                                            <table className="w-full caption-bottom text-sm">
                                                <thead className="[&amp;_tr]:border-b">
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                        Activity
                                                    </th>
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                        User
                                                    </th>
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                        Time
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="[&amp;_tr:last-child]:border-0">
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        <div className="flex items-center gap-2">
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
                                                                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                                            >
                                                                <path
                                                                    d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path>
                                                                <line x1="18" x2="12" y1="9" y2="15"></line>
                                                                <line x1="12" x2="18" y1="9" y2="15"></line>
                                                            </svg>
                                                            <span>Updated profile</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src="/placeholder.svg"
                                                                width="24"
                                                                height="24"
                                                                className="rounded-full"
                                                                alt="Avatar"
                                                                style={{aspectRatio: "24 / 24", objectFit: "cover"}}
                                                            />
                                                            <span>John Doe</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">2
                                                        hours ago
                                                    </td>
                                                </tr>
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        <div className="flex items-center gap-2">
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
                                                                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                                            >
                                                                <path d="M5 12h14"></path>
                                                                <path d="M12 5v14"></path>
                                                            </svg>
                                                            <span>Created new project</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src="/placeholder.svg"
                                                                width="24"
                                                                height="24"
                                                                className="rounded-full"
                                                                alt="Avatar"
                                                                style={{aspectRatio: "24 / 24", objectFit: "cover"}}
                                                            />
                                                            <span>Jane Smith</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">4
                                                        hours ago
                                                    </td>
                                                </tr>
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        <div className="flex items-center gap-2">
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
                                                                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                                            >
                                                                <path d="M3 6h18"></path>
                                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                <line x1="10" x2="10" y1="11" y2="17"></line>
                                                                <line x1="14" x2="14" y1="11" y2="17"></line>
                                                            </svg>
                                                            <span>Deleted user account</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src="/placeholder.svg"
                                                                width="24"
                                                                height="24"
                                                                className="rounded-full"
                                                                alt="Avatar"
                                                                style={{aspectRatio: "24 / 24", objectFit: "cover"}}
                                                            />
                                                            <span>Bob Johnson</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">6
                                                        hours ago
                                                    </td>
                                                </tr>
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        <div className="flex items-center gap-2">
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
                                                                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                                            >
                                                                <path
                                                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                                <line x1="12" x2="12" y1="15" y2="3"></line>
                                                            </svg>
                                                            <span>Downloaded report</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src="/placeholder.svg"
                                                                width="24"
                                                                height="24"
                                                                className="rounded-full"
                                                                alt="Avatar"
                                                                style={{aspectRatio: "24 / 24", objectFit: "cover"}}
                                                            />
                                                            <span>Sarah Lee</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">8
                                                        hours ago
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}