import "../../App.css";
import { BsSearch } from "react-icons/bs"
import PLVB from "./PLVS"
import { useState} from "react"
import { useClerk} from "@clerk/clerk-react";


export default function Index() {
  const [show, setShow] = useState(false);
  const { signOut } = useClerk();
  const [masv, setMasv] = useState('');
  
  // const {getToken} = useAuth();
  // useEffect(() => {
  //   const callApi = async() => {

  //     await fetch(`https://qlvbcc.hasura.app/api/rest/get_tensv/1912101003`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${await getToken({
  //           template: `hasura-qlvbcc`
  //         })}`,
  //       },
  //       // body:JSON.stringify({masv:'1912101003'})

  //     })
  //       .then(response => response.json())
  //       .then((res) => {
  //         console.log(res);
  //       });
  //   }
  //   callApi();
  // }, []);
  console.log(masv)

  return (
    <main className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto">
      <div className="flex justify-end">
        <div className="relative w-[20%] ">
          <input value={masv} onChange={e=> setMasv(e.target.value)  } className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Nhập msv hoặc số cmt" />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <BsSearch />
          </span>
        </div>
        <button onClick={() => {
          if( masv !== ''){setShow(true)}
          else setShow(false)
          
          
        }} className=" mt-[8px] ml-[3px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] 
      border border-black hover:bg-red-600 hover:text-white ">TÌm kiếm</button>
      </div>
      <button onClick={()=>{window.location.href = "/edit";}} className="ml-auto mt-[5px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black
       hover:bg-red-600 hover:text-white">Sửa</button>
      <button onClick={() => signOut()} className="ml-auto mt-[5px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black
       hover:bg-red-600 hover:text-white">Đăng xuất</button>
      {show && masv !== '' &&  <PLVB data={masv}/>} 
    </main>
  );
}
