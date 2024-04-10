import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingCart } from 'react-icons/hi2'
import { IoCloseOutline } from "react-icons/io5";
import Cart from './Cart';
import { useSelector } from 'react-redux';
import { format, getHours } from 'date-fns';


const HomeNav = () => {

    const [showCartbar,setShowCartbar] = useState(false)
    const [message,setMessage] = useState('')

    const items = useSelector((state)=>state.cart)

    const user = useSelector((state)=> state.user)

    const toggleCartbar = () => {
        setShowCartbar(!showCartbar)
    }

    const closeCartbar = () => {
        setShowCartbar(false)
    }

    useEffect(()=>{

        const currentTime = new Date()
        const currentHour = getHours(currentTime)

        let greetingMessage = ''
        if (currentHour >= 5 && currentHour < 12) {
            greetingMessage = 'Good morning';
        } else if (currentHour >= 12 && currentHour < 18) {
            greetingMessage = 'Good afternoon';
        } else {
            greetingMessage = 'Good evening';
        }
        setMessage(greetingMessage)

    },[])


    // const subTotal = items.reduce((total,item)=> total + item.price * item.quantity,0)
    // const tax = Math.round(subTotal * 0.06).toFixed(2)
    // const total = subTotal + tax

  return (
    <div className='h-[74px] px-2 py-4 sticky top-0 bg-white flex justify-between items-center text-3xl font-Inter shadow-  '>
        <h1 className='text-2xl mt-2 font-semibold capitalize'>{message}, {user.name} 👋</h1>
        <button onClick={toggleCartbar} className='relative'>
            <HiOutlineShoppingCart />
            <span className='absolute top-[-10px] right-[-10px] px-2 text-base bg-green-500 text-white rounded-full'>
                {items.length}
            </span>
        </button>

        {/* Sidebar & Overlay */}
        <div className={`fixed top-0 right-0 h-screen w-80 overflow-auto bg-white z-10 transform transition-transform ${showCartbar ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Cart Content */}
            {/* Close button */}
            <button onClick={closeCartbar} className='absolute top-0 right-0 m-4'>
                <IoCloseOutline />
            </button>
            <div className='mt-14'>
                <Cart/>
            </div>


        </div>
        {/* Overlay */}
        {
                showCartbar && (
                    <div 
                        className='fixed top-0 left-0 h-screen w-screen bg-black opacity-25 z-0'
                        onClick={closeCartbar}
                    >
                    </div>
                )
            }
    </div>
  )
}

export default HomeNav