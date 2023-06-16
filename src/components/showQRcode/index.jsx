import { useEffect, useState } from 'react'
import PLVBST from "./PLVSSTUDENT"
export default function index() {
  const currentUrl = window.location.href;
  const [masv, setMasv] = useState()
  console.log(currentUrl);
  const [dataurlqrcode, setDataurlqrcode] = useState()
  useEffect(() => {
    const url = `${currentUrl}`;
    const lastSegment = url.substring(url.lastIndexOf('/') + 1);
    console.log(lastSegment);
    setMasv(lastSegment)



  }, [currentUrl]);

  useEffect(() => {
    console.log("gọi lại api")
    const callApi = async () => {

        await fetch(`https://qlvbcc.hasura.app/api/rest/get_minhchung/${masv}/phulucvanbang`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
            },
            // body:JSON.stringify({masv:'1912101003'})

        })
            .then(response => response.json())
            .then(datasv => {
                const url = `${datasv.minhchung[0].linkdrive}`;
                const parts = url.split('/');
                const lastPart = parts[parts.length - 1];
                // setTendetai(datasv.f_get_ttsv5[0].tendetai)
                setDataurlqrcode(lastPart)
            });
    }
    callApi();
}, [masv]);

  const handleClickxemminhchung = () => {
    const url = `https://drive.google.com/drive/u/2/folders/${dataurlqrcode}`;
    window.location.href = url;
  };
  return (
    <div>
      <div className='flex justify-end mt-[30px]'>
        <button className=" w-[200px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
            border border-black hover:bg-red-600 hover:text-white" onClick={() => {
            handleClickxemminhchung()
          }}>Xem minh chứng</button>
      </div>
      {masv && <div className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto mb-[15px] min-h-[420px]"><PLVBST masv={masv} /> </div>}
    </div>
  )
}
