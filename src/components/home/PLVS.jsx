import "../../App.css";
import logo from "../../assets/logo2.png";
import Table from "./Table"
export default function Index({data}) {
    return (
        <>
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
                    <a>Họ và tên: {data.name}</a>
                    
                    <a>Giới tính: {data.sex}</a>
                    
                    <a>Mã sinh viên: {data.MSV}</a>
                    
                    <a>Số CCCD: {data.SoCCCD}</a>
                    
                    <a>Hình thức đào tạo: {data.Hinhthucdaotao}</a>
                    
                    <a>Trình độ đào tạo: {data.TRinhDoDT}</a>
                </div>
                <div className="flex flex-col w-[50%] gap-[5px]">
                    <a>Ngôn ngữ đào tạo: {data.ngonngu}</a>
                    
                    <a>Ngày sinh: {data.ngaysinh}</a>
                    
                    <a>Khóa: {data.khoa}</a>
                    
                    <a>Chuyên ngành: {data.chuyennganh}</a>
                    
                    <a>Ngày nhập học: {data.ngaynhaphoc}</a>
                    
                    <a>Thời gian đào tạo: {data.thoigiandaotao}</a>
                </div>
            </div>
            <Table />
            <div className="flex justify-between mt-[30px] ">
                <div className="flex flex-col gap-[5px]">
                    <a >Tên đề tài tốt nghiệp: <span className="font-bold">{data.tendetaitotnghiep}</span></a>
                    
                    <a >Điểm trung bình toàn khóa(hệ 4):<span className="font-bold"> {data.DTBTK}</span></a>
                    
                    <a >Tổng số tín chỉ: <span className="font-bold">{data.TSTC}</span></a>
                    
                    <a >Xếp hạng tốt nghiệp: <span className="font-bold">{data.XHTN}</span> </a>
                    
                    <a>Số hiệu văn bằng: <span className="font-bold">{data.SHVB}</span> </a>
                    
                    <a >Số vào sổ ngày cấp văn bằng: <span className="font-bold">{data.SVSNCB}</span> </a>
                </div>

                <div className="flex flex-col justify-center  items-center">
                    <a className="">Hải Phòng,ngày....tháng....năm....</a>
                    <a className="">TL, HIỆU TRƯỞNG</a>
                    <a>TRƯỞNG PHÒNG ĐÀO TẠO - QLKH</a>
                </div>
            </div>
        </>
    )
}
