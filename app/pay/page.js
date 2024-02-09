'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
const Pay = () => {
    const [totalAmount, setTotalAmount] = useState('')
    const [subject, setSubject] = useState('充值深斯AI')
    const [body, setBody] = useState('充值使用额度')
    const [accessToken, setAccessToken] = useState('')
    const [tokenType, setTokenType] = useState('')
    useEffect(() => {
        // 由于 useEffect 只在客户端执行，因此可以安全地访问 localStorage
        const storedAccessToken = localStorage.getItem('access_token')
        const storedTokenType = localStorage.getItem('token_type')
        setAccessToken(storedAccessToken)
        setTokenType(storedTokenType)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const queryParams = new URLSearchParams({
            total_amount: totalAmount,
            subject: `${subject}`,
            body: `${body}: ${totalAmount}`
        }).toString()

        const backend = process.env.NEXT_PUBLIC_BACK_END
        const requestUrl = `${backend}/payment/alipay?${queryParams}`
        const authHeader = `${tokenType} ${accessToken}`
        // console.log(authHeader)



        fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json()) // 解析响应为JSON
            .then(responseData => {
                //console.log(responseData);
                if (typeof window !== 'undefined' && responseData && responseData.url) {
                    window.location.href = responseData.url
                } else {
                    console.error('No URL found in the response')
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error)
            })

    }




    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto p-4">

                <form onSubmit={handleSubmit} className="form-control">
                    <label className="label">
                        <span className="label-text">充值金额(元)</span>
                    </label>
                    <input
                        type="number"
                        placeholder="输入金额"
                        className="input input-bordered"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary mt-4">
                        支付
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Pay
