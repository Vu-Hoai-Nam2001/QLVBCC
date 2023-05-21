import "../../App.css";
import logo from "../../assets/logo2.png";
import Table from "./Table"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/clerk-react";

export default function Index(props) {
    const [datasv, setDatasv] = useState([])
    const [tinchi, setTinchi] = useState(0)
    const [tbtk, setTbtk] = useState(0)
    const { getToken } = useAuth();
    useEffect(() => {
        console.log("gọi lại api")
        const callApi = async () => {

            await fetch(`${import.meta.env.VITE_ABOUT_STUDENT_SEARCH}${props.data}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getToken({
                        template: import.meta.env.VITE_TEMPLATE_STUDENT_QLVBCC
                    })}`,
                },
                // body:JSON.stringify({masv:'1912101003'})

            })
                .then(response => response.json())
                .then(datasv => {
                    setDatasv(datasv.f_get_ttsv5)

                });
        }
        callApi();
    }, [props.data]);
    console.log(datasv)

    return (
        <div>
            {datasv && datasv.map((sinhvien, index) => (
                <div key={index}>
                    <div className="flex justify-between mt-[30px]">
                        <div className="flex">
                            <img
                                src={logo}
                                alt="logo"
                                className="object-cover  left-0 h-[75px]"
                            />
                            <div className="flex flex-col justify-center items-center ">
                                <a className="font-bold ">BỘ GIÁO DỤC VÀ ĐÀO TẠO </a>
                                <a className="font-bold underline">TRƯỜNG ĐẠI HỌC QUẢN LÝ VÀ CÔNG NGHỆ HẢI PHÒNG</a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center ">
                            <a className="font-bold ">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</a>
                            <a className="font-bold underline">Độc lập - Tự do - Hạnh phúc</a>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-[50px]">
                        <h2 className="font-bold text-[30px] ">PHỤ LỤC VĂN BẰNG</h2>
                    </div>
                    <div className="flex  ml-[30px]  w-[100%] mt-[50px] ">
                        <div className="flex flex-col w-[50%] gap-[5px]">
                            <a>Họ và tên: {sinhvien.hoten}</a>

                            <a>Giới tính: {sinhvien.goitinh}</a>

                            <a>Mã sinh viên: {sinhvien.masinhvien}</a>

                            <a>Số CCCD: {sinhvien.socmnd}</a>

                            <a>Hình thức đào tạo: {sinhvien.hedaotao}</a>

                            <a>Trình độ đào tạo: ..........</a>
                        </div>
                        <div className="flex flex-col w-[50%] gap-[5px]">
                            <a>Ngôn ngữ đào tạo: ...................</a>

                            <a>Ngày sinh: {sinhvien.nganysinh.split(` `)[0].split('-').reverse().join('-')}</a>

                            <a>Khóa: {sinhvien.tenkhoahoc}</a>

                            <a>Chuyên ngành: {sinhvien.tennganh}</a>

                            <a>Ngày nhập học: {sinhvien.ngayvaotruong}</a>

                            <a>Thời gian đào tạo: {sinhvien.thoigiandaotao}</a>
                        </div>
                    </div>
                    <Table masinhvien={sinhvien.masinhvien} setTinchi={setTinchi} setTbtk={setTbtk} />
                    <div className="flex justify-between mt-[30px] ">
                        <div className="flex flex-col gap-[5px]">
                            <a >Tên đề tài tốt nghiệp: <span className="font-bold">{sinhvien.tendetai}</span></a>

                            <a >Điểm trung bình toàn khóa(hệ 4):<span className="font-bold"> {tbtk}</span></a>

                            <a >Tổng số tín chỉ: <span className="font-bold">{tinchi}</span></a>

                            <a >Xếp hạng tốt nghiệp: <span className="font-bold">{sinhvien.xeploaitotnghiep}</span> </a>

                            <a>Số hiệu văn bằng: <span className="font-bold">{sinhvien.sohieubang}</span> </a>

                            <a >Số vào sổ ngày cấp văn bằng: <span className="font-bold">{sinhvien.sovaoso}</span> </a>
                        </div>

                        <div className="flex flex-col justify-center  items-center">
                            <a className="">Hải Phòng,ngày....tháng....năm....</a>
                            <a className="">TL, HIỆU TRƯỞNG</a>
                            <a>TRƯỞNG PHÒNG ĐÀO TẠO - QLKH</a>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}




// export default function Index(props) {
//     console.log(props)
//     const [datasv, setDatasv] = useState([])

//     const { getToken } = useAuth();
//     useEffect(() => {
//         console.log("gọi lại api")
//         const callApi = async () => {

//             await fetch(`${import.meta.env.VITE_EDU_ALL_SCORE}1912111003`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${await getToken({
//                         template: import.meta.env.VITE_TEMPLATE_EDU_QLVBCC
//                     })}`,
//                 },
//                 // body:JSON.stringify({masv:'1912101003'})

//             })
//                 .then(response => response.json())
//                 .then(res => setDatasv(res));
//         }
//         callApi();
//     });
//     console.log(datasv)

//     return (
//         <div>
//             {datasv && datasv.map((sinhvien, index) => (
//                 <div key={index}>
//                     <div className="flex justify-between mt-[30px]">
//                         <div className="flex">
//                             <img
//                                 src={logo}
//                                 alt="logo"
//                                 className="object-cover  left-0 h-[75px]"
//                             />
//                             <div className="flex flex-col justify-center items-center ">
//                                 <a className="font-bold ">BỘ GIÁO DỤC VÀ ĐÀO TẠO </a>
//                                 <a className="font-bold underline">TRƯỜNG ĐẠI HỌC QUẢN LÝ VÀ CÔNG NGHỆ HẢI PHÒNG</a>
//                             </div>
//                         </div>
//                         <div className="flex flex-col justify-center items-center ">
//                             <a className="font-bold ">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</a>
//                             <a className="font-bold underline">Độc lập - Tự do - Hạnh phúc</a>
//                         </div>
//                     </div>
//                     <div className="flex flex-col justify-center items-center mt-[50px]">
//                         <h2 className="font-bold text-[30px] ">PHỤ LỤC VĂN BẰNG</h2>
//                     </div>
//                     <div className="flex  ml-[30px]  w-[100%] mt-[50px] ">
//                         <div className="flex flex-col w-[50%] gap-[5px]">
//                             <a>Họ và tên: {sinhvien.hoten}</a>

//                             <a>Giới tính: {sinhvien.goitinh}</a>

//                             <a>Mã sinh viên: {sinhvien.masinhvien}</a>

//                             <a>Số CCCD: {sinhvien.socmnd}</a>

//                             <a>Hình thức đào tạo: {sinhvien.hedaotao}</a>

//                             <a>Trình độ đào tạo: ..........</a>
//                         </div>
//                         <div className="flex flex-col w-[50%] gap-[5px]">
//                             <a>Ngôn ngữ đào tạo: ...................</a>

//                             <a>Ngày sinh: {sinhvien.nganysinh.split(` `)[0].split('-').reverse().join('-')}</a>

//                             <a>Khóa: {sinhvien.tenkhoahoc}</a>

//                             <a>Chuyên ngành: {sinhvien.tennganh}</a>

//                             <a>Ngày nhập học: {sinhvien.ngayvaotruong}</a>

//                             <a>Thời gian đào tạo: {sinhvien.thoigiandaotao}</a>
//                         </div>
//                     </div>
//                     <Table />
//                     <div className="flex justify-between mt-[30px] ">
//                         <div className="flex flex-col gap-[5px]">
//                             <a >Tên đề tài tốt nghiệp: <span className="font-bold">{data.tendetaitotnghiep}</span></a>

//                             <a >Điểm trung bình toàn khóa(hệ 4):<span className="font-bold"> {data.DTBTK}</span></a>

//                             <a >Tổng số tín chỉ: <span className="font-bold">{data.TSTC}</span></a>

//                             <a >Xếp hạng tốt nghiệp: <span className="font-bold">{sinhvien.xeploaitotnghiep}</span> </a>

//                             <a>Số hiệu văn bằng: <span className="font-bold">{sinhvien.sohieubang}</span> </a>

//                             <a >Số vào sổ ngày cấp văn bằng: <span className="font-bold">{sinhvien.sovaoso}</span> </a>
//                         </div>

//                         <div className="flex flex-col justify-center  items-center">
//                             <a className="">Hải Phòng,ngày....tháng....năm....</a>
//                             <a className="">TL, HIỆU TRƯỞNG</a>
//                             <a>TRƯỞNG PHÒNG ĐÀO TẠO - QLKH</a>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//         </div>
//     )
// }
