import "../../App.css";
import logo from "../../assets/logo2.png";
import styles from './index.module.css';
import QRCode from 'qrcode.react'

import { useEffect, useState } from "react"

export default function Index({ masv }) {
    const [minhchung, Setminhchung] = useState("")
    const [datasv, setDatasv] = useState([])
    useEffect(() => {
        console.log("gọi lại api")
        const callApi = async () => {

            await fetch(`https://qlvbcc.hasura.app/api/rest/get_minhchung/${masv}/vanbang`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
                },
                // body:JSON.stringify({masv:'1912101003'})

            })
                .then(response => response.json())
                .then(datasv => {
                    // const url = `${datasv.minhchung}`;
                    // const parts = url.split('/');
                    // const lastPart = parts[parts.length - 1];
                    // // setTendetai(datasv.f_get_ttsv5[0].tendetai)
                    // Setminhchung(lastPart)
                    Setminhchung(datasv.minhchung[0].linkdrive)
                })
                .catch(error => {
                    console.error(error); // Handle any errors
                    Setminhchung("")
                }); 
                
        }
        callApi();
    }, [masv]);
    console.log(minhchung)


    useEffect(() => {
        fetch(`https://qlvbcc.hasura.app/api/rest/get_timkiem_ttsv/${masv}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c'
            }
        })
            .then(response => response.json())
            .then(datasv => {
                setDatasv(datasv.f_get_ttsv5
                )
                
            })
            .catch(error => {
                console.error(error); // Handle any errors

            });
    }, [masv])


    console.log(datasv)

    return (
        <div>
            {datasv.length === 0 && <div className="flex text-red-700 text-[30px] w-[100%] items-center justify-center py-[50px]"><div className={styles.wrapper}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
            </div>  </div>}
            {datasv && datasv.map((sinhvien, index) => (
                <div key={index} >
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
                        <div className="flex flex-col justify-center items-center  ">
                            <a className="font-semibold ">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</a>
                            <a className="font-semibold underline">Độc lập - Tự do - Hạnh phúc</a>

                        </div>
                    </div>

                    {minhchung && <div className="flex flex-col mr-[8%]">
                        <QRCode value={`${minhchung}`} id="qrCodeCanvas" className="h-auto w-[100px] self-end" />
                    </div>}
                    <div></div>
                    <div className="flex flex-col justify-center items-center mt-[70px]">
                        <h2 className="font-bold text-[30px] ">VĂN BẰNG</h2>
                    </div>
                    <div className="flex  ml-[2%]  w-[100%] mt-[50px] ">
                        <div className="flex flex-col w-[50%] gap-[5px]">
                            <a>Họ và tên: <span className="font-semibold">{sinhvien.hoten}</span> </a>

                            <a>Giới tính:<span className="font-semibold"> {sinhvien.goitinh}</span></a>

                            <a>Mã sinh viên:<span className="font-semibold"> {sinhvien.masinhvien}</span> </a>

                            <a>Số CCCD:<span className="font-semibold"> {sinhvien.socmnd}</span> </a>

                            <a>Hình thức đào tạo:<span className="font-semibold"> {sinhvien.hedaotao}</span> </a>

                            <a>Trình độ đào tạo:</a>
                        </div>
                        <div className="flex flex-col w-[50%] gap-[5px]">
                            <a>Ngôn ngữ đào tạo:<span className="font-semibold"> Tiếng việt</span> </a>

                            <a>Ngày sinh:<span className="font-semibold"> {sinhvien.nganysinh.split(` `)[0].split('-').reverse().join('-')}</span> </a>

                            <a>{sinhvien.tenkhoahoc.slice(0, 4)}: <span className="font-semibold"> {sinhvien.tenkhoahoc.slice(4)}</span> </a>


                            <a>Ngành:<span className="font-semibold"> {sinhvien.tennganh}</span> </a>

                            <a>Ngày nhập học:<span className="font-semibold">  {sinhvien.ngayvaotruong}</span></a>

                            <a>Thời gian đào tạo:<span className="font-semibold"> {sinhvien.thoigiandaotao}</span> </a>
                        </div>
                    </div>
                    <table className="min-w-full border-collapse border border-gray-300 mt-[20px]">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 bg-gray-100 border-b text-center">Số hiệu văn bằng</th>
                                <th className="px-4 py-2 bg-gray-100 border-b text-center">Số vào sổ</th>
                                <th className="px-4 py-2 bg-gray-100 border-b text-center">Ngày cấp bằng</th>
                                <th className="px-4 py-2 bg-gray-100 border-b text-center">Người cấp bằng</th>
                                <th className="px-4 py-2 bg-gray-100 border-b text-center">Nơi cấp bằng</th>
                                <th className="px-4 py-2 bg-gray-100 border-b text-center">Xếp loại</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr >
                                <td className="px-4 py-2 border-b text-center">{sinhvien.sohieubang}</td>
                                <td className="px-4 py-2 border-b text-center">{sinhvien.sovaoso}</td>
                                {sinhvien.ngaycapbang ? <td className="px-4 py-2 border-b text-center">{sinhvien.ngaycapbang.substring(8, 10) + "-" + sinhvien.ngaycapbang.substring(5, 7) + "-" + sinhvien.ngaycapbang.substring(0, 4)}</td> : <td></td>}
                                <td className="px-4 py-2 border-b text-center">{sinhvien.nguoicapbang}</td>
                                <td className="px-4 py-2 border-b text-center">{sinhvien.noicap}</td>
                                <td className="px-4 py-2 border-b text-center">{sinhvien.xeploaitotnghiep}</td>
                            </tr>

                        </tbody>
                    </table>

                </div>
            ))}

        </div>
    )
}





