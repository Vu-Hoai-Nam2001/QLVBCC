import "../../App.css";
import { BsSearch } from "react-icons/bs"
import PLVB from "./PLVS"
import Vanbang from "./Vanbang"
import Xemchungchi from "./xemchungchi"
import { useState } from "react"
import { useClerk } from "@clerk/clerk-react";



export default function Index() {
  const { user } = useClerk();
  console.log(user)
  const [show, setShow] = useState(false);

  const [masv, setMasv] = useState('');
  const [masv2, setMasv2] = useState('');
  const [activeItem, setActiveItem] = useState('');
  const [showphuluc, setShowphuluc] = useState(false);
  const [showchungchi, setShowchungchi] = useState(false);
  const [showvanbang, setShowvanbang] = useState(false);
  const handleItemClick = (item) => {
    setActiveItem(item);
    // Code xử lý tương ứng với mỗi chức năng
    switch (item) {
      case 'phu_luc':
        setShowphuluc(true)
        setShowchungchi(false)
        setShowvanbang(false)
        setMasv("")
        setShow(false)
        console.log('Đang tìm kiếm phụ lục văn bằng...');
        // Xử lý tìm kiếm phụ lục văn bằng
        break;
      case 'chung_chi':
        setShowphuluc(false)
        setShowchungchi(true)
        setShowvanbang(false)
        setMasv("")
        setShow(false)
        console.log('Đang tìm kiếm chứng chỉ...');
        // Xử lý tìm kiếm chứng chỉ
        break;
      case 'van_bang':
        setShowphuluc(false)
        setShowchungchi(false)
        setShowvanbang(true)
        setMasv("")
        setShow(false)
        console.log('Đang tìm kiếm văn bằng...');
        // Xử lý tìm kiếm văn bằng
        break;
      default:
        break;
    }
  };

  return (
    <main className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto mb-[30px] min-h-[420px]">

      <div className="flex justify-center">
        <ul className="flex space-x-4">
          <li
            className={`cursor-pointer ${activeItem === 'phu_luc' ? 'text-blue-500 font-semibold' : ''}`}
            onClick={() => handleItemClick('phu_luc')}
          >
            Tìm kiếm phụ lục văn bằng
          </li>
          <li
            className={`cursor-pointer ${activeItem === 'chung_chi' ? 'text-blue-500 font-semibold' : ''}`}
            onClick={() => handleItemClick('chung_chi')}
          >
            Tìm kiếm chứng chỉ
          </li>
          <li
            className={`cursor-pointer ${activeItem === 'van_bang' ? 'text-blue-500 font-semibold' : ''}`}
            onClick={() => handleItemClick('van_bang')}
          >
            Tìm kiếm văn bằng
          </li>
        </ul>
      </div>
      {showphuluc && <> <div className="flex justify-end mt-[30px]">
        <div className="relative w-[20%] ">
          <input value={masv} onChange={e => setMasv(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Mã sinh viên hoặc số CMND" />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <BsSearch />
          </span>
        </div>
        <button onClick={() => {
          if (masv !== '') {
            setShow(true)
            setMasv2(masv)
          }
          else setShow(false)


        }} className=" mt-[8px] ml-[3px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
      border border-black hover:bg-red-600 hover:text-white ">TÌm kiếm</button>
      </div>

        {show && <PLVB masv={masv2} />} </>}

      {showchungchi &&
        <div>
          <div className="flex justify-end mt-[30px]">
            <div className="relative w-[20%] ">
              <input value={masv} onChange={e => setMasv(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Nhập MSV " />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <BsSearch />
              </span>
            </div>
            <button onClick={() => {
              if (masv !== '') {
                setShow(true)
                setMasv2(masv)
              }
              else setShow(false)


            }}  className=" mt-[8px] ml-[3px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
      border border-black hover:bg-red-600 hover:text-white ">TÌm kiếm</button>
          </div>

          {show && <Xemchungchi masv={masv2} />}
        </div>

      }

      {showvanbang &&
        <div>
          <div className="flex justify-end mt-[30px]">
            <div className="relative w-[20%] ">
              <input value={masv} onChange={e => setMasv(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Mã sinh viên hoặc số CMND" />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <BsSearch />
              </span>
            </div>
            <button onClick={() => {
              if (masv !== '') {
                setShow(true)
                setMasv2(masv)
              }
              else setShow(false)


            }} className=" mt-[8px] ml-[3px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
      border border-black hover:bg-red-600 hover:text-white ">TÌm kiếm</button>
          </div>

          {show && <Vanbang masv={masv2} />}
        </div>
      }



    </main>
  );
}
