import "../../App.css";
import logo from "../../assets/logohpu.png";
import { useClerk, useUser  } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { isSignedIn} = useUser() 
  console.log(isSignedIn)
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate("/signin");
  };
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
        <button onClick={() => signOut()}>Đăng xuất</button>
      </div> : <div className="text-white mt-[30px] pr-[20px] font-bold">
        <button onClick={handleLogIn} >Đăng nhập</button>
      </div> }
      
    </header>
  );
}