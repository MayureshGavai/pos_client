import React from 'react'
import SideNav from '../components/SideNav'

const ReportsPage = () => {
  return (
    <div className='flex'>
        <SideNav/>
        <div className="ml-[120px] mb-4 px-5 w-full font-Inter">
            <div className="px-2 py-4 sticky top-0 bg-white flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Reports Page</h1>
            <div className="flex items-center text-lg d-none">
                {/* <h1 className="mr-4">Total Products : {itemsData.length}</h1> */}
                {/* <AddItemModal/> */}
            </div>
            </div>
            {/* <div className='mx-auto mt-2 p-4 w-1/2 border rounded-md'>
                <h1 className="text-center text-2xl font-semibold mb-4">
                    Report Details
                </h1>
            </div> */}
            <div className='flex justify-between'>
            </div>
            <div className="my-2 flex items-center">
                <h1 className="text-base mr-4">Search Report Details</h1>
                <input type="date" className='w-64 mr-3 px-2 py-1 border rounded-md' />
                {/* <input type="text" value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} className="" placeholder="Item name"/> */}
            </div>
        </div>
    </div>
  )
}

export default ReportsPage