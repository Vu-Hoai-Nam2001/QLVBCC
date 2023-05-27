import "../../App.css";
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/clerk-react";
import swal from 'sweetalert';

export default function Index(props) {
    //update tên đề tài 
    const [datasv, setDatasv] = useState([])
    const { getToken } = useAuth();
    const [tendetai, setTendetai] = useState('')
    //update ảnh
    const [anh, setAnh] = useState()
    const [image, setImage] = useState("")
    const [dataurl, setDataurl] = useState({})
    const [dataanh, setataanh] = useState("")

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
                    setTendetai(datasv.f_get_ttsv5[0].tendetai)
                    setataanh(datasv.f_get_ttsv5[0].qrcode)
                    setDatasv(datasv.f_get_ttsv5)

                });
        }
        callApi();
    }, [props.data]);
    console.log(datasv)
    // setTendetai(datasv.tendetai)
    // useEffect(()=>{
    //     datasv && setTendetai(datasv[0].tendetai)
    // },[datasv])



    const handleClick = async () => {

        await fetch(`https://qlvbcc.hasura.app/api/rest/update_tendetai`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
            },
            body: JSON.stringify({
                masinhvien: `${props.data}`,
                tendetai: `${tendetai}`,
                qrcode: `${dataurl.url}`
            })

        })
            .then(response => response.json())

    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    //updete ảnh 
   


    useEffect(() => {
        return () => {
            anh && URL.revokeObjectURL(anh.preview)
        }
    })
    function handelChange(e) {
        console.log(e);
        const file = e;
        file.preview = URL.createObjectURL(file)
        setAnh(file)
        setImage(e)
    }



    // const handlePreviewImg = (e) =>{
    //   const file = e.target.files[0]
    //   file.preview = URL.createObjectURL(file)
    //   setAnh(file)
    // }

    async  function submitImage() {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "hoainam")
        data.append("cloud_name", "dyfo2gtak")

        await  fetch("https://api.cloudinary.com/v1_1/dyfo2gtak/image/upload", {
            method: "post",
            body: data
        })
            .then((res) => res.json())
            .then((data) => {
                setDataurl(data)
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })

        setImage(data)
    }
    console.log(dataurl.url)
    return (
        <div>
            {datasv && datasv.map((sinhvien, index) => (
                <div key={index}>
                    <div className="flex    w-[100%] mt-[50px] ">
                        <div className="flex flex-col w-[50%] gap-[5px]">
                            <a>Họ và tên: {sinhvien.hoten}</a>
                            <a>Ngày sinh: {sinhvien.nganysinh.split(` `)[0].split('-').reverse().join('-')}</a>
                            <a>Giới tính: {sinhvien.goitinh}</a>
                            <a>Mã sinh viên: {sinhvien.masinhvien}</a>
                            <a>Số CCCD: {sinhvien.socmnd}</a>
                            <a>Khóa: {sinhvien.tenkhoahoc}</a>
                        </div>
                    </div>
                    <div className="flex flex-col w-[30%] justify-center items-center">

                        <input
                            type="file"
                            onChange={(e) => {

                                // handlePreviewImg
                                handelChange(e.target.files[0])
                            }}
                            className=""
                        />
                        {anh===undefined&& dataanh && <img src={dataanh}/>}
                        {anh && <img src={anh.preview} alt="" className="w-[355px]" />}
                        <button
                            className="bg-[#777777]"
                            onClick={() => submitImage()}
                        >
                            Upload
                        </button>

                    </div>
                    <div className="flex  ">
                        <div className="flex flex-col gap-[5px]">
                            <a >Tên đề tài tốt nghiệp:</a>
                            <textarea className=" w-[400px] pl-[10px]  rounded-[8px] border border-black mt-[5px]"
                                rows="5"
                                placeholder='Nhập tên đề tài'
                                value={tendetai}
                                onChange={e => {
                                    setTendetai(e.target.value)

                                }}

                            >
                            </textarea>

                        </div>

                    </div>
                    <button
                        onClick={ () => {
                            swal("Bạn có chắc chắn muốn sửa ?", {
                                buttons: ["Hủy!", true],
                            }).then((value) => {
                                if (value === true) {
                                    
                                    submitImage();

                                      handleClick();
                                    swal("Cập nhật thành công!", "Nhấn OK để thoát!", "success").then(() => {
                                        window.location.href = "/teacher";
                                    });
                                }
                            });
                        }}
                        className="mt-[5px]  w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black hover:bg-red-600 hover:text-white">
                        Lưu Sửa
                    </button>
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
