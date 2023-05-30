import "../../App.css";
import logo from "../../assets/logo2.png";
import Table from "./TableSTUDENT"
import { useEffect, useState } from "react"
import { useAuth, useClerk } from "@clerk/clerk-react";



export default function Index() {
    const [datasv, setDatasv] = useState([])
    //lấy tổng số tín chỉ
    const [tinchi, setTinchi] = useState(0)
    // const handleLaytongtinchi = (data) => {
    //     setTinchi(data);
    //   };
    //lấy trung bình toàn khóa
    
    // const handleLaytbtk = (data) => {
    //     setTbtk(data);
    //   };

    const { user } = useClerk();
    // console.log(tinchi)
    const { getToken } = useAuth();
    useEffect(() => {

        const callApi = async () => {

            await fetch(`${import.meta.env.VITE_ABOUT_STUDENT_SEARCH_MSV}${user.publicMetadata.masv}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getToken({
                        template: import.meta.env.VITE_TEMPLATE_ABOUT_STUDENT
                    })}`,
                },
                // body:JSON.stringify({masv:'1912101003'})

            })
                .then(response => response.json())
                .then(datasv => {
                    setDatasv(datasv.f_get_ttsv)

                });
        }
        callApi();
    }, []);


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
                    <div className="flex flex-col mr-[8%]">
                        <img src={sinhvien.qrcode} alt="Ảnh" className="h-auto w-[100px] self-end" />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-[50px]">
                            <h2 className="font-bold text-[30px] ">PHỤ LỤC VĂN BẰNG</h2>
                        </div>
                    <div className="ml-[3%]">
                        
                        <div className="flex    w-[100%] mt-[60px] ">
                            <div className="flex flex-col w-[50%] gap-[5px]">
                                <a>Họ và tên: {sinhvien.hoten}</a>

                                <a>Giới tính: {sinhvien.goitinh}</a>

                                <a>Mã sinh viên: {sinhvien.masinhvien}</a>

                                <a>Số CCCD: {sinhvien.socmnd}</a>

                                <a>Hình thức đào tạo: {sinhvien.hedaotao}</a>

                                <a>Trình độ đào tạo: ..........</a>
                            </div>
                            <div className="flex flex-col w-[50%] gap-[5px]">
                                <a>Ngôn ngữ đào tạo: Tiếng việt</a>

                                <a>Ngày sinh: {sinhvien.nganysinh.split(` `)[0].split('-').reverse().join('-')}</a>

                                <a> {sinhvien.tenkhoahoc}</a>

                                <a>Chuyên ngành: {sinhvien.tennganh}</a>

                                <a>Ngày nhập học: {sinhvien.ngayvaotruong}</a>

                                <a>Thời gian đào tạo: {sinhvien.thoigiandaotao}</a>
                            </div>
                        </div>
                        <Table setTinchi={setTinchi}  />
                        <div className="flex justify-between mt-[30px] ">
                            <div className="flex flex-col gap-[5px]">
                                <a >Tên đề tài tốt nghiệp: <span className="font-bold">{sinhvien.tendetai}</span></a>

                                <a >Điểm trung bình toàn khóa(hệ 4):<span className="font-bold">{sinhvien.diem4}</span></a>

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
                </div>
            ))}

        </div>
    )
}

