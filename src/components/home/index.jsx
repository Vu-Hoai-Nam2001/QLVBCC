import "../../App.css";
import { BsSearch } from "react-icons/bs"
import PLVB from "./PLVS"
import { useState, useEffect } from "react"
import { useClerk, useAuth } from "@clerk/clerk-react";


const data = {
  name: "Hoài Nam",
  sex: "Nam",
  MSV: "191201003",
  SoCCCD: "1029831",
  Hinhthucdaotao: "Chính Quy",
  TRinhDoDT: "THPT",
  ngonngu: "Tiếng việt",
  ngaysinh: "26/01/2001",
  khoa: "k21",
  chuyennganh: "CNTT",
  ngaynhaphoc: "1/1/2019",
  thoigiandaotao: "4 năm",
  tendetaitotnghiep: "làm web",
  DTBTK: "3",
  TSTC: "118",
  XHTN: "Khá",
  SHVB: "123123",
  SVSNCB: "234234",
}

export default function Index() {
  const [show, setShow] = useState(false)
  const { signOut } = useClerk();

  const {getToken} = useAuth();
  useEffect(() => {
    const callApi = async() => {

      await fetch('https://qlvbcc.hasura.app/api/rest/get_tensv/1912111003', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken({
            template: `hasura-qlvbcc`
          })}`,
        },
        // body:JSON.stringify({masv:'1912101003'})

      })
        .then(response => response.json())
        .then((res) => {
          console.log(res);
        });
    }
    callApi();
  }, []);
  return (
    <main className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto">
      <div className="flex justify-end">
        <div className="relative w-[20%] ">
          <input className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Nhập msv hoặc số cmt" />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <BsSearch />
          </span>
        </div>
        <button onClick={() => {

          setShow(!show)
        }} className=" mt-[8px] ml-[3px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] 
      border border-black hover:bg-red-600 hover:text-white ">TÌm kiếm</button>
      </div>
      <button onClick={()=>{window.location.href = "/edit";}} className="ml-auto mt-[5px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black
       hover:bg-red-600 hover:text-white">Sửa</button>
      <button onClick={() => signOut()} className="ml-auto mt-[5px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black
       hover:bg-red-600 hover:text-white">Đăng xuất</button>
      {show && <PLVB data={data} />}
    </main>
  );
}
