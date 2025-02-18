import { useMutation } from '@tanstack/react-query';

import { createOrderRequest } from '@/apis/payments';
import { useAuth } from '@/hooks/context/useAuth';

export const useCreateOrder = () => {
    const { auth } = useAuth();

    const { isPending, isSuccess, error, mutateAsync: createOrderMutation } = useMutation({
        mutationFn: (amount) => createOrderRequest({ token: auth?.token, amount }),
        onSuccess: () => {
            console.log('Order created successfully');
        },
        onError: () => {
            console.log('Error in creating order', error);
        }
    });

    return{
        isPending,
        isSuccess,
        error,
        createOrderMutation
    };
};