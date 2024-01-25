// pages/bind-key.js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BindKeyPage () {
  const [key, setKey] = useState('')
  const router = useRouter()
  const accessToken = localStorage.getItem('access_token')
  const tokenType = localStorage.getItem('token_type')
  const handleSubmit = async (event) => {
    event.preventDefault()
    const authHeader = `${tokenType} ${accessToken}`
    try {
      const response = await fetch('http://192.168.3.21:8000/bind-key/', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key }),
      })

      if (response.ok) {
        // 密钥绑定成功，跳转到新的页面
        router.push('/write')
      } else {
        // 处理错误情况，例如显示一个错误消息
        console.error('Failed to bind key')
      }
    } catch (error) {
      // 处理网络错误
      console.error('There was an error submitting the form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-control w-full max-w-xs mx-auto my-10">
      <label htmlFor="key" className="label">
        <span className="label-text">Enter your key:</span>
      </label>
      <input
        type="text"
        id="key"
        name="key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        required
        className="input input-bordered w-full max-w-xs"
      />
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>

  )
}