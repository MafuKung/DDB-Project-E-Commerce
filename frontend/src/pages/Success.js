import React, { useEffect, useState } from 'react';
import successIMG from '../assest/success.png';
import { Link, useLocation } from 'react-router-dom';
import SummaryApi from '../common/index.js';

const Success = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
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
        

        saveOrder();
    }, [location.search]);

    return (
        <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-5 rounded">
            <img src={successIMG} width={170} height={170} alt="Success" />
            {loading ? (
                <p className="text-blue-500 font-bold text-xl">Processing your order...</p>
            ) : (
                <p className={`font-bold text-xl ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                    {message}
                </p>
            )}
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

