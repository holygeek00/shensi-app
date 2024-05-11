'use client'
import { useState, useEffect } from "react";
import { ZMessage } from "@/components/ui/toast"
import { useRouter } from 'next/navigation'

export function Login() {
    let [phone, setPhone] = useState('');
    let [smsCaptcha, setSmsCaptcha] = useState('');
    const [disabled, setDisabled] = useState(false);
    let [agreement, setAgreement] = useState(false);
    const [countDown, setSmsCaptchaCountDown] = useState(60);
    const [isDisabled, setSmsCaptchaDisabled] = useState(false);
    const router = useRouter()

    useEffect(() => {
        let interval;
        if (isDisabled) {
            interval = setInterval(() => {
                setSmsCaptchaCountDown((prevCount) => {
                    if (prevCount <= 1) {
                        clearInterval(interval);
                        setSmsCaptchaDisabled(false);
                        return 60;
                    } else {
                        return prevCount - 1;
                    }
                });
            }, 1000);
        }

        // 组件卸载时清除定时器
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isDisabled]);

    const sendSmsCaptcha = () => {
        if (phone && agreement) {
            // 匹配手机号的正则
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (phoneRegex.test(phone)) {
                fetch(process.env.NEXT_PUBLIC_BACK_END + '/sms/opt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify({
                        phoneNumber: phone
                    })
                }).then(response => response.json())
                    .then(data => {
                        setSmsCaptchaDisabled(true)
                        ZMessage().success(data.body.message)
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        ZMessage().error("验证码发送失败，请稍后再试!")
                    })
            } else {
                ZMessage().warning('请输入有效的手机号码');
            }
        } else {
            ZMessage().warning("请输入正确的手机号并同意协议");
        }
    }


    const login = () => {
        if (phone && smsCaptcha && agreement) {
            setDisabled(true);
            fetch(process.env.NEXT_PUBLIC_BACK_END + '/user/login', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phone,
                    smsCaptcha: smsCaptcha
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        window.localStorage.setItem('userInfo', JSON.stringify(data.body.data));
                        document.getElementById('my_modal_1').close();
                        ZMessage().success(data.body.message)
                    } else {
                        ZMessage().error(data.body.message)
                        setDisabled(false)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    ZMessage().error("登录失败，请稍后再试!")
                    setDisabled(false)
                })
        } else {
            ZMessage().warning('请输入有效的手机号码和验证码')
        }
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            login()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEnter);
        return () => {
            document.removeEventListener('keydown', handleEnter);
        }
    }, [handleEnter])


    useEffect(() => {
        document.getElementById('my_modal_1').showModal();
    }, []);

    return (
        <dialog id="my_modal_1" className="modal z-20">
            <div className="modal-box">
                <div className="flex min-h-full flex-1 flex-col justify-center lg:px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-20 w-auto"
                            src="/shensi.png"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            用户登录
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">
                            <div className="mt-5">
                                <label htmlFor="phone"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    手机号码
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={phone}
                                    autoComplete="tel"
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="w-full h-10 pl-2 pr-2 rounded-md text-gray-900 shadow
                                            border-1 focus:border-indigo-300 focus:ring-2 focus:ring-blue-500
                                            focus:outline-none placeholder:text-gray-400
                                            sm:text-sm
                                            ring-1 ring-indigo-50"
                                />
                            </div>

                            <div className="mt-5">
                                <label htmlFor="smsCaptcha"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    验证码
                                </label>
                                <div className="mt-2 flex flex-row">
                                    <input
                                        id="smsCaptcha"
                                        name="smsCaptcha"
                                        value={smsCaptcha}
                                        type="text"
                                        required
                                        onChange={(e) => setSmsCaptcha(e.target.value)}
                                        className="w-full h-10 lg:w-4/6 sm:3/5 pl-2 rounded-md border-0 focus:outline-none text-gray-900 ring-1 ring-indigo-50 shadow placeholder:text-gray-400 focus:border-x-2 focus:border-y-2 focus:border-blue-500 sm:text-sm sm:leading-6"
                                    />
                                    <button className="btn-sm bg-blue-50  disabled:bg-gray-200 rounded shadow active:bg-blue-200 h-10 lg:w-2/6 md:2/5 sm:w-3/5 ml-2"
                                        onClick={sendSmsCaptcha} disabled={isDisabled}>
                                        {isDisabled ? <span>{countDown}秒后重试</span> :
                                            <span>发送验证码</span>}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-10 text-sm text-gray-500 flex flex-row justify-center">
                                <input id="captcha" type="checkbox" value={agreement}
                                    onChange={(e) => setAgreement(e.target.checked)}
                                    className="w-5 h-5 lg:w-5 lg:h-5 lg:mt-0.5 sm:w-7 sm:h-7 sm:-mt-0.5 mt-0.5 mr-1 checked:bg-blue-500" />
                                <label htmlFor="captcha" className="hover:cursor-pointer">
                                    未注册手机号将自动注册。勾选即代表您阅读并同意
                                    <a href="#"
                                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        《用户协议》
                                    </a>
                                    和
                                    <a href="#"
                                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        《隐私政策协议》
                                    </a>
                                </label>
                            </div>

                            <div onClick={login}>
                                <button
                                    type="submit"
                                    disabled={disabled}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    登录
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </dialog>
    )
}