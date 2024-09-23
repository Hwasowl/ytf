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

    const styles = {
        container: {
            width: '100%',
            maxWidth: '540px',
            margin: '0 auto',
            padding: '20px',
            boxSizing: 'border-box',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        header: {
            backgroundColor: '#FFF8E7',
            padding: '10px',
            borderRadius: '8px 8px 0 0',
            marginBottom: '20px',
        },
        headerText: {
            color: '#FF6B00',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        paymentMethod: {
            width: '100%',
            marginBottom: '20px',
        },
        agreement: {
            width: '100%',
            marginBottom: '20px',
        },
        button: {
            width: '100%',
            padding: '15px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#4A90E2',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonDisabled: {
            backgroundColor: '#cccccc',
            cursor: 'not-allowed',
        },
        buttonHover: {
            backgroundColor: '#357ABD',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.paymentMethod} id="payment-method"></div>
            <div style={styles.agreement} id="agreement"></div>
            <button
                id="payment-request-button"
                style={{
                    ...styles.button,
                    ...(isLoading || !ready ? styles.buttonDisabled : {}),
                }}
                onClick={handlePayment}
                disabled={isLoading || !ready}
                onMouseOver={(e) => {
                    if (!isLoading && ready) {
                        e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                    }
                }}
                onMouseOut={(e) => {
                    if (!isLoading && ready) {
                        e.target.style.backgroundColor = styles.button.backgroundColor;
                    }
                }}
            >
                {isLoading ? '처리 중...' : '결제하기'}
            </button>
        </div>
    );
};

export default TossPaymentComponent;
