import { useState, useEffect } from "react"
import swal from 'sweetalert';

export default function Index({datasv}) {
   




    const [linkanh, setLinkanh] = useState(`${datasv[0].qrcode}`)
    const [anh, setAnh] = useState()
    const [image, setImage] = useState("")
    const [dataurl, setDataurl] = useState("")
        // setTendetai(datasv.tendetai)
    // useEffect(()=>{
    //     datasv && setTendetai(datasv[0].tendetai)
    // },[datasv])


    useEffect(() => {
        const handleClick = async () => {

            await fetch(`https://qlvbcc.hasura.app/api/rest/update_qrcode`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
                },
                body: JSON.stringify({
                    masinhvien: `${datasv[0].masinhvien}`,
                    qrcode: `${linkanh}`
                })

            })
                .then(response => response.json())

        }
        handleClick()
    }, [dataurl])

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

    async function submitImage() {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "hoainam")
        data.append("cloud_name", "dyfo2gtak")

        await fetch("https://api.cloudinary.com/v1_1/dyfo2gtak/image/upload", {
            method: "post",
            body: data
        })
            .then((res) => res.json())
            .then((data) => {
                setDataurl(data.url)
                setLinkanh(data.url)
                console.log(data);
                swal("Cập nhật ảnh thành công!", "Nhấn OK để tiếp tục!", "success").then(() => {
                    // window.location.href = "/edit";
                    // handleClick();
                    // swal("Lưu thành công!", "Nhấn OK để thoát!", "success").then(() => {

                    //     window.location.href = "/edit";
                    // });
                });
                
            }).catch((err) => {
                console.log(err);
            })

        setImage(data)
    }
    console.log(dataurl);
    return (
        <div className="flex flex-col w-[50%]  pt-[30px]">
            
            
            <div className="flex flex-col ">

                <input
                    type="file"
                    onChange={(e) => {

                        // handlePreviewImg
                        handelChange(e.target.files[0])
                    }}
                    className=""
                />
                {anh === undefined && datasv[0].qrcode && <img src={datasv[0].qrcode} className="w-[355px]" />}
                {anh && <img src={anh.preview} alt="" className="w-[355px]" />}
                <button
                    className="mt-[5px]  w-[180px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black hover:bg-red-600 hover:text-white"
                    onClick={() =>
                        swal("Bạn có chắc chắn muốn sửa ?", {
                            buttons: ["Hủy!", true],
                        }).then((value) => {
                            if (value === true) {

                               
                                
                                submitImage()
                                swal("Cập nhật ảnh thành công!", "Nhấn OK để tiếp tục!", "success").then(() => {
                                    // window.location.href = "/edit";
                                    // handleClick();
                                    // swal("Lưu thành công!", "Nhấn OK để thoát!", "success").then(() => {

                                    //     window.location.href = "/edit";
                                    // });
                                });
                            }
                        }) }
                >
                    Lưu sửa mã qr
                </button>

            </div>
        </div>
    )
}
