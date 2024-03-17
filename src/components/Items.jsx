import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, fetchItems } from "../store/itemsSlice";
import { add } from "../store/cartSlice";


const Item = () => {

  const dispatch = useDispatch()
  const {data:itemsData , status} = useSelector(state=> state.items)

  useEffect(()=>{
    dispatch(fetchItems())
  },[])

  const addToCart = (item) => {
    dispatch(add(item));
  };

  if(status === STATUSES.LOADING){
    return <h1 className="text-3xl w-fit mx-auto mt-3">Loading...</h1>
  }

  if(status === STATUSES.ERROR){
    return <div className='flex flex-col'>
        <h1 className='text-3xl font-semibold mt-3 w-fit mx-auto text-red-500'>Something went wrong..!</h1>
        <img className='h-[100px] w-[100px]  mx-auto' src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHpxZWtnY2NkbTUxcGRoY24yaWp2ZTd6cnN0OXRvdzIyb28yejByZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/S1pFYJvJdO6DdlNsQ3/giphy.gif" alt="" />
    </div> 
  }

  return (
    <div className="grid grid-cols-6 gap-4 mt-4">
      {itemsData.map((item, idx) => (
        <div key={idx}
          className="flex flex-col bg-white border rounded-lg font-Inter  cursor-pointer active:shadow-lg active:border-green-800"
          onClick={()=>addToCart(item)}
        >
          <div className="">
            <img
              src={item.image}
              alt=""
              className="h-32 w-full object-cover rounded-t-lg"
            />
          </div>
          <div className="my-1 mx-3">
          <h1 className="font-medium text-lg">{item.name}</h1>
          <div className="flex justify-between items-center">
            <p className="text-sm">${item.price}</p>
            <FiPlus />
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Item;
