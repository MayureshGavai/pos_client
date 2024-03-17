import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { RiEdit2Line } from "react-icons/ri";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, fetchItems } from "../store/itemsSlice";
import Modal from "../components/Modal";
import { Switch } from "@headlessui/react";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const ItemsPage = () => {
  const dispatch = useDispatch();
  const { data: itemsData, status } = useSelector((state) => state.items);
 
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  
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
            <Modal/>
          </div>
        </div>
        {/* Searchbar */}
        <table className="table-fixed w-full border">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="w-1/4  px-4 py-2 text-left">Item Name</th>
              <th className="w-1/5  px-4 py-2 text-left">Item Category</th>
              <th className="w-1/6 px-4 py-2 text-left">Price</th>
              {/* <th className="w-1/6 px-4 py-2 text-left">Availible</th> */}
              <th className="w-1/4  px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {itemsData.map((item) => (
              <tr key={item._id}>
                <td className=" px-4 py-2 border-b text-left">{item.name}</td>
                <td className=" px-4 py-2 border-b text-left">
                  {item.category}
                </td>
                <td className=" px-4 py-2 border-b text-left">
                  ₹ {item.price}
                </td>
                {/* <td className=" px-4 py-2 border-b text-left">
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? "bg-green-600" : "bg-red-500"}
          relative inline-flex h-[18px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </td> */}
                <td className=" px-4 py-2 border-b flex gap-2 ">
                  {/* <button
                    className="px-4 py-1 flex justify-center gap-1 items-center rounded-md border border-green-600 text-green-600 active:bg-green-600 active:text-white"
                    // onClick={() => handleEditClick(item)}
                  > */}
                    <EditModal item={item}/>
                  {/* </button> */}
                  {/* <button
                    className="px-4 py-1 flex justify-center gap-1 items-center rounded-md border border-red-600 text-red-600 active:bg-red-600 active:text-white"
                    onClick={() => handleEditClick(item)}
                  > */}
                    <DeleteModal item={item}/>
                  {/* </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-4'>
          {itemsData.map(item => (
            <div key={item._id} className='p-2 border rounded-md flex'>
              <div className='w-2/5 h-28'>
                <img src={item.image} alt="" className='w-full h-full object-cover rounded-md' />
              </div>
              <div className='w-3/5 ml-2 flex flex-col justify-between'>
                <h1 className='text-lg'>{item.name}</h1>
                <p className='text-base'>${item.price}</p>
                <p className='text-base'>{item.category}</p>
                <div className='flex justify-between items-center gap-2 text-sm'>
                  <button className='py-1 flex justify-center gap-1 items-center rounded-md w-full border border-green-600 text-green-600 active:bg-green-600 active:text-white' onClick={() => handleEditClick(item)}>Edit <RiEdit2Line /></button>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ItemsPage;
