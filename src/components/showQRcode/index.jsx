import {useEffect, useState} from 'react'
import PLVBST from "./PLVSSTUDENT"
export default function index() {
    const currentUrl = window.location.href;
    const [masv, setMasv]= useState()
  console.log(currentUrl);

  useEffect(() => {
    const url = `${currentUrl}`;
    const lastSegment = url.substring(url.lastIndexOf('/') + 1);
    console.log(lastSegment);
    setMasv(lastSegment)



  }, [currentUrl]);
  return (
    <div> 
        {masv && <div className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto mb-[15px] min-h-[420px]"><PLVBST masv={masv}/> </div>}
    </div>
  )
}
