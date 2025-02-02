import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { FaDownload } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { downloadDateSalesReport, downloadTodaySalesReport, getDateSalesData, getTodaySalesData, STATUSES } from "../store/reportSlice";
import { toast } from "react-toastify";

const ReportsPage = () => {
    const dispatch = useDispatch();
    const { data, status } = useSelector((state) => state.reports);

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect(() => {
        dispatch(getTodaySalesData())
    }, [dispatch])

    const handleDateSales = () => {
        if(!startDate || !endDate){
            alert("Please select both start and end dates.")
            return
        }

        if (new Date(startDate) > new Date(endDate)) {
            toast.error("Start date cannot be later than end date.")
            return
        }
        // console.log(startDate, endDate)
        const selectedDatesData = {
            fromDate : startDate, 
            toDate : endDate
        }
        dispatch(getDateSalesData(selectedDatesData))
            .unwrap()
            .then((res) => {
                console.log("Sales Data for Selected Date Range:", res);
            })
            .catch((err) => {
                console.error("Error fetching sales data for selected date range:", err);
            })
    }

    const handleDownloadTodaySalesReport = () => {
        dispatch(downloadTodaySalesReport())
        .unwrap()
        .then((blob) => {
            if (!(blob instanceof Blob)) {
                console.error("Downloaded data is not a Blob", blob);
                toast.error("Error: Invalid report file.");
                return;
            }

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `today_sales.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch((err) => {
            console.error("Error downloading report:", err);
        });
    }

    const handleDownloadDateSalesReport = () => {
        if(!startDate || !endDate){
            alert("Please select both start and end dates.")
            return
        }

        if (new Date(startDate) > new Date(endDate)) {
            toast.error("Start date cannot be later than end date.")
            return
        }

        const selectedDatesData = {
            fromDate : startDate, 
            toDate : endDate
        }

        dispatch(downloadDateSalesReport(selectedDatesData))
            .unwrap()
            .then((blob) => {
                if (!(blob instanceof Blob)) {
                    console.error("Downloaded data is not a Blob", blob);
                    toast.error("Error: Invalid report file.");
                    return;
                }
    
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Sales_Report_${startDate}_to_${endDate}.xlsx`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch((err) => {
                console.error("Error downloading report:", err);
            })

    }

    if (status === STATUSES.LOADING) {
        return <h1 className="text-3xl w-fit mx-auto mt-3">Loading...</h1>;
    }

    if (status === STATUSES.ERROR || !data || data.length === 0) {
        return (
            <div className="flex flex-col">
                <h1 className="text-3xl font-semibold mt-3 w-fit mx-auto text-red-500">
                    No Sales Data Available!
                </h1>
                <img
                    className="h-[100px] w-[100px] mx-auto"
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHpxZWtnY2NkbTUxcGRoY24yaWp2ZTd6cnN0OXRvdzIyb28yejByZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/S1pFYJvJdO6DdlNsQ3/giphy.gif"
                    alt="Error"
                />
            </div>
        );
    }

    // Calculate total amount
    let totalAmount = 0;
    const itemMap = new Map();

    data.items.forEach((item) => {
        const { name, amount, quantity } = item;
        const totalPrice = amount * quantity;

        if (itemMap.has(name)) {
            const existing = itemMap.get(name);
            existing.quantity += quantity;
            existing.amount += totalPrice;
        } else {
            itemMap.set(name, { name, quantity, amount: totalPrice });
        }

        totalAmount += totalPrice;
      
    })

    const tableData = Array.from(itemMap.values());

    return (
        <div className="flex">
            <SideNav />
            <div className="ml-[120px] mb-4 px-5 w-full font-Inter">
                <div className=" px-2 py-4 sticky top-0 bg-white flex justify-between items-center">
                    <div className="w-full flex justify-between items-center text-lg">
                        <h1 className="text-2xl font-semibold">Reports Page</h1>
                        <button 
                            className="flex items-center gap-1 px-5 py-1 bg-green-500 rounded-md text-white"
                            onClick={handleDownloadTodaySalesReport}
                        >
                            <FaDownload /> Today's Report
                        </button>
                    </div>
                </div>

                <div className="my-2 flex justify-between items-center">
                    <h1 className="text-base mr-4">Search Report Details</h1>
                    <div className="flex gap-2">
                        <input 
                            type="date" 
                            className="w-64 mr-3 px-2 py-1 border rounded-md" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}    
                        />
                        <input 
                            type="date" 
                            className="w-64 mr-3 px-2 py-1 border rounded-md" 
                            max={new Date()?.toISOString()?.slice(0, 10)}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button 
                            className="px-5 py-1 bg-green-500 rounded-md text-white"
                            onClick={handleDateSales}
                        >
                            Get Report
                        </button>
                        <button 
                            className="px-4 py-1 bg-green-500 rounded-md text-white"
                            onClick={handleDownloadDateSalesReport}
                        >
                            <FaDownload />
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                <table className="table-fixed w-full border">
                    <thead>
                        <tr className="bg-black text-white ">
                            <th className="w-1/4  px-4 py-2 text-left">Item Name</th>
                            <th className="w-1/5  px-4 py-2 text-left">Quantity</th>
                            <th className="w-1/6 px-4 py-2 text-left">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border text-left">{item.name}</td>
                            <td className="px-4 py-2 border text-left">{item.quantity}</td>
                            <td className="px-4 py-2 border text-left">₹ {item.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="bg-gray-100 font-semibold">
                        <td className="px-4 py-2 border text-right" colSpan="2">Total:</td>
                        <td className="px-4 py-2 border text-left">₹ {totalAmount.toFixed(2)}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
