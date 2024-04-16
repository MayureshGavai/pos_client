import React, { useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import axios from 'axios'
import Item from '../components/Items'
import Cart from '../components/Cart'
import HomeNav from '../components/HomeNav'

const HomePage = () => {

  
  return (
    <div className='flex '>
        <SideNav/>
        {/* <Cart/> */}
        <div className='ml-[120px] mb-4 px-5 w-full'>
            <HomeNav/>
            <div>
               <Item/>
            </div>
        </div>
    </div>
  )
}

export default HomePage