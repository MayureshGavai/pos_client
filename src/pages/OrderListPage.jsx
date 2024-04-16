import React, { createRef, useEffect, useRef } from 'react';
import { STATUSES, getOrders } from '../store/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from '../components/SideNav';
import { useReactToPrint } from 'react-to-print';
import Invoice from '../components/Invoice';

const OrderListPage = () => {
    const dispatch = useDispatch();
    const { data, status } = useSelector(state => state.orders);
    const ordersData = data.slice().reverse();
    const invoiceRefs = useRef([]);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    useEffect(() => {
        invoiceRefs.current = Array(ordersData.length)
            .fill()
            .map((_, i) => invoiceRefs.current[i] || createRef());
    }, [ordersData]);

    
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        removeAfterPrint: true,
    });

  

    if (status === STATUSES.LOADING || !ordersData) {
        return <h1 className="text-3xl w-fit mx-auto mt-3">Loading...</h1>;
    }

    if (status === STATUSES.ERROR) {
        return (
            <div className="flex flex-col">
                <h1 className="text-3xl font-semibold mt-3 w-fit mx-auto text-red-500">
                    Something went wrong..!
                </h1>
                <img
                    className="h-[100px] w-[100px]  mx-auto"
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHpxZWtnY2NkbTUxcGRoY24yaWp2ZTd6cnN0OXRvdzIyb28yejByZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/S1pFYJvJdO6DdlNsQ3/giphy.gif"
                    alt=""
                />
            </div>
        );
    }

    

    return (
        <div className="flex">
            <SideNav />
            <div className="ml-[120px] mb-4 px-5 w-full font-Inter">
                <div className="mt-2 px-2 py-4 sticky top-0 bg-white flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Orders List Page</h1>
                </div>
                <table className="table-fixed w-full border">
                    <thead>
                        <tr className="bg-black text-white ">
                            <th className="w-1/12  py-2 text-center">Order No</th>
                            <th className="w-1/6  px-4 py-2 text-center">Bill Number</th>
                            <th className="w-1/4  px-4 py-2 text-center">Customer Name</th>
                            <th className="w-1/5  px-4 py-2 text-center">Cutomer Contact</th>
                            <th className="w-1/6  px-4 py-2 text-center">Host Name</th>
                            <th className="w-1/6 py-2 text-center">Payment Mode</th>
                            <th className="w-1/6 px-4 py-2 text-center">Total Amount</th>
                            <th className="w-1/6 px-4 py-2 text-center">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.map((order, idx) => (
                            <tr key={order.billNumber - idx}>
                                <td className=" px-4 py-2 border-b text-center font-semibold">{order.orderNumber}</td>
                                <td className=" px-4 py-2 border-b text-center ">{order.billNumber}</td>
                                <td className=" px-4 py-2 border-b text-center ">{order.customerName}</td>
                                <td className=" px-4 py-2 border-b text-center ">{order.customerNumber}</td>
                                <td className=" px-4 py-2 border-b text-center ">{order.hostName}</td>
                                <td className=" px-4 py-2 border-b text-center ">{order.paymentOption}</td>
                                <td className=" px-4 py-2 border-b text-center ">{order.total}</td>
                                <td className=" px-4 py-2 border-b text-center">
                                    <button onClick={() => handlePrint(null, () => invoiceRefs.current[idx].current)} className='px-2 py-1.5 mx-auto bg-green-500 rounded-md  text-white'>Print Invoice</button>
                                    <div className='hidden'>
                                        <Invoice ref={invoiceRefs.current[idx]} order={order} paymentOption={order.paymentOption} billNumber={order.billNumber} orderNumber={order.orderNumber} orderItems={order.order} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderListPage;
