import "../../App.css";
import { BsSearch } from "react-icons/bs"
import PLVB from "./PLVS"
import PLVBST from "./PLVSSTUDENT"
import { useState, useEffect } from "react"
import { useClerk } from "@clerk/clerk-react";
import Print from "./../print"
// import Table from "./Table"
import { AiFillPrinter } from "react-icons/ai"
import{BiEditAlt} from "react-icons/bi"

export default function Index() {
  const [show, setShow] = useState(false);
  const [masv, setMasv] = useState('');
  const [masv2, setMasv2] = useState('');
  const [role, setRole] = useState('3');
  const [showprint, setShowprint] = useState(false);
  const [datamasv, setDataMasv] = useState('');



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
    <main className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto mb-[15px] min-h-[420px]">
      {magv !== undefined ? <><div className="flex justify-end">
        <div className="relative w-[20%] ">
          <input value={masv} onChange={e => setMasv(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Nhập msv hoặc số cmt" />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <BsSearch />
          </span>
        </div>
        <button onClick={() => {
          if (masv !== '') {
            setShow(true)
            setShowprint(false)
            setMasv2(masv)
          }
          else setShow(false)


        }} className=" mt-[8px] ml-[3px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] text-white 
      border border-black hover:bg-red-600 hover:text-white ">TÌm kiếm</button>
      </div>
        {role === 2 || role === 4 ? <>
          <div className="flex ml-auto">
            <button
              onClick={() => { window.location.href = "/edit"; }} className="ml-auto mt-[5px] w-[55px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black text-white 
       hover:bg-red-600 hover:text-white flex  items-center justify-center">
              <BiEditAlt className="text-[25px]"/>
            </button>
            <button
              onClick={() => {
                if (masv !== '') {
                  setShowprint(true)
                  setShow(false)
                }
                else setShowprint(false)
              }}

              className="ml-[10px] mt-[5px] w-[55px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black text-white 
       hover:bg-red-600 hover:text-white flex  items-center justify-center ">
              <AiFillPrinter className="text-[25px] " />
            </button>

          </div>
        </> : <></>}



        {show && <PLVB data={masv2} setDataMasv={setDataMasv} />}
        {/* <Table/> */}
        {
          showprint && < Print data={datamasv} />
        }


      </> : <>
        <main className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto mb-[15px]">
          <PLVBST />
        </main>
      </>
      }
    </main>
  );
}


