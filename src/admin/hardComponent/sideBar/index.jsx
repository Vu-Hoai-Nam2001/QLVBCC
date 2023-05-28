import React from 'react'


import Menu from './menu'

const dataMenu = [
    {
        title: "Quản lý quyền cho tài khoản",
        to: "role"
    },
   
    // {
    //     title: "Tests",
    //     to: "Test"
    // },

]

export default function SideBar() {
  return (
    <div className='w-[300px] min-h-screen bg-[#ffffff] border-b-2 border-r-2 border-x-neutral-200'>
        <div className=''>
            {dataMenu.map((item, index)=>(
                <Menu key={index} item={item}/>
            ))}
        </div>

    </div>
  )
}
