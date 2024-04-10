import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { registerUser } from '../store/userSlice';
import cafelogo from '../assets/cafelogo.jpg'

const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
      setIsPasswordVisible((prevState) => !prevState);
    }
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        console.log(data)
        dispatch(registerUser(data))
        .unwrap()
        .then(() => {
          toast.success("Register Successful", { position: "top-center" });
          navigate('/login')
        })
        .catch((error) => {
          console.error("Register Failed", error);
          toast.error("Register Failed", { position: "top-center" });
        });
    }

  return (
    <div className='w-1/4 mx-auto mt-10 container border shadow-md border-black rounded-md font-Inter'>
            <div className='mt-2 w-24 h-24 mx-auto'>
              <img src={cafelogo} className='w-full h-full object-cover' alt="" />
            </div>
            <h1 className='text-center text-2xl mt-2 uppercase font-semibold'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='mb-3 mx-3 p-2'>
            <div className='flex flex-col my-4'>
                <label htmlFor="" className='mb-1 font-medium'>Full Name</label>
                <input type="text" className='px-2 py-1 text-lg border rounded-md ' {...register('name', {required: true})} />
                {errors?.name && <p style={{color:'red'}}>This field is required</p>}
            </div>
            <div className='flex flex-col mb-4'>
                <label htmlFor="" className='mb-1 font-medium'>Employee Id</label>
                <input type="number" className='px-2 py-1 text-lg border rounded-md ' {...register('empId', {required: true})} />
                {errors?.empId && <p style={{color:'red'}}>This field is required</p>}
            </div>
            <div className='flex flex-col mb-4'>
                <label htmlFor="" className='mb-1 font-medium'>Password</label>
                {/* <input type="password" className='px-2 py-1 text-lg border rounded-md ' {...register('password', {required: true})} /> */}
                <div className="relative w-full">
                <input type={isPasswordVisible ? "text" : "password"} className='w-full px-2 py-1 text-lg border rounded-md ' {...register('password', {required: true})} />
                
                <button
                  type='button'
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
                </div>
                {errors?.password && <p style={{color:'red'}}>This field is required</p>}
            </div>
            <h1 className='mb-4'>Already have account? <Link to='/login' className='font-semibold underline'>Login</Link></h1>
            <button type='submit' className='w-full py-2 bg-green-500 rounded-md text-white'>Register</button>
        </form>

      <ToastContainer />

    </div>
  )
}

export default RegisterPage