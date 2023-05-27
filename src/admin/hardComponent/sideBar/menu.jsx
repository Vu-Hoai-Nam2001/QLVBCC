import React from 'react'

import { NavLink } from 'react-router-dom'


export default function Menu({item}) {
  const active = ' text-[#e13b3b] '
  const normal = ''
  return (
    <NavLink 
      className={({isActive}) => isActive ? active : normal}
      to={item.to}
    >
      <p className='h-[70px] w-full flex items-center justify-center text-[20px] hover:text-[#ffffff] hover:bg-[#acacac] transition duration-300'>{item.title}</p>
    </NavLink>
    
  )
}
