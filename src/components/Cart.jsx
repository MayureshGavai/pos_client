import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import noorders from '../assets/noorders.png'
import { clearCart, decrement, increment, remove } from '../store/cartSlice'

const Cart = () => {

  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart)

  console.log(items)

  const removeItem = (itemId) => {
    dispatch(remove(itemId))
  }

  const incrementQuantity = (itemId) => {
    dispatch(increment({id:itemId}))
  }

  const decrementQuantity = (itemId) => {
    dispatch(decrement({id:itemId}))
  }

  const clear = () => {
    dispatch(clearCart())
  }

  const totalPrice = items.reduce((total,item)=> total + item.price * item.quantity,0)

  if(items.length === 0){
    return (
      <div className='pt-10'>
        <div className='w-56 mx-auto'>
          <img src={noorders} alt=""  className='object-fill'/>
        </div>
        <h1 className='text-center font-bold text-3xl font-Inter mt-6'>No Order</h1>
      </div>
    )
  }

  return (
    <div className='mt-6 font-Inter'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Cart Items</h1>
        <button className='px-2 py-1 text-base text-red-500 font- border border-red-400 rounded active:bg-red-500 active:text-white' onClick={()=>clear()}>Clear Cart</button>
      </div>
      <div className='flex justify-between mt-4 text-lg font-medium'>
          <span>Total Items : {items.length}</span>
          <span>Total Price : {totalPrice}</span>
      </div>
      {
        items.map((item,idx) => {
          return (
            <div key={idx} className='mt-4 flex p-2 border rounded-md font-Inter'>
              <div className='w-1/3 h-[90px]'>
                <img src={item.image} alt="" className='object-cover h-full w-full rounded-md' />
              </div>
              <div className='w-2/3 ml-2 flex flex-col'>
                <h1 className='text-lg'>{item.name}</h1>
                <div className='flex items-center gap-3 text-base mt-1 mb-2'>
                    <button className='bg-black/15 px-2 rounded' onClick={()=>decrementQuantity(item.id)}>-</button>
                    <h1>{item.quantity}</h1>
                    <button className='bg-black/15 px-2 rounded' onClick={()=>incrementQuantity(item.id)}>+</button>
                </div>
                <button className='w-full text-sm px-1 py-0.5 text-red-500 font-medium border border-red-400 rounded active:bg-red-500 active:text-white' onClick={()=>removeItem(item.id)}>Remove Item</button>
              </div>

            </div>
          )
        })
      }
    </div>
  )
}

export default Cart