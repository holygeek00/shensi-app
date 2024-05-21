export default function FeedBack() {
    return (
        <div>
            <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-center">Give us your feedback</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            We value your opinion and want to hear how we can improve.
                        </p>
                    </div>
                    <form className="space-y-4 mt-6">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="name"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    placeholder="Enter your name"
                                    className="block w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    placeholder="Enter your email"
                                    className="block w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    type="email"
                                />
                            </div>
                            <div>
                                <label htmlFor="feedback"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Feedback
                                </label>
                                <textarea
                                    id="feedback"
                                    rows="3"
                                    placeholder="Enter your feedback"
                                    className="block w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                ></textarea>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
                                <div className="flex items-center mt-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="w-6 h-6 text-yellow-400 cursor-pointer"
                                    >
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="w-6 h-6 text-yellow-400 cursor-pointer"
                                    >
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="w-6 h-6 text-yellow-400 cursor-pointer"
                                    >
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="w-6 h-6 text-gray-300 cursor-pointer"
                                    >
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="w-6 h-6 text-gray-300 cursor-pointer"
                                    >
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}