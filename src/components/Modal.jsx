import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { addNewItem } from "../store/itemsSlice";
const Modal = () => {

  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const categories = ['breakfast','side dish','curry','drinks','rice','bread','noodles','desert'];

  const closeModal = () => {
    setShowModal(false)
  }


  const onSubmit = (data) => {
    // Convert itemPrice to number
    data.itemPrice = Number(data.itemPrice);

    console.log(data); // Display form data in console
    dispatch(addNewItem (data))
      .unwrap()
      .then(() => {
        toast.success("New Item Added", { position: "top-center" });
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Failed to add new item:", error);
        toast.error("Failed to add new item", { position: "top-center" });
      });
    setShowModal(false)
  }

  return (
    <>
      <div>
        <button className='px-3 py-1.5 bg-green-500 rounded-md text-white' onClick={() => setShowModal(true)}>Add New Product</button>
        {showModal && (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
                <div className="border-a0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-center justify-between p-5 border-b rounded-t">
                    <h1 className="text-3xl">Product Details</h1>
                    <button
                      className="text-3xl text-red-500"
                      onClick={() => setShowModal(false)}
                    >
                      <IoCloseOutline />
                    </button>
                  </div>

                  <div className="relative px-6 py-3">
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" autoComplete="off">
                      <div className="w-full flex justify-between items-start my-3">
                        <label htmlFor="name" className="w-1/3">Product Name</label>
                        <div className="w-2/3 flex flex-col">
                        <input className="w-full border p-1 rounded" {...register('itemName', { required: true })} />
                        {errors?.itemName && <p style={{color:'red'}}>This field is required</p>}
                        </div>
                        </div>
                      <div className="flex justify-between items-start my-3">
                        <label htmlFor="price" className="w-1/3">Product Price</label>
                        <div className="w-2/3 flex flex-col">
                        <input type="number" min={0} className="w-full border p-1 rounded" {...register('itemPrice', { required: true })} />
                        {errors?.itemPrice && <p style={{color:'red'}}>This field is required</p>}
                      </div>
                        </div>
                      <div className="flex justify-between items-start my-3">
                        <label htmlFor="name" className="w-1/3">Product Category</label>
                        <div className="flex flex-col w-2/3">
                        <select name="" id="" className="w-full p-1 border rounded" {...register('itemCategory',{required:true})}>
                          {categories.map((category, idx) => {
                            return (
                              <option value={category} key={idx}>{category}</option>
                            )
                          })}
                        </select>
                        {errors?.itemCategory && <p style={{color:'red'}}>This field is required</p>}
                      
                        </div>
                      </div>

                      <div className="flex justify-between items-start my-3">
                        <label htmlFor="name" className="w-1/3">Product Image</label>
                        <div className="w-2/3 flex flex-col">                          
                        <input type="link" name="itemImage" className="w-full border p-1 rounded" {...register('itemImage',{required:true})} />
                        {errors?.itemImage && <p style={{color:'red'}}>This field is required</p>}
                        </div>
                      </div>

                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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

export default Modal;
