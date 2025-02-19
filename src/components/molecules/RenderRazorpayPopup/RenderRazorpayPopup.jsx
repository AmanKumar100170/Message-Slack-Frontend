import { useEffect } from 'react';

import { useCaptureOrder } from '@/hooks/apis/payments/useCaptureOrder';

const loadRazorpayScript = (src) => {
    return new Promise((res) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log('Razorpay script loaded');
            res(true);
        };
        script.onerror = () => {
            console.log('Error in loading Razorpay script');
            res(false);
        };

        document.body.appendChild(script);
    });
};

export const RenderRazorpayPopup = ({
    orderId,
    keyId,
    currency,
    amount
}) => {

    const { captureOrderMutation } = useCaptureOrder();

    const display = async (options) => {
        const scriptResponse = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!scriptResponse){
            console.log('Error in loading script');
            return;
        }

        const rzp = new window.Razorpay(options);

        rzp.on('payment.failed', async function (response){
            console.log('Payment failed', response);
            await captureOrderMutation({
                orderId: options.order_id,
                status: 'failed',
                paymentId: ''
            });
        });

        rzp.open();
    };

    useEffect(() => {
        display({
            key: keyId,
            amount,
            currency,
            name: 'Aman Kumar',
            description: 'Test Transaction',
            order_id: orderId,
            handler: async (response) => {
                console.log('Payment success', response);
                await captureOrderMutation({
                    orderId: orderId,
                    status: 'success',
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                });
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

    return null;
};