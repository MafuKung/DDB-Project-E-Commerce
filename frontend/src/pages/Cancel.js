import React, { useEffect} from 'react'
import cancelIMG from '../assest/cancel.png'
import { Link ,useLocation} from 'react-router-dom'
import SummaryApi from '../common';



const Cancel = () => {
    const location = useLocation();
    useEffect(() => {
        
        const deletePendingOrder = async () => {
            const queryParams = new URLSearchParams(location.search);
            const orderId = queryParams.get('orderId');
    
            if (!orderId) return;
    
            await fetch(`${SummaryApi.deleteOrder.url}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
                credentials: 'include',
            });
        };
    
        deletePendingOrder();
    }, [location.search]);

    return(
        <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-5 rounded'>
            <img 
                src={cancelIMG}
                width={170}
                height={170}
            />
            <p className='text-red-500 font-bold text-xl'>Payment Cancel</p>
            <Link to = {"/cart"} className='p-2 px-3 mt-5 border-2 border-red-500 rounded font-semibold text-red-500 hover:text-white hover:bg-red-600'>Go to Cart</Link>
        </div>
    )
}

export default Cancel