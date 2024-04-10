import React, { useEffect, useRef, useState } from "react";
import SideNav from "../components/SideNav";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { clearCart } from "../store/cartSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { IoCardOutline } from "react-icons/io5";
import { MdQrCodeScanner } from "react-icons/md";
import Invoice from "../components/Invoice";
import { postOrder } from "../store/orderSlice";
import { useReactToPrint } from 'react-to-print';


const Order = () => {
  const [paymentOption, setPaymentOption] = useState("cash");
  const [orderNumber,setOrderNumber] = useState(0)
  const [orderCounter, setOrderCounter] = useState(parseInt(localStorage.getItem('orderCounter')) || 0);
const [prevDate, setPrevDate] = useState(localStorage.getItem('prevDate') || null);
const [currentDateOrderNumber, setCurrentDateOrderNumber] = useState('');

  const invoiceRef = useRef(null);

  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.cart);
  const host = useSelector((state) => state.user);
  const navigate = useNavigate();

  // const subTotal = orderItems.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );
  const subTotal = orderItems.reduce((total,item)=> total + item.price * item.quantity,0)
  const tax = (subTotal * 0.18).toFixed(2)
  const total = parseInt(subTotal) + parseInt(tax)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  
  useEffect(() => {
  const currentDate = new Date().getDate();
  if (prevDate !== currentDate.toString()) {
    setOrderCounter(0);
    localStorage.setItem('orderCounter', 0);
    setPrevDate(currentDate.toString());
    localStorage.setItem('prevDate', currentDate.toString());
    
  }
    }, []);
    
    const currentDate = new Date().getDate();

    const generateOrderNumber = () => {
      const currentDate = new Date().getDate();
      if (prevDate !== currentDate.toString()) {
        setOrderCounter(0);
        localStorage.setItem('orderCounter', 0);
        setPrevDate(currentDate.toString());
        localStorage.setItem('prevDate', currentDate.toString());
      } else {
        setOrderCounter(prevCounter => prevCounter + 1);
        localStorage.setItem('orderCounter', orderCounter + 1);
      }
      const orderCounterStr = (orderCounter < 10) ? '0' + orderCounter : orderCounter;
      const newOrderNumber = `${currentDate}${orderCounterStr}`;
      setOrderNumber(newOrderNumber);
      return newOrderNumber;
    }
    
    useEffect(()=>{
      const orderCounterStr = (orderCounter < 10) ? '0' + orderCounter : orderCounter;
      setCurrentDateOrderNumber(`${currentDate}${orderCounterStr}`);
    },[])

  const onSubmit = (data) => {
    data.orderNumber = Number(generateOrderNumber());
    data.paymentOption = paymentOption;
    data.order = orderItems;
    data.subTotal = Number(subTotal);
    data.tax = Number(tax);
    data.total = Number(total);
    data.hostName = host.name;
    data.billNumber = generateBillNumber(orderCounter)
    console.log(data);
    dispatch(postOrder(data))
    toast.success("Order Successful", { position: "top-center" });
    dispatch(clearCart());
    reset();
    handlePrint(null, () => invoiceRef.current)
    setTimeout(()=>{  
      navigate('/')  
    },3000)
  };

  function generateBillNumber(orderCounter) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2); // Extract last 2 digits of the year
    const month = (date.getMonth() + 1); // Month starts from 0, so add 1 and pad with leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Pad day with leading zero if needed
    const orderNumberStr = `${currentDate}${orderCounter}`; // Ensure order number is 4 digits long
    return `${year}${month}${day}${orderNumberStr}`;
  }

  const handleOptionChange = (option) => {
    setPaymentOption(option);
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div className="flex">
      <SideNav />
      <div className="ml-[120px] mb-4 px-5 w-full font-Inter">
        <div className="px-2 pt-4 sticky top-0 bg-white flex justify-between items-center">
          <div className="mt-1 px-2 py-4 sticky top-0  bg-white flex items-center">
            <Link to="/" className="text-2xl">
              <IoMdArrowBack />
            </Link>
            <h1 className="ml-5 text-2xl font-semibold">Order Page</h1>
          </div>
        </div>
        <div className="flex mt-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-3 w-2/3"
            autoComplete="off"
          >
            <h1 className="text-xl font-semibold">Order Details</h1>
            <div className="w-full flex justify-between items-center my-3">
              <label htmlFor="name" className="w-1/3">
                Customer Name
              </label>
              <div className="w-2/3 flex flex-col">
                <input
                  className="w-full border p-1 px-2 rounded"
                  {...register("customerName", { required: true })}
                  placeholder="Customer Name"
                />
                {errors?.customerName && (
                  <p style={{ color: "red" }}>This field is required</p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between items-center my-3">
              <label htmlFor="name" className="w-1/3">
                Contact Number
              </label>
              <div className="w-2/3 flex flex-col">
                <input
                  type="tel"
                  className="w-full border p-1 px-2 rounded"
                  {...register("contactNumber", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                  })}
                  placeholder="Contact Number"
                />
                {errors?.contactNumber && (
                  <p style={{ color: "red" }}>This field is required</p>
                )}
                {errors?.contactNumber?.type === "pattern" && (
                  <p style={{ color: "red" }}>
                    Contact number must have 10 digits
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between items-center my-3">
              <label htmlFor="name" className="w-1/3">
                Recieved Payment Via
              </label>
              <div className="w-2/3 flex flex-col">
                <div className="items-center grid grid-cols-3 gap-3">
                  <button
                    className={`flex items-center justify-center cursor-pointer p-2 border rounded-md ${
                      paymentOption === "cash"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleOptionChange("cash")}
                    type="button" // Specify type="button" to prevent form submission
                  >
                    <span>Cash</span>
                    <HiOutlineCurrencyRupee className="text-2xl ml-2" />
                  </button>
                  <button
                    className={`flex items-center justify-center cursor-pointer p-2 border rounded-md ${
                      paymentOption === "card"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleOptionChange("card")}
                    type="button" // Specify type="button" to prevent form submission
                  >
                    <span>Card</span>
                    <IoCardOutline className="text-2xl ml-2" />
                  </button>
                  <button
                    className={`flex items-center justify-center cursor-pointer p-2 border rounded-md ${
                      paymentOption === "upi"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleOptionChange("upi")}
                    type="button" // Specify type="button" to prevent form submission
                  >
                    <span>UPI</span>
                    <MdQrCodeScanner className="text-2xl ml-2" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <Link
                      to='/'
                      className="mr-5 py-1 px-6 rounded-md border border-red-500 text-red-500"
                    >
                      Close
              </Link>
              <button
                type="submit"
                className="py-1 px-6 rounded-md border border-green-500 bg-green-500 text-white active:bg-green-600 active:text-white"
              >
                Submit
              </button>
            </div>
          </form>
          <Invoice ref={invoiceRef} paymentOption={paymentOption} billNumber={generateBillNumber(orderNumber)} orderNumber={currentDateOrderNumber} orderItems={orderItems}/>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Order;
