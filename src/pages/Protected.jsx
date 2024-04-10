import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cafelogo from '../assets/cafelogo.jpg'
import oops from '../assets/oops.jpg'


const Protected = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="md:hidden">
        <div className="text-center font-Inter">
          <div className="w-1/3 h-1/3 mx-auto mt-4">
          <img src={cafelogo} alt="" className="w-full h-full object-cover" />
          </div>
          <h1 className="w-fit mx-auto p-2 bg-green-500 text-lg text-white rounded-lg">Café Brew & Bite</h1>
          <div className="p-5">
            <img src={oops} alt="" className="w-1/2 mx-auto"/>
          <h1 className="text-3xl font-semibold my-4">Oops!</h1>
          <p className="text-lg mb-4">
            It looks like you're using a mobile device.
          </p>
          <p className="text-lg mb-4">
            Please switch to a laptop or desktop for the best experience.
          </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Component />
      </div>
    </div>
  );
};

export default Protected;
