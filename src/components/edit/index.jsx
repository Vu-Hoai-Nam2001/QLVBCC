import "../../App.css";
import { BsSearch } from "react-icons/bs"
import PLVB from "./PLVS"

import { useState, useEffect } from "react"
import { useClerk } from "@clerk/clerk-react";
// import Table from "./Table"

export default function Index() {
  const [show, setShow] = useState(false);
  const [masv, setMasv] = useState('');
  const [masv2, setMasv2] = useState('');
  


  // const {getToken} = useAuth();
  // useEffect(() => {
  //   const callApi = async() => {

  //     await fetch(`https://qlvbcc.hasura.app/api/rest/get_tensv/1912101003`, {
  //       method: 'pull',
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
  const { user } = useClerk();
  const magv = user.publicMetadata.magv
  const [role, setRole] = useState('3');
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

  // const callApi = async () => {

  //   await fetch(`/../../api/newfileggdrive`, {
  //     method: 'POST',
  //     body:JSON.stringify({name:'1912101003'})

  //   })
  //     .then(response => response.json())
  //     .then(datasv => {
  //       setRole(datasv.users[0].role_id)

  //     });
  // }

  console.log(user.publicMetadata.magv)
  return (
    <main className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto mb-[15px] min-h-[420px]">
      {role===2||role===4 && magv !== undefined  ? <><div className="flex justify-end">
        <div className="relative w-[20%] ">
          <input value={masv} onChange={e => setMasv(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Nhập msv hoặc số cmt" />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <BsSearch />
          </span>
        </div>
        <button onClick={() => {
          if (masv !== '') {
            setShow(true)
            setMasv2(masv)
            // callApi()
          }
          else setShow(false)


        }} className=" mt-[8px] ml-[3px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
      border border-black hover:bg-red-600 hover:text-white ">TÌm kiếm</button>
      </div>
        

        

        { show && <PLVB data={masv2} />}
        
        {/* <Table/> */}
      </> : <>
      </>
      }
    </main>
  );
}


