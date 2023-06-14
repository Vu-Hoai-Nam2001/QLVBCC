import "../../App.css";
import logo from "../../assets/logo2.png";
import Table from "./TableSTUDENT"
import { useEffect, useState } from "react"




export default function Index({masv}) {
    const [datasv, setDatasv] = useState([])
    //lấy tổng số tín chỉ
    const [tinchi, setTinchi] = useState(0)
    console.log(`đây là mã sinh viên bên plvb`)
    console.log(masv);
    

    
    // console.log(tinchi)
    useEffect(() => {

        const callApi = async () => {

            await fetch(`${import.meta.env.VITE_ABOUT_STUDENT_SEARCH_MSV}${masv}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
                  },
                // body:JSON.stringify({masv:'1912101003'})

            })
                .then(response => response.json())
                .then(datasv => {
                    setDatasv(datasv.f_get_ttsv)

                });
        }
        callApi();
    }, [masv]);


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
                                <a className="font-semibold ">BỘ GIÁO DỤC VÀ ĐÀO TẠO </a>
                                <a className="font-semibold underline">TRƯỜNG ĐẠI HỌC QUẢN LÝ VÀ CÔNG NGHỆ HẢI PHÒNG</a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center ">
                            <a className="font-semibold ">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</a>
                            <a className="font-semibold underline">Độc lập - Tự do - Hạnh phúc</a>
                        </div>
                    </div>
                    <div className="flex flex-col mr-[8%]">
                        <img src={sinhvien.qrcode} alt="Ảnh" className="h-auto w-[100px] self-end" />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-[50px]">
                        <h2 className="font-bold text-[30px] ">PHỤ LỤC VĂN BẰNG</h2>
                    </div>
                    <div className="ml-[3%]">

                        <div className="flex    w-[100%] mt-[50px] ">
                            <div className="flex flex-col w-[50%] gap-[5px]">
                                <a>Họ và tên: <span className="font-semibold">{sinhvien.hoten}</span> </a>

                                <a>Giới tính:<span className="font-semibold"> {sinhvien.goitinh}</span></a>

                                <a>Mã sinh viên:<span className="font-semibold">{sinhvien.masinhvien}</span> </a>

                                <a>Số CCCD:<span className="font-semibold">{sinhvien.socmnd}</span> </a>

                                <a>Hình thức đào tạo:<span className="font-semibold">{sinhvien.hedaotao}</span> </a>

                                <a>Trình độ đào tạo: ..........</a>
                            </div>
                            <div className="flex flex-col w-[50%] gap-[5px]">
                                <a>Ngôn ngữ đào tạo:<span className="font-semibold">Tiếng việt</span> </a>

                                <a>Ngày sinh:<span className="font-semibold">{sinhvien.nganysinh.split(` `)[0].split('-').reverse().join('-')}</span> </a>

                                <a>{sinhvien.tenkhoahoc.slice(0, 4)}: <span className="font-semibold">{sinhvien.tenkhoahoc.slice(4)}</span> </a>

                                <a>Ngành:<span className="font-semibold"> {sinhvien.tennganh}</span> </a>

                                <a>Ngày nhập học:<span className="font-semibold">  {sinhvien.ngayvaotruong}</span></a>

                                <a>Thời gian đào tạo:<span className="font-semibold"> {sinhvien.thoigiandaotao}</span> </a>
                            </div>
                        </div>
                        <Table setTinchi={setTinchi } masv={masv} />
                        <div className="flex justify-between mt-[30px] ">
                            <div className="flex flex-col gap-[5px]">
                                <a >Tên đề tài tốt nghiệp: <span className="font-semibold">{sinhvien.tendetai}</span></a>

                                <a >Điểm trung bình toàn khóa(hệ 4):<span className="font-semibold">{sinhvien.diem4}</span></a>

                                <a >Tổng số tín chỉ: <span className="font-semibold">{tinchi}</span></a>

                                <a >Xếp hạng tốt nghiệp: <span className="font-semibold">{sinhvien.xeploaitotnghiep}</span> </a>

                                <a>Số hiệu văn bằng: <span className="font-semibold">{sinhvien.sohieubang}</span> </a>

                                <a >Số vào sổ ngày cấp văn bằng: <span className="font-semibold">{sinhvien.sovaoso}</span> </a>
                            </div>

                            <div className="flex flex-col justify-center  items-center">
                                <a className="italic">Hải Phòng,ngày....tháng....năm....</a>
                                <a className="">TL. HIỆU TRƯỞNG</a>
                                <a>TRƯỞNG PHÒNG ĐÀO TẠO - QLKH</a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    
    )
}

