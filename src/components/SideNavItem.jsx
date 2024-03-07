import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideNavItem = ({to,icon,text}) => {
    const location = useLocation()
    const isActive = location.pathname === to

  return (
    // <li className='mb-3'>
        <Link to={to} className={`text-md cursor-pointer h-10 flex flex-col justify-center items-center px-6 py-8 mb-3 rounded-lg  ${isActive ? 'bg-black/[0.15]' : 'hover:bg-black/[0.15]'}`}>
            <span className='text-xl'>{icon}</span>
            <span>{text}</span>
        </Link>
    // </li>
  )
}

export default SideNavItem