
'use client'
import React, { useState } from 'react'
import Link from 'next/link'

export default function Register () {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    verification_code: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }))
    }
  }

  const handleRegister = async () => {
    const { confirmPassword, ...dataToSubmit } = formData
    const endpoint = 'http://192.168.31.79:8000/users/register' // 替换为您的API端点
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSubmit) // 将表单数据作为payload发送
      })

      const data = await response.json()

      if (response.ok) {
        // 注册成功，处理返回的数据，例如保存token或跳转到登录页
        alert('注册成功')
      } else {
        // 注册失败，处理错误，例如显示错误消息
        console.error('Registration failed:', data)
        // 这里可以设置错误信息以显示在表单上
        setErrors(data.errors || {})
      }
    } catch (error) {
      // 网络或其他错误，处理异常
      console.error('Error:', error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // 可以在这里添加表单验证逻辑
    handleRegister() // 调用注册处理函数
  }
  const [sendingCode, setSendingCode] = useState(false)

  const sendVerificationCode = async () => {
    setSendingCode(true)
    const queryParams = new URLSearchParams({ mobile: formData.phone_number })
    const url = `http://192.168.31.79:8000/users/send_verify_code?${queryParams}`

    try {
      const response = await fetch(url, {
        method: 'POST', // 使用POST方法
        headers: {
          'accept': 'application/json', // 指定期望的响应格式为JSON
        },
        // 由于 '-d' 是空的，这里不需要设置body属性
      })

      const data = await response.json()

      if (response.ok) {
        // 验证码发送成功，处理返回的数据
        alert('验证码发送成功')
        console.log('Verification code sent:', data)
        // 可能需要在这里处理验证码发送状态的显示，例如启动倒计时等
      } else {
        // 验证码发送失败，处理错误
        console.error('Failed to send verification code:', data)
      }
    } catch (error) {
      // 网络或其他错误，处理异常
      console.error('Error:', error)
    }

    setSendingCode(false)
  }

  const validateForm = () => {
    let isValid = true
    let newErrors = {}

    // Email validation
    if (!formData.email) {
      isValid = false
      newErrors.email = '请输入邮箱地址。'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false
      newErrors.email = '请输入有效的邮箱地址。'
    }

    // Password complexity validation
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    // if (!passwordRegex.test(formData.password)) {
    //   isValid = false
    //   newErrors.password = '密码至少包含8个字符，且必须包含数字、大小写字母。'
    // }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      isValid = false
      newErrors.confirmPassword = '两次输入的密码不匹配。'
    }

    setErrors(newErrors)
    return isValid
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">注册账号</h2>
        <p className="text-gray-600 mb-8">使用邮箱注册新账号</p>
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label className="block text-gray-700">用户名</label>
            <input
              type="username"
              name="username"
              placeholder="用户名"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleChange}
            />

          </div>
          <div className="mb-4">
            <label className="block text-gray-700">邮箱地址</label>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4 flex flex-wrap items-stretch">
            <label className="block text-gray-700 w-full">手机号码</label>
            <div className="relative w-full">
              <input
                type="text" // type应该是text，因为type="phone_number"不是有效的输入类型
                name="phone_number"
                placeholder="11位手机号"
                className="input input-bordered w-full"
                value={formData.phone_number}
                onChange={handleChange}
              />
              <button
                type="button"
                className={`absolute inset-y-0 right-0 px-4 text-white bg-blue-500 border-l disabled:bg-blue-300`}
                onClick={sendVerificationCode}
                disabled={sendingCode}
              >
                {sendingCode ? '发送中...' : '获取验证码'}
              </button>
            </div>
          </div>

          {/* Password field */}
          <div className="mb-4">
            <label className="block text-gray-700">设置密码</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          {/* Confirm Password field */}
          <div className="mb-6">
            <label className="block text-gray-700">确认密码</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              className="input input-bordered w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">验证码</label>
            <input
              type="verification_code"
              name="verification_code"
              placeholder="短信验证码"
              className="input input-bordered w-full"
              value={formData.verification_code}
              onChange={handleChange}
            />
          </div>
          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-full mb-2">立即注册</button>
        </form>
        {/* Link to sign in */}
        <div className="text-center mt-8">
          <Link href="/login">
            <div className="text-blue-500 hover:underline">已有账号？立即登录</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
