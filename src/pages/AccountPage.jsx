import React, { useState } from "react";
import SideNav from "../components/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, logOutUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AccountPage = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/login");
    toast.success("Logout Successfully", { position: "top-center" });
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <div className="flex">
      <SideNav />
      <div className="ml-[120px] mb-4 px-5 w-full font-Inter">
        <div className="mt-2 px-2 py-4 sticky top-0 bg-white flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Account Page</h1>
        </div>
        <div className="mx-auto mt-2 p-4 w-1/2 border rounded-md">
          <h1 className="text-center text-2xl font-semibold mb-4">
            Account Details
          </h1>
          {/* <h1 className='w-fit px-3 py-2 mx-auto mb-3 text-3xl rounded-full bg-green-800 text-white uppercase'>{(user.name).charAt(0)}</h1> */}
          <div className="flex flex-col ">
            <div className="flex items-center w-full mb-4 text-lg">
              <label htmlFor="" className="w-1/3">
                Employee Name
              </label>
              <input
                type="text"
                className="w-2/3 p-2 border border-black/75 rounded-md font-medium"
                readOnly
                value={user.name}
              />
            </div>
            <div className="flex items-center mb-4 text-lg">
              <label htmlFor="" className="w-1/3">
                Employee Id
              </label>
              <input
                type="text"
                className="w-2/3 p-2 border border-black/75 rounded-md font-medium"
                readOnly
                value={user.empId}
              />
            </div>
            <div className="flex items-center mb-4 text-lg">
              <label htmlFor="" className="w-1/3">
                Password
              </label>
              <div className="relative w-2/3">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="w-full p-2 border border-black/75 rounded-md font-medium"
                  readOnly
                  value={user.password}
                />
                <button
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
            </div>
          </div>
          <div className="w-full flex gap-4">
            {/* <button className='w-1/2 px-3 py-1.5 bg-green-500 rounded-md text-white text-lg' >Edit Details</button> */}
            <button
              className="w-1/3 mx-auto px-3 py-1.5 bg-red-500 rounded-md text-white text-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AccountPage;
