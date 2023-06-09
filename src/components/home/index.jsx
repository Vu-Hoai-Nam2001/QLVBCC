import "../../App.css";
import { BsSearch } from "react-icons/bs"
import PLVB from "./PLVS"
import { useState} from "react"
import {  useClerk } from "@clerk/clerk-react";



export default function Index() {
  const {user} = useClerk();
  console.log(user)
  const [show, setShow] = useState(false);
  
  const [masv, setMasv] = useState('');
  const [masv2, setMasv2] = useState('');
  
  return (
    <main className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto mb-[30px] min-h-[420px]">
      <div className="flex justify-end">
        <div className="relative w-[20%] ">
          <input value={masv} onChange={e=> setMasv(e.target.value)  } className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Nhập số hiệu bằng" />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <BsSearch />
          </span>
        </div>
        <button onClick={() => {
          if( masv !== ''){setShow(true)
            setMasv2(masv)}
          else setShow(false)
          
          
        }} className=" mt-[8px] ml-[3px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
      border border-black hover:bg-red-600 hover:text-white ">TÌm kiếm</button>
      </div>
      {/* <button onClick={()=>{window.location.href = "/edit";}} className="ml-auto mt-[5px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black
       hover:bg-red-600 hover:text-white">Sửa</button> */}
      {show &&   <PLVB masv={masv2} />} 
      {/* <Table/> */}
      
      
      

    </main>
  );
}
