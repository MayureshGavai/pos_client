import React from 'react'
import { GoHome } from "react-icons/go";
import { BiFoodMenu } from "react-icons/bi";
import {  HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineFastfood } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuUserCircle2 } from "react-icons/lu";
import cafelogo from '../assets/cafelogo.jpg'

import SideNavItem from './SideNavItem';


const SideNav = () => {
  return (
    <div className='flex flex-col w-1/12 px-4 py-1 h-screen bg-white border-r font-Inter z-10 fixed'>
        <div className='w-20 h-20 mx-auto mb-4'>
          <img src={cafelogo} alt="" className='w-full h-full object-cover' />
          {/* <h1 className=' text-2xl font-semibold text-center'>POS</h1> */}
        </div>
        <SideNavItem to="/" icon={<GoHome/>} text={"Home"}/>
        <SideNavItem to="/orderslist" icon={<BiFoodMenu/>} text={"Orders"}/>
        <SideNavItem to="/items" icon={<MdOutlineFastfood/>} text={"Items"}/>
        {/* <SideNavItem to="/customers" icon={<HiOutlineUserGroup/>} text={"Customers"}/> */}
        <SideNavItem to="/account" icon={<LuUserCircle2   />} text={"Account"} />

    </div>
    
  )
}

export default SideNav