'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const [confirmationStatus, setConfirmationStatus] = useState('pending');
    const confirmationAttempted = useRef(false);

    useEffect(() => {
        const confirmPayment = async () => {
            if (confirmationAttempted.current) {
                console.log("Payment confirmation already attempted.");
                return;
            }

            const paymentKey = searchParams.get('paymentKey');
            const orderId = searchParams.get('orderId');
            const amount = searchParams.get('amount');

            if (paymentKey && orderId && amount) {
                confirmationAttempted.current = true;
                try {
                    const response = await axios.post(gatewayUrl + '/api/payments/confirm', {
                        paymentKey,
                        orderId,
                        amount: Number(amount)
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.status === 200) {
                        console.log("Payment confirmed successfully");
                        setConfirmationStatus('success');
                    } else {
                        console.error("Payment confirmation failed");
                        setConfirmationStatus('failed');
                    }
                } catch (error) {
                    console.error("Error confirming payment:", error);
                    setConfirmationStatus('error');
                }
            }
        };

        confirmPayment();
    }, []); // 빈 의존성 배열

    if (confirmationStatus === 'pending') {
        return <div>결제 확인 중...</div>;
    }

    if (confirmationStatus === 'failed' || confirmationStatus === 'error') {
        return <div>결제 확인 실패. <a href="/payment/fail">실패 페이지로 이동</a></div>;
    }

    return (
        <div>
            <h2>결제 성공</h2>
            <p>주문 ID: {searchParams.get('orderId')}</p>
            <p>결제 금액: {searchParams.get('amount')}원</p>
            <a href="/">메인화면으로 돌아가기</a>
        </div>
);
}
