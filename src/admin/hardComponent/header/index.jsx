import { useClerk, useUser } from "@clerk/clerk-react";
import "../../../App.css";
import logo from "../../../assets/logohpu.png";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { user } = useClerk();
  const { isSignedIn } = useUser()
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const handleLogIn = () => {
    navigate("/signinadmin");
  };
  return (
    <div className="fixed z-[1000] w-[100%] h-[80px] shadow-sm flex bg-sky-600">
      <div className="w-[130px] bg-primary h-[100%]">
        <img
          src={logo}
          alt="Logo truong"
          className="h-[100%] w-[130px] object-cover"
        />
      </div>

      <div className="w-[calc(100%_-_250px)] flex justify-end  gap-[10px]">
        {isSignedIn ? <>
          <img
            src={logo}
            className="w-[50px] h-[50px] self-center rounded-[50%] object-cover overflow-hidden bg-sky-600"
          />
          <div className=" mt-[20px]  font-bold">
            <div className="text-white flex flex-col justify-center ">
              <h3 className=" text-center self-center">
                {user?.publicMetadata.name}
              </h3>
              <button onClick={() => signOut()} className="text-[#e6e7e8]">Đăng xuất</button>
            </div>

          </div></> : <div className=" text-white mt-[30px] pr-[20px] font-bold">
          <button onClick={handleLogIn} >Đăng nhập</button>
        </div>}
      </div>
    </div>

  );
}
