import "../../App.css";
import logo from "../../assets/logohpu.png";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Index() {
  const { isSignedIn } = useUser()
  console.log(isSignedIn)
  const { signOut, user } = useClerk();
  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate("/signin");
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }
  return (
    <header className="flex h-[85px] bg-sky-600 justify-between">
      <div className="flex">
        <img
          src={logo}
          alt="logo"
          className="object-cover  left-0 h-[75px]"
        />
        <div className="text-white mt-[15px]">
          <h1>TRƯỜNG ĐẠI HỌC QUẢN LÝ VÀ CỒNG NGHỆ HẢI PHÒNG</h1>
          <h2>TRA CỨU VĂN BẰNG CHỨNG CHỈ</h2>
        </div>
      </div>
      {isSignedIn ? <div className="text-white mt-[30px] pr-[20px] font-bold">
        {user.publicMetadata.magv!==undefined? <div className="relative">
          <button className="bg-sky-600  hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded inline-flex items-center" onClick={toggleDropdown}>
          {user.publicMetadata.name}
            <svg className="fill-current w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M6 8l4 4 4-4"></path>
            </svg>
          </button>
          {isOpen && (
            <ul className="dropdown-content absolute bg-sky-600  text-white pt-1 w-[190px]">
              <li><a className="rounded-t bg-sky-600  hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="/edit">Cấp phát phụ lục văn bằng</a></li>
              <li><a className="bg-sky-600  hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="/teacher">Tìm kiếm</a></li>
              <li><a className="bg-sky-600  hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="/bosungvanbang">Bổ sung minh chứng văn bằng</a></li>
              <li><a className="bg-sky-600  hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="/bosungchungchi">Bổ sung minh chứng chứng chỉ</a></li>
              <li><a className="bg-sky-600  hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="/soluuvanbangchungchi">Cập nhật sổ sưu</a></li>
              <li><a className="rounded-b bg-sky-600  hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={() => signOut()}>Đăng xuất</a></li>
            </ul>
          )}
        </div>: <div><button onClick={() => signOut()}>Đăng xuất</button></div>}
      </div> : <div className="text-white mt-[30px] pr-[20px] font-bold">
        <button onClick={handleLogIn} >Đăng nhập</button>
      </div>}
    </header>
  );
}