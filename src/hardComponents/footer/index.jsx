import { BsFacebook } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { SiZalo } from "react-icons/si";
export default function Index() {
  return (
    <footer className="bg-sky-600 h-[200px] gap-[20px] flex justify-evenly items-center w-[100%] ">
      <div className="flex flex-col w-[30%] pt-[30px]">
        <h3 className="text-white">Thông tin về HPU</h3>
        <a className="text-white">
          <span className="text-white font-bold">
            Địa chỉ:
          </span>Số 36, đường Dân Lập, phường Dư Hàng Kênh, quận Lê Chân, thành phố Hải Phòng</a>
      </div>

      <div className="flex flex-col pt-[30px] w-[25%]">
        <a className="text-white">
          <span className="text-white font-bold">
            Số điện thoại:
          </span> 0936 821 821</a>
        <a className="text-white">
          <span className="text-white font-bold">
            Email:
          </span> 0936 821 821</a>
        <a className="text-white">
          <span className="text-white font-bold">
            Giờ làm việc:
          </span> Thứ 2 - Sánh thứ 7</a>
      </div>

      <div className="flex flex-col pt-[30px] ">
        <h3 className="text-white">Social networks: </h3>
        <div className="flex text-[35px] mt-[20px]">
          <BsFacebook />
          <BsYoutube className="ml-[20px] text-[45px]" />
          <SiZalo className="ml-[20px] text-[55px]" />
        </div>
      </div>
    </footer>
  );
}
