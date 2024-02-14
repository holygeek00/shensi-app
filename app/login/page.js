"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function Login() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState('password');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sendingCode, setSendingCode] = useState(false);
  const [error, setError] = useState('');
  const backend = process.env.NEXT_PUBLIC_BACK_END;

  const sendVerificationCode = async () => {
    if (!account) {
      setError('请输入账号！');
      return;
    }

    setSendingCode(true);
    setError('');

    const queryParams = new URLSearchParams({ mobile: account });
    const url = `${backend}/users/send_verify_code?${queryParams}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        setError('验证码发送失败，请稍后重试。');
        console.error('Failed to send verification code:', data);
      } else {
        alert('验证码发送成功，请查看您的手机。');
      }
    } catch (error) {
      setError('发送验证码时发生错误。');
      console.error('Error:', error);
    }

    setSendingCode(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    if (!account) {
      setError('请输入账号！');
      return;
    }

    if (loginMethod === 'password' && !password) {
      setError('请输入密码！');
      return;
    }

    if (loginMethod === 'sms' && !verificationCode) {
      setError('请输入验证码！');
      return;
    }

    const endpoint = `${backend}/users/login`;
    const payload = loginMethod === 'password' ? { login: account, password } : { login: account, verification_code: verificationCode };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setError('登录失败，请检查您的输入或稍后重试。');
        console.error('Login failed:', data);
      } else {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('token_type', data.token_type);
        router.push('./write');
      }
    } catch (error) {
      setError('登录时发生错误。');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">登录</h2>
        <p className="text-gray-600 mb-8">使用邮箱或者手机登录</p>

        {error && <p className="text-red-500 text-xs italic">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">账号</label>
          <input
            type="email"
            placeholder="user@acme.com"
            className="input input-bordered w-full"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>

        {loginMethod === 'password' ? (
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700">密码</label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block w-full mb-2">登录</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700">短信验证码</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="123456"
                  className="input input-bordered w-full pr-20"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="button"
                  className={`absolute right-0 top-0 rounded-l-none btn btn-primary ${sendingCode ? 'loading' : ''}`}
                  onClick={sendVerificationCode}
                  disabled={sendingCode}
                >
                  {sendingCode ? '发送中...' : '获取验证码'}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block w-full mb-2">登录</button>
          </form>
        )}

        <div className="flex items-center justify-between mt-8">
          <button
            className="text-sm text-gray-600 hover:text-gray-800"
            onClick={() => setLoginMethod(loginMethod === 'password' ? 'sms' : 'password')}
          >
            {loginMethod === 'password' ? '验证码登录' : '密码登录'}
          </button>
          <Link href="./register" legacyBehavior>
            <a className="text-sm text-primary hover:underline">免费注册</a>
          </Link>
        </div>
      </div>
    </div>
  );
}