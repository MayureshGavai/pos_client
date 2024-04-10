import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { RiEdit2Line } from "react-icons/ri";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, fetchItems } from "../store/itemsSlice";
import AddItemModal from "../components/AddItemModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const ItemsPage = () => {
  const dispatch = useDispatch();
  const { data: itemsData = [], status } = useSelector((state) => state.items);
  const [searchItem,setSearchItem] = useState('')

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const getFilterCategory = () => {
    let filteredItems = itemsData
    if(searchItem){
      filteredItems = filteredItems.filter((item)=> item.name.toLowerCase().includes(searchItem.toLowerCase()))
    }
    return filteredItems
  }
  
  if (status === STATUSES.LOADING) {
    return <h1 className="text-3xl w-fit mx-auto mt-3">Loading...</h1>;
  }

  if (status === STATUSES.ERROR || !itemsData) {
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
        <div className="px-2 py-4 sticky top-0 bg-white flex justify-between items-center">
          <h1 className="text-2xl font-semibold">ItemPage</h1>
          <div className="flex items-center text-lg">
            <h1 className="mr-4">Total Products : {itemsData.length}</h1>
            <AddItemModal/>
          </div>
        </div>
        {/* Searchbar */}
        <div className="my-2 flex items-center">
            <h1 className="text-base mr-4">Search Item</h1>
            <input type="text" value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} className="w-64 mr-3 px-2 py-1 border rounded-md" placeholder="Item name"/>
        </div>

        <table className="table-fixed w-full border">
          <thead>
            <tr className="bg-black text-white ">
              <th className="w-1/4  px-4 py-2 text-left">Item Name</th>
              <th className="w-1/5  px-4 py-2 text-left">Item Category</th>
              <th className="w-1/6 px-4 py-2 text-left">Price</th>
              {/* <th className="w-1/6 px-4 py-2 text-left">Availible</th> */}
              <th className="w-1/4  px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilterCategory().map((item) => (
              <tr key={item._id}>
                <td className=" px-4 py-2 border-b text-left">{item.name}</td>
                <td className=" px-4 py-2 border-b text-left">
                  {item.category}
                </td>
                <td className=" px-4 py-2 border-b text-left">
                  ₹ {item.price}
                </td>
                
                <td className=" px-4 py-2 border-b flex gap-2 ">
                    <EditModal item={item}/>
                  
                    <DeleteModal item={item}/>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       
      </div>
    </div>
  );
};

export default ItemsPage;
