export default function test () {

  return (
    <div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <div className="bg-blue-200 text-blue-800 rounded-full p-2">
            {/* Replace with your actual icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M..." />
            </svg>
          </div>
          <span className="text-blue-800 font-semibold">分类</span>
        </div>

        {/* Buttons/List Items */}
        <div className="flex flex-col space-y-2">
          {/* Each button/list item */}
          <button className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
            <span className="flex items-center space-x-2">
              {/* Replace with your actual icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M..." />
              </svg>
              <span>首页</span>
            </span>
          </button>

          {/* Additional buttons/list items... */}
          {/* ... */}
        </div>
      </div>
    </div>
  )
}