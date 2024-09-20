'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import axios from 'axios';

const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
const customerKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CUSTOMER_KEY;
const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL
const TossPaymentComponent = () => {
    const [amount, setAmount] = useState({
        currency: "KRW",
        value: 1000,
    });
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const paymentInitiated = useRef(false);

    useEffect(() => {
        async function fetchPaymentWidgets() {
            try {
                const tossPayments = await loadTossPayments(clientKey);
                const widgets = tossPayments.widgets({
                    customerKey,
                });
                setWidgets(widgets);
            } catch (error) {
                console.error("Failed to load Toss Payments SDK:", error);
            }
        }
        fetchPaymentWidgets();
    }, []);

    useEffect(() => {
        async function renderPaymentWidgets() {
            if (widgets == null) {
                return;
            }
            try {
                await widgets.setAmount(amount);
                await Promise.all([
                    widgets.renderPaymentMethods({
                        selector: "#payment-method",
                        variantKey: "DEFAULT",
                    }),
                    widgets.renderAgreement({
                        selector: "#agreement",
                        variantKey: "AGREEMENT",
                    }),
                ]);
                setReady(true);
            } catch (error) {
                console.error("Failed to render payment widgets:", error);
            }
        }
        renderPaymentWidgets();
    }, [widgets, amount]);

    const initiatePayment = useCallback(async () => {
        if (paymentInitiated.current) {
            console.log("Payment already initiated.");
            return orderId;
        }
        try {
            setIsLoading(true);
            const response = await axios.post(gatewayUrl + '/api/payments/initiate', {
                userId: "user123", // 실제 구현에서는 로그인한 사용자의 ID를 사용
                amount: amount.value
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            const newOrderId = response.data.orderId;
            setOrderId(newOrderId);
            paymentInitiated.current = true;
            return newOrderId;
        } catch (error) {
            console.error("Error initiating payment:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [amount, orderId]);

    const handlePayment = useCallback(async () => {
        if (isLoading || !ready) {
            console.log("Payment in progress or not ready.");
            return;
        }
        try {
            setIsLoading(true);
            const orderId = await initiatePayment();
            await widgets.requestPayment({
                orderId: orderId,
                orderName: "상품 주문",
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
                customerEmail: "customer@example.com",
                customerName: "박정수",
            });
        } catch (error) {
            console.error("Payment error:", error);
            alert("결제 중 오류가 발생했습니다. 다시 시도해 주세요.");
        } finally {
            setIsLoading(false);
            paymentInitiated.current = false;
        }
    }, [widgets, initiatePayment, isLoading, ready]);

    return (
        <div className="wrapper w-100">
            <div className="max-w-540 w-100">
                <div id="payment-method" className="w-100"></div>
                <div id="agreement" className="w-100"></div>
                <div className="btn-wrapper w-100">
                    <button
                        id="payment-request-button"
                        className="btn primary w-100"
                        onClick={handlePayment}
                        disabled={isLoading || !ready}
                    >
                        {isLoading ? '처리 중...' : '결제하기'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TossPaymentComponent;
