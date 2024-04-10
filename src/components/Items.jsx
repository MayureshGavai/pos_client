import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, fetchItems } from "../store/itemsSlice";
import { add } from "../store/cartSlice";


const Item = () => {

  const dispatch = useDispatch()
  const {data:itemsData , status} = useSelector(state=> state.items)

  const [selectCategory, setSelectCategory] = useState('All')
  const [searchItem,setSearchItem] = useState('')
  const categories = ['All','coffee','tea','juice','milkshake','bakery','burger','pasta','pizza','sandwich','sides','soft drinks'];

  

  useEffect(()=>{
    dispatch(fetchItems())
  },[])

  const addToCart = (item) => {
    dispatch(add(item));
  };

  const filterProducts = (category) => {
    setSelectCategory(category)
  }

  const getFilterCategory = () => {
    let filteredItems = itemsData
    if(selectCategory !== 'All'){
      filteredItems = filteredItems.filter((item) => item.category === selectCategory);
    }
    if(searchItem){
      filteredItems = filteredItems.filter((item)=> item.name.toLowerCase().includes(searchItem.toLowerCase()))
    }
    return filteredItems
  }

  if(status === STATUSES.LOADING){
    return <div>
        <h1 className="text-3xl w-fit mx-auto mt-3">Loading...</h1>
        <div className="grid grid-cols-6 gap-4 mt-4">
        {getFilterCategory().map((item, idx) => (
          <div key={idx}
            className="flex flex-col bg-white border rounded-lg"
          >
            <div className="p-3">
            <svg
          className=" text-gray-200 dark:text-gray-300 h-32 w-full object-cover rounded-t-lg"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
            </div>
            <div className="my-1 mx-3">
            <h1 className="h-4 bg-gray-100 rounded-full mb-4"></h1>
              <p className="h-3 bg-gray-100 rounded-full mb-3"></p>
            </div>
          </div>
        ))}
        </div>
      </div>
  }

  if(status === STATUSES.ERROR){
    return <div className='flex flex-col'>
        <h1 className='text-3xl font-semibold mt-3 w-fit mx-auto text-red-500'>Something went wrong..!</h1>
        <img className='h-[100px] w-[100px]  mx-auto' src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHpxZWtnY2NkbTUxcGRoY24yaWp2ZTd6cnN0OXRvdzIyb28yejByZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/S1pFYJvJdO6DdlNsQ3/giphy.gif" alt="" />
    </div> 
  }

  return (
    <div >    
      <div className="w-full top-[74px] bg-white border-b h-12 font-Inter">
        <div className="flex justify-between items-center">
          <ul className="my-auto flex items-center">
            {
              categories.map(category => {
                return <li key={category} onClick={()=> filterProducts(category)} className={`mr-1 px-2 py-1 text-lg cursor-pointer capitalize hover:border hover:rounded-md hover:border-green-500 ${category === selectCategory ? 'bg-green-500 text-white rounded-md': '' }`}>{category}</li>
              })
            }
          </ul>
          <div>
            <input type="text" value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} className="w-64 mr-3 px-2 py-1 border rounded-md" placeholder="Search item..."/>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-4 mt-4">
        {getFilterCategory().map((item, idx) => (
          <div key={idx}
            className="flex flex-col bg-white border rounded-lg font-Inter  cursor-pointer active:shadow-lg active:border-green-800"
            onClick={()=>addToCart(item) }
          >
            <div className="">
              <img
                src={item.image}
                alt=""
                className="h-32 w-full object-cover rounded-t-lg"
              />
            </div>
            <div className="my-1 mx-3">
            <h1 className="font-medium text-lg truncate">{item.name}</h1>
            <div className="flex justify-between items-center">
              <p className="text-sm">₹{item.price}</p>
              <FiPlus />
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
