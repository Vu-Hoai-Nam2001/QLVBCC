// import React from 'react'

// export default function Index() {
//   return (
//     <div className='flex-1 pt-[82px] pl-[90px]'>
//       chíp hâps
//     </div>
//   )
// }


import { BsSearch } from "react-icons/bs"

import Table from "./Table"
import { useState, useEffect } from "react"
import { useClerk } from "@clerk/clerk-react";
// import Table from "./Table"



export default function Index() {



  const [role, setRole] = useState('3');
  const [datauser, setDatauser] = useState('');
  const [usercode, setusercode] = useState('');
  
  


  const callApi = async () => {

    await fetch(`https://qlvbcc.hasura.app/api/rest/get_ttuser//${usercode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': `${import.meta.env.VITE_VALUE_HASURA}`,
      },
      // body:JSON.stringify({masv:'1912101003'})

    })
      .then(response => response.json())
      .then(datauser => {
        setDatauser(datauser.f_get_ttuser)

      });
      console.log(datauser);
      
      // setChecked(datauser[0].role_id)
  }

 

  // console.log(datauser.role_id);


  const { user } = useClerk();
  const magv = user.publicMetadata.magv
  console.log(user.publicMetadata.magv)
  useEffect(() => {
    console.log("gọi lại api")
    const callApi = async () => {

      await fetch(`${import.meta.env.VITE_API_GET_ROLE}${user.publicMetadata.magv}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': `${import.meta.env.VITE_VALUE_HASURA}`,
        },
        // body:JSON.stringify({masv:'1912101003'})

      })
        .then(response => response.json())
        .then(datasv => {
          setRole(datasv.users[0].role_id)

        });
    }
    callApi();
  }, [user.publicMetadata.magv]);


  console.log(role)

  
  
  
  return (
    <main className=" flex-1 pt-[100px] pl-[90px]">
      {magv !== undefined ? <><div className="flex justify-end">
        <div className="relative w-[24%] ">
          <input value={usercode} onChange={e => setusercode(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Nhập msv hoặc số cmt" />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <BsSearch />
          </span>
        </div>
        <button
          onClick={callApi}
          className=" mt-[8px] ml-[3px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] 
      border border-black hover:bg-red-600 hover:text-white ">TÌm kiếm</button>
      </div>
        {/* {role === 2 ? <> <button onClick={() => { window.location.href = "/edit"; }} className="ml-auto mt-[5px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black
       hover:bg-red-600 hover:text-white">Sửa</button></> : <></>} */}

        <Table datauser={datauser} role={role}/>

      </> : <>

      </>
      }
      

    </main>
  );
}



