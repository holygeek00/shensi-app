"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function Login() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(0)
  const [loginMethod, setLoginMethod] = useState('password');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sendingCode, setSendingCode] = useState(false);
  const [error, setError] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [showCaptchaLoading, setShowCaptchaLoading] = useState(false) // 弹窗状态
  const backend = process.env.NEXT_PUBLIC_BACK_END;

  const sendVerificationCode = async () => {
    if (!account) {
      setError('请输入账号！');
      return;
    }

    setSendingCode(true);
    setError('');

    const queryParams = new URLSearchParams({
      mobile: account,
      captcha_input: captchaInput
    })
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
  // 修改 sendVerificationCode 函数
  const getCaptcha = async () => {
    setShowCaptchaLoading(true) // 显示加载弹窗
    const url = `${backend}/captcha/${account}`
    try {
      const response = await fetch(url)
      if (response.ok) {
        response.blob().then(blob => {
          const url = URL.createObjectURL(blob)
          setCaptchaImage(url) // 设置验证码图片
          setShowCaptchaLoading(false) // 关闭加载弹窗
        })
      } else {
        console.error('Failed to fetch captcha:', data)
        setShowCaptchaLoading(false) // 关闭加载弹窗
      }
    } catch (error) {
      console.error('Error fetching captcha:', error)
      setShowCaptchaLoading(false) // 关闭加载弹窗
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'phone_number':
        setAccount(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'captchaInput':
        setCaptchaInput(value);
        break;
      case 'verification_code':
        setVerificationCode(value);
        break;
      default:
        break;
    }
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
  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])
  // 弹窗组件
  const CaptchaLoadingModal = () => (
    <div className={`modal ${showCaptchaLoading ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <p>正在加载验证码...</p>
      </div>
    </div>
  )

  return (
    // ... [previous imports and initial component setup]

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">登录</h2>
        <p className="text-gray-600 mb-6">使用邮箱或者手机登录</p>

        {error && <p className="text-red-500 text-sm mb-4 italic">{error}</p>}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">账号</label>
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
              <label className="block text-gray-700 text-sm mb-2">密码</label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block w-full">登录</button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">手机号码</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="phone_number"
                  placeholder="11位手机号"
                  className="input input-bordered w-full pr-20"
                  value={account}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                  onClick={getCaptcha}
                  disabled={countdown > 0}
                >
                  获取图片验证码
                </button>
              </div>
            </div>
            <CaptchaLoadingModal />
            <div className="form-control">
              <label className="label">
                <span className="label-text">图片验证码</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="captchaInput"
                  placeholder="请输入图片中的验证码"
                  className="input input-bordered"
                  value={captchaInput}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                  onClick={sendVerificationCode}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `重新获取 (${countdown}s)` : '获取短信验证码'}
                </button>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">验证码图片</span>
              </label>
              {captchaImage && <img src={captchaImage} alt="Captcha" className="w-full h-auto" />}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">验证码</span>
              </label>
              <input
                type="text"
                name="verification_code"
                placeholder="短信验证码"
                className="input input-bordered"
                value={verificationCode}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block w-full">登录</button>
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

    // ... [rest of the component]

  );
}