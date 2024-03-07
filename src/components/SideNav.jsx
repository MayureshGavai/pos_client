import React from 'react'
import { GoHome } from "react-icons/go";
import { BiFoodMenu } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineFastfood } from "react-icons/md";
import { IoMdPower } from "react-icons/io";

import SideNavItem from './SideNavItem';


const SideNav = () => {
  return (
    <div className='flex flex-col w-1/12 px-4 py-8 h-screen border-r font-Inter z-10 fixed'>
        <h1 className=' text-2xl font-semibold mb-6 mx-3'>POS</h1>
        <SideNavItem to="/" icon={<GoHome/>} text={"Home"}/>
        <SideNavItem to="/bills" icon={<BiFoodMenu/>} text={"Bills"}/>
        <SideNavItem to="/items" icon={<MdOutlineFastfood/>} text={"Items"}/>
        <SideNavItem to="/customers" icon={<HiOutlineUserGroup/>} text={"Customers"}/>
        <SideNavItem to="/logout" icon={<IoMdPower/>} text={"Logout"} />

    </div>
    
  )
}

export default SideNav