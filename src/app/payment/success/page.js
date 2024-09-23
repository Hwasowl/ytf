'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Typography, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL;

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#141414',
            paper: '#141414',
        },
        primary: {
            main: '#E50914',
        },
    },
    typography: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    },
});

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [confirmationStatus, setConfirmationStatus] = useState('pending');
    const [openDialog, setOpenDialog] = useState(true);
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

        // router.push('/');
        confirmPayment();
    }, []);

    const handleClose = () => {
        setOpenDialog(false);
        router.push('/');
    };

    const dialogContent = () => {
        switch (confirmationStatus) {
            case 'pending':
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <CircularProgress />
                        <Typography variant="body1" sx={{ ml: 2 }}>결제 확인 중...</Typography>
                    </Box>
                );
            case 'failed':
            case 'error':
                return (
                    <>
                        <Typography variant="body1">결제 확인 실패.</Typography>
                        <Button color="primary" onClick={() => router.push('/payment/fail')}>
                            실패 페이지로 이동
                        </Button>
                    </>
                );
            case 'success':
                return (
                    <>
                        <Typography variant="h6" gutterBottom>결제 성공</Typography>
                        <Typography variant="body1">주문 ID: {searchParams.get('orderId')}</Typography>
                        <Typography variant="body1">결제 금액: {searchParams.get('amount')}원</Typography>
                    </>
                );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>결제 상태</DialogTitle>
                <DialogContent>
                    {dialogContent()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}