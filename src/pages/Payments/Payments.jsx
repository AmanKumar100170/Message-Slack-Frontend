import { useState } from 'react';

import { RenderRazorpayPopup } from '@/components/molecules/RenderRazorpayPopup/RenderRazorpayPopup';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useCreateOrder } from '@/hooks/apis/payments/useCreateOrder';

export const Payments = () => {
    const [amount, setAmount] = useState('');
    const [orderResponse, setOrderResponse] = useState(null);
    const { isPending, isSuccess, createOrderMutation } = useCreateOrder();

    async function handleFormSubmit(e) {
        e.preventDefault();
        const response = await createOrderMutation(amount);
        setOrderResponse(response);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
                <CardHeader className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
                    <h2 className="text-2xl font-semibold">Payments</h2>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                                Account Holder Name
                            </label>
                            <input
                                type="text"
                                id="AccountHolderName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your name"
                                required
                                disabled={isPending}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                                Amount
                            </label>
                            <input
                                type="number"
                                id="cardNumber"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter Amount"
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={isPending}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Pay Now
                        </button>

                        {isSuccess && <RenderRazorpayPopup
                            amount={amount}
                            orderId={orderResponse?.id}
                            keyId={import.meta.env.VITE_RAZORPAY_KEY_ID}
                            currency={'INR'}
                        />}
                    </form>
                </CardContent>
                <CardFooter className="bg-gray-100 text-center py-4 rounded-b-lg flex justify-center">
                    <p className="text-gray-600 text-sm">Secure payment processing</p>
                </CardFooter>
            </Card>
        </div>
    );
};