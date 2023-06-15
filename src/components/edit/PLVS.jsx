import "../../App.css";
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/clerk-react";
// import swal from 'sweetalert';
import ImdEdit from "./img.jsx"
import QRCode from 'qrcode.react';
import Print from "./../print"

export default function Index(props) {
    const [showprint, setShowprint] = useState(false);
    //update tên đề tài 
    const [datasv, setDatasv] = useState()
    const [show, setShow] = useState(false)
    // const [showupdate, setShowupdate] = useState(false)
    const [dataurlqrcode, setDataurlqrcode] = useState()
    const { getToken } = useAuth();
    // const [anh, setAnh] = useState()

    // const [tendetai, setTendetai] = useState('')
    //update ảnh

    const [dataanh, setataanh] = useState("")
    // const handleClick = async () => {

    //     await fetch(`https://qlvbcc.hasura.app/api/rest/update_tendetai`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
    //         },
    //         body: JSON.stringify({
    //             masinhvien: `${props.data}`,
    //             tendetai: `${tendetai}`,
    //         })

    //     })
    //         .then(response => response.json())

    // }




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
                    // setTendetai(datasv.f_get_ttsv5[0].tendetai)
                    setataanh(datasv.f_get_ttsv5[0].qrcode)
                    setDatasv(datasv.f_get_ttsv5)


                });
        }
        callApi();
    }, [props.data]);
    console.log(datasv)
    console.log(dataanh);


    const saveImage = () => {
        const canvas = document.getElementById('qrCodeCanvas');
        const dataURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'qrcode.png';
        link.click();
    };


    const newfileggdrive = async () => {

        await fetch(`/../../api/newfileggdrive`, {
            method: 'POST',
            body: JSON.stringify({ name: `${props.data}` })

        })
            .then(response => response.json())
            .then(dataurlqrcode => {
                setDataurlqrcode(dataurlqrcode.result)
            });
    }
    console.log(dataurlqrcode);
    // const updatefileggdrive = async () => {
    //     const formData = new FormData();
    //     formData.append('parents', '1VhNbZF6gKSgc79pitfXxoJJPnabMkl98');
    //     formData.append('file', anh);

    //     await fetch(`/../../api/updatefileggdrive`, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             parents: '1VhNbZF6gKSgc79pitfXxoJJPnabMkl98',
    //             file: `${anh}`
    //         })

    //     })
    //         .then(response => response.json())
    //         .then(dataurlqrcode => {
    //             setDataurlqrcode(dataurlqrcode.result)
    //         });
    // }
    // console.log(dataurlqrcode);
    // function handelChange(e) {
    //     console.log(e);
    //     const file = e;
    //     file.preview = URL.createObjectURL(file)
    //     setAnh(file)
    // }

    // console.log(anh);


    return (
        <div >

            {datasv && datasv.map((sinhvien, index) => (
                <div key={index} className=" mt-[10px] justify-center" >
                    <div className="flex justify-end ">

                        <button className="  mt-[8px] ml-[145px] w-[200px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
                        border border-black hover:bg-red-600 hover:text-white"
                            onClick={() => {
                                if (props.data !== '') {
                                    setShowprint(true)
                                }
                                else setShowprint(false)
                            }} >In phụ lục văn bằng</button>
                        {/* <button className=" ml-[198px] mb-[10px] mt-[8px]  w-[250px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
                        border border-black hover:bg-red-600 hover:text-white"
                            onClick={() => { setShowupdate(!showupdate) }}  >Cập nhật minh chứng</button> */}
                    </div>
                    <div className="flex justify-center text-[30px] font-semibold text-[#0083c2]">BỔ SUNG THÔNG TIN PHỤ LỤC VĂN BẰNG</div>
                    <div className="flex    w-[100%] mt-[50px] ">
                        <div className="flex  w-[100%] gap-[5px]">
                            <div className="ml-[70px] flex flex-col w-[30%]">
                                <a>Họ và tên: <span className="font-semibold"> {sinhvien.hoten}</span></a>
                                <a>Mã sinh viên:<span className="font-semibold"> {sinhvien.masinhvien}</span> </a>

                            </div>

                            <div className="flex flex-col w-[30%]">
                                <a>Số CCCD: <span className="font-semibold"> {sinhvien.socmnd}</span></a>
                                <a>Ngày sinh: <span className="font-semibold"> {sinhvien.nganysinh.split(` `)[0].split('-').reverse().join('-')}</span> </a>
                            </div>
                            <div className="flex flex-col w-[30%]">
                                <div className="flex">
                                    <a>Giới tính: <span className="font-semibold"> {sinhvien.goitinh}</span> </a>
                                    <a className="ml-[10px]">{sinhvien.tenkhoahoc.slice(0, 4)}: <span className="font-semibold"> {sinhvien.tenkhoahoc.slice(4)}</span> </a>
                                </div>
                                <a>Ngành: <span className="font-semibold"> {sinhvien.tennganh} </span></a>



                            </div>
                        </div>
                    </div>

                    {/* <div className="flex  ">
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

                    </div> */}
                    {/* <button
                        onClick={() => {
                            swal("Bạn có chắc chắn muốn sửa ?", {
                                buttons: ["Hủy!", true],
                            }).then((value) => {
                                if (value === true) {

                                   
                                    
                                    handleClick()
                                    swal("Cập nhật Tên đề tài thành công!", "Nhấn OK để tiếp tục!", "success").then(() => {
                                        // window.location.href = "/edit";
                                        // handleClick();
                                        // swal("Lưu thành công!", "Nhấn OK để thoát!", "success").then(() => {

                                        //     window.location.href = "/edit";
                                        // });
                                    });
                                }
                            });
                        }}
                        className="mt-[5px]  w-[200px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black hover:bg-red-600 hover:text-white">
                        Lưu Sửa Tên Đề Tài
                    </button> */}


                    <div className="flex w-[100%]  ">
                        <div className="App ml-[70px] w-[31%] ">



                            <div className="qrcode-container mt-[10px]">
                                <QRCode value={`https://qlvbcc-vu-hoai-nam2001.vercel.app/search/${props.data}`} id="qrCodeCanvas" />
                                <button onClick={() => {
                                    saveImage()
                                    setShow(true)

                                }} className=" mt-[8px] ml-[3px] w-[150px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
                                    border border-black hover:bg-red-600 hover:text-white">Tải xuống ảnh</button>

                            </div>

                            {show && datasv && <ImdEdit datasv={datasv} />}
                        </div>

                        <div className="w-[25%]">
                            <button className=" mt-[8px] w-[150px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
                                    border border-black hover:bg-red-600 hover:text-white"
                                    onClick={()=>{
                                        newfileggdrive()
                                    }}>Tạo thư mục mới</button>

                        </div>

                        <div>
                        <button className=" mt-[8px] ml-[32%] w-[200px] bg-[#0083c2] rounded-[15px] h-[32px] text-white
                                    border border-black hover:bg-red-600 hover:text-white">Bổ sung minh chứng</button>
                        </div>

                    </div>
                    {
                        showprint && < Print data={sinhvien.masinhvien} />
                    }
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
