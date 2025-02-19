import { useMutation } from '@tanstack/react-query';

import { capturePaymentRequest } from '@/apis/payments';
import { useAuth } from '@/hooks/context/useAuth';

export const useCaptureOrder = () => {
    const { auth } = useAuth();

    const { isSuccess, isPending, error, mutateAsync: captureOrderMutation } = useMutation({
        mutationFn: ({ orderId, status, paymentId }) => capturePaymentRequest({
            token: auth?.token,
            orderId,
            status,
            paymentId
        }),
        onSuccess: () => {
            console.log('Payment captured successfully');
        },
        onError: () => {
            console.log('Error in capturing payment', error);
        }
    });

    return {
        captureOrderMutation,
        isPending,
        isSuccess,
        error
    };
};