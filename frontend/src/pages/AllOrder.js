import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const AllOrder = () => {
    const [data, setData] = useState([]);

    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.allOrder.url, {
            method: SummaryApi.getOrder.method,
            credentials: 'include',
        });

        const responseData = await response.json();
        setData(responseData.data);
    };

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return (
        <div className='h-[calc(100vh-190px)] overflow-y-scroll'>
            {!data.length && <p>No Order available</p>}

            <div className='p-4 w-full'>
                {data.map((item, index) => (
                    <div key={`${item.userId}-${index}`}>
                        <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                        <div className='border rounded p-2'>
                            <div className='flex flex-col lg:flex-row justify-between'>
                                <div className='grid gap-1'>
                                    {item.productDetails?.length > 0 ? (
                                        item.productDetails.map((product, index) => (
                                            <div
                                                key={`${product.price_data?.product_data?.name}-${index}`}
                                                className='flex gap-3 bg-slate-100'
                                            >
                                                <img
                                                    src={product.price_data?.product_data?.images?.[0] || 'placeholder.png'}
                                                    className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                                                    alt="Product"
                                                />
                                                <div>
                                                    <div className='font-medium text-lg text-ellipsis line-clamp-1'>
                                                        {product.price_data?.product_data?.name || 'Unknown Product'}
                                                    </div>
                                                    <div className='flex items-center gap-5 mt-1'>
                                                        <div className='text-lg text-red-500'>
                                                            {displayINRCurrency(product.price_data?.unit_amount / 100 || 0)}
                                                        </div>
                                                        <p>Quantity : {product.quantity || 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No product details available</p>
                                    )}
                                </div>
                                <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                                    <div>
                                        <div className='text-lg font-medium'>Payment Details:</div>
                                        <p className='ml-1'>
                                            Payment method: {item.paymentDetails?.payment_method_type?.[0] || 'N/A'}
                                        </p>
                                        <p className='ml-1'>
                                            Payment Status: {item.status || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <div className='text-lg font-medium'>Shipping Details:</div>
                                        {item.shipping_options?.length > 0 ? (
                                            item.shipping_options.map((shipping, index) => (
                                                <div
                                                    key={`${shipping.shipping_rate}-${index}`}
                                                    className='ml-1'
                                                >
                                                    Shipping Amount: {shipping.shipping_rate || 'N/A'}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No shipping options available</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='font-semibold ml-auto w-fit lg:text-lg'>
                                Total Amount: {displayINRCurrency(item.totalAmount || 0)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllOrder;

