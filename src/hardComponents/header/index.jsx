import "../../App.css";
import logo from "../../assets/logohpu.png";
import { useClerk } from "@clerk/clerk-react";




// const label = [
//   {
//     title: "Tìm màu sơn",
//     sub: [
//       {
//         title: "example",
//         path: "/example",
//       },
//       {
//         title: "example",
//         path: "/example",
//       },
//     ],
//   },
//   {
//     title: "Chọn sản phẩm",
//     sub: [
//       {
//         title: "example",
//         path: "/example",
//       },
//       {
//         title: "example",
//         path: "/example",
//       },
//     ],
//   },
//   {
//     title: "Ý tưởng",
//     sub: [
//       {
//         title: "example",
//         path: "/example",
//       },
//       {
//         title: "example",
//         path: "/example",
//       },
//     ],
//   },
// ];

export default function Index() {
  const { signOut } = useClerk();
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
      <div className="text-white mt-[30px] pr-[20px] font-bold">
        <button onClick={() => signOut()}>Đăng xuất</button>
      </div>
    </header>
  );
}