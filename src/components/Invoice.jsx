import React, { useEffect, useState } from 'react'
import { FaRegSmileBeam } from "react-icons/fa";
import cafelogo from '../assets/cafelogo.jpg'


// eslint-disable-next-line react/display-name
const Invoice = React.forwardRef(({ paymentOption, billNumber, orderNumber, orderItems }, ref) => {

    const totalPrice = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const taxAmount = (totalPrice * 0.18).toFixed();
    const totalAmountWithTax = parseInt(totalPrice) + parseInt(taxAmount);
  return (
    <div ref={ref} className="w-1/3">
            {/* <h1 className="text-center text-xl font-semibold mb-3">Invoice</h1> */}
            <div className="w-[80mm] mx-auto mb-2 py-2 px-3 border border-black shadow-lg font-mono">
              <div className='w-[25mm] h-[25mm] mx-auto'>
                <img src={cafelogo} alt="" className='w-full h-full object-cover' />
              </div>
              <div className='text-center mb-2 leading-none'>
                <h1 className="text-xl font-medium ">Café Brew & Bite</h1>
                <h1 className='text-sm'>123, Sunshine Avenue, Mumbai</h1>
                <h1 className='text-sm'>+91-1234567890</h1>
              </div>
              <hr className="border-dashed border-black" />
              <h1 className="mt-2 mb-4 text-3xl text-center ]">Order: {`${orderNumber}`}</h1>
              <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="flex justify-between">
                      <h1>Bill No.</h1>
                      <h1>{billNumber}</h1>
                    </div>
                    <div className=" flex justify-between">
                      <h1>Date</h1>
                      <h1>{new Date().toLocaleDateString()}</h1>
                    </div>
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm mb-2">
                    <div className="flex justify-between">
                      <h1>Payment</h1>
                      <h1 className="capitalize">{paymentOption}</h1>
                    </div>
                    <div className=" flex justify-between">
                      <h1>Time</h1>
                      <h1>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true })}</h1>
                    </div>
              </div>
              <hr className="border-dashed border-black" />
              <table className="text-sm table-fixed">
                <thead>
                  <tr className="border-b border-dashed border-black uppercase">
                    <td className="w-4/6">Item</td>
                    <td className="w-1/6">Price</td>
                    <td className="w-1/6 text-center">Qty</td>
                    <td className="w-1/6">Total</td>
                  </tr>
                </thead>
                <tbody className="border-b border-dashed border-black uppercase">
                  {orderItems.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td className="w-1/3">{item.name}</td>
                        <td className="w-1/6 text-center">{item.price}</td>
                        <td className="w-1/6 text-center">{item.quantity}</td>
                        <td className="w-1/6 text-center">
                          {item.price * item.quantity}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Total Quantity Row */}
                </tbody>
                <tfoot>
                <tr>
                  <td className="w-4/6">Total Quantity</td>
                  <td className="w-1/6"></td>
                  <td className="w-1/6 text-center">
                    {orderItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </td>
                  <td className="w-1/6"></td>
                </tr>
                <tr>
                <td className="w-4/6">Gross Total</td>
                  <td className="w-1/6"></td>
                  <td className="w-1/6 "></td>
                  <td className="w-1/6 text-end">
                    {totalPrice}
                  </td>
                </tr>
                <tr>
                <td className="w-4/6">Tax (18%)</td>
                  <td className="w-1/6"></td>
                  <td className="w-1/6 "></td>
                  <td className="w-1/6 text-end">
                    {taxAmount}
                  </td>
                </tr>
                <tr className="font-semibold text-base">
                <td className="w-4/6">Total Amount Rs</td>
                  <td className="w-1/6"></td>
                  <td className="w-1/6 "></td>
                  <td className="w-1/6 text-end">
                    {totalAmountWithTax}
                  </td>
                </tr>
                </tfoot>
              </table>
              {/* <h1 className="mt-4">Host Name : </h1> */}
              <h1 className="mt-4 text-center">Thanks for Visiting</h1>
              <h1 className='w-fit mt-1 mb-4 mx-auto text-lg'><FaRegSmileBeam /></h1> 

            </div>
          </div>
  )
})

export default Invoice