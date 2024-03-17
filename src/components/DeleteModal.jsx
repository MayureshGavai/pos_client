import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { BsTrash3 } from "react-icons/bs";
import { deleteItem } from "../store/itemsSlice";
const DeleteModal = ({item}) => {

  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false);
  const { handleSubmit } = useForm();
  

  const closeModal = () => {
    setShowModal(false)
  }
 

  const onSubmit = () => {
    console.log(item._id)
    dispatch(deleteItem(item._id))
    .unwrap()
    .then(() => {
      // Handle success
      console.log('Item deleted successfully');
    })
    .catch((error) => {
      // Handle error
      console.error('Failed to delete item:', error);
    });
    setShowModal(false)
  }

  return (
    <>
      <div>
        <button 
        className="px-4 py-1 flex justify-center gap-1 items-center rounded-md border border-red-600 text-red-600 active:bg-red-600 active:text-white"
        onClick={() => setShowModal(true)}>Remove <BsTrash3 /></button>
        {showModal && (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
                <div className="border-a0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-center justify-between p-5 border-b rounded-t">
                    <h1 className="text-3xl">Delete Item</h1>
                    <button
                      className="text-3xl text-red-500"
                      onClick={() => setShowModal(false)}
                    >
                      <IoCloseOutline />
                    </button>
                  </div>

                  <div className="relative px-6 py-3">
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" autoComplete="off">
                      <h1>Are you sure to delete this item</h1>
                      <div className="mt-4 flex justify-around border rounded-md">
                          <img src={item.image} className="object-cover w-1/3 h-20 rounded-s-md" alt="" />
                        {/* <div className="w-24 h-24">
                        </div> */}
                        <div className="w-2/3 ml-6 flex flex-col justify-around">
                          <h1 className="font-semibold text-lg">{item.name}</h1>
                          <h1 className="text-base">{item.category}</h1>
                          <h1 className="text-base">₹ {item.price}</h1>
                        </div>
                        
                      </div>

                      <div className="mt-2 flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="mr-5 py-1 px-6 rounded-md border border-red-500 text-red-500"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="py-1 px-6 rounded-md border border-green-500 bg-green-500 text-white active:bg-green-600 active:text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        {showModal && (
          <div
            className='fixed top-0 left-0 h-screen w-screen bg-black opacity-25 z-0'
            onClick={closeModal}
          >
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default DeleteModal;
