import React, { useEffect} from 'react';
import successIMG from '../assest/success.png';
import { Link, useLocation } from 'react-router-dom';
import SummaryApi from '../common/index.js';

const Success = () => {
    const location = useLocation();

    useEffect(() => {
        const saveOrder = async () => {
            const queryParams = new URLSearchParams(location.search);
            const orderId = queryParams.get('orderId');
        
            if (!orderId) {
                console.error("Order ID is missing from query params");
                return;
            }
        
            console.log("Order ID:", orderId);
        
            const response = await fetch(SummaryApi.updateOrderStatus.url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, status: 'paid' }),
                credentials: 'include',
            });
        
            const result = await response.json();
            console.log("Response:", result);
        };
        
        const clearCart = async () => {
            const response = await fetch(SummaryApi.clearCart.url, {
                method: SummaryApi.clearCart.method,
                credentials: 'include',
            });

            const result = await response.json();
            if (result.success) {
                console.log("Cart cleared successfully:", result);
            } else {
                console.error("Failed to clear cart:", result.message);
            }
        };

        saveOrder();
        clearCart(); // Clear the cart after the order is saved
    }, [location.search]);

    return (
        <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-5 rounded">
            <img src={successIMG} width={170} height={170} alt="Success" />
            <p className="text-green-500 font-bold text-xl">Payment successfull</p>
            <Link
                to="/order"
                className="p-2 px-3 mt-5 border-2 border-green-500 rounded font-semibold text-green-500 hover:text-white hover:bg-green-600"
            >
                Go to Order page
            </Link>
        </div>
    );
};

export default Success;

