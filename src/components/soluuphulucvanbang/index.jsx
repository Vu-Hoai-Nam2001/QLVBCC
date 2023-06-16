// import { useClerk } from "@clerk/clerk-react";
// import { TbFileImport } from "react-icons/tb"
// import { FcStatistics } from "react-icons/fc"
// import { useState } from "react"
// import swal from 'sweetalert';
// export default function index() {
//     const { user } = useClerk();
//     const [datathongke, setDatathongke] = useState([])
//     const [showssoluu, setShowsoluu] = useState(false)
//     const [showsthongke, setShowthongke] = useState(false)
//     const [showsthongkeloc, setShowthongkeloc] = useState(false)
//     const [masv, setMasv] = useState('');
//     const [socmnd, setSocmnd] = useState('');
//     const [hoten, setHoten] = useState('');
//     const [tenchungchi, setTenchungchi] = useState('');
//     const [masovanbang, setMasovanbang] = useState('');
//     const [soquyetdinh, setSoquyetdinh] = useState('');
//     const [solancap, setSolancap] = useState('');
//     ////ngày tháng năm
//     const [date, setDate] = useState('');
//     const [datebatdau, setDatebatdau] = useState('');
//     const [dateketthuc, setDateketthuc] = useState('');
//     const handleDateChange = (event) => {
//         setDate(event.target.value);
//     };

//     const handleDateChangebatdau = (event) => {
//         setDatebatdau(event.target.value);
//     };
//     const handleDateChangeketthuc = (event) => {
//         setDateketthuc(event.target.value);
//     };
//     console.log(date)
//     ///////// chọn văn bằng/ chứng chỉ 
//     const [selectedItem, setSelectedItem] = useState('');

//     const handleSelectItem = (event) => {
//         setSelectedItem(event.target.value);
//     };
//     console.log(selectedItem)

//     ///////// chọn thống kê theo văn bằng/ chứng chỉ 
//     const [selectedItem2, setSelectedItem2] = useState('');

//     const handleSelectItem2 = (event) => {
//         setSelectedItem2(event.target.value);
//         setShowthongkeloc(false)
//     };
//     console.log(selectedItem)


//     const callApi = async () => {

//         await fetch(`https://qlvbcc.hasura.app/api/rest/lusophulucvanbang`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
//             },
//             body: JSON.stringify({
//                 hoten: `${hoten}`,
//                 loaihocvan: `${selectedItem}`,
//                 masinhvien: `${masv}`,
//                 masovanbang: `${masovanbang}`,
//                 ngaycap: `${date}`,
//                 socmnd: `${socmnd}`,
//                 solancap: `${solancap}`,
//                 soquyetdinh: `${soquyetdinh}`,
//                 tenchungchi: `${tenchungchi}`,
//                 magiaovien: `${user.publicMetadata.magv}`,
//                 hotennguoisua: `${user.publicMetadata.name}`
//             })

//         })
//     }
//     const callApithongke = async () => {

//         await fetch(`https://qlvbcc.hasura.app/api/rest/get_soluuvanbang/${datebatdau}/${dateketthuc}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
//             },
//             // body: JSON.stringify({
//             //     hoten: `${hoten}`,
//             //     loaihocvan: `${selectedItem}`,
//             //     masinhvien: `${masv}`,
//             //     masovanbang: `${masovanbang}`,
//             //     ngaycap: `${date}`,
//             //     socmnd: `${socmnd}`,
//             //     solancap: `${solancap}`,
//             //     soquyetdinh: `${soquyetdinh}`,
//             //     tenchungchi: `${tenchungchi}`

//             // })

//         }).then(response => response.json())
//             .then(datathongke => {
//                 // setTendetai(datasv.f_get_ttsv5[0].tendetai)
//                 setDatathongke(datathongke.f_soluucapvanban)
//             });
//     }
//     console.log(datathongke)
//     return (
//         <div className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto mb-[15px] min-h-[420px]">
//             <div className='flex justify-end '>
//                 <button className='mt-[8px] ml-[3px] w-[50px] bg-[#0083c2] rounded-[15px] h-[32px] text-white 
//                     border border-black hover:bg-red-600 hover:text-white text-[24px] flex justify-center items-center'
//                     onClick={() => {
//                         setShowsoluu(true)
//                         setShowthongke(false)
//                     }}
//                 ><TbFileImport />
//                 </button>
//                 <button className='mt-[8px] ml-[3px] w-[50px] bg-[#0083c2] rounded-[15px] h-[32px] text-white 
//                     border border-black hover:bg-red-600 hover:text-white text-[24px] flex justify-center items-center'
//                     onClick={() => {
//                         setShowsoluu(false)
//                         setShowthongke(true)
//                     }}
//                 ><FcStatistics />
//                 </button>
//             </div>

//             {showssoluu && <div className="flex flex-col">
//                 <div className="flex justify-center text-[30px] font-semibold text-[#0083c2]">SỔ LƯU PHỤ LỤC VĂN BẰNG CHỨNG CHỈ</div>
//                 <div className="flex ml-[10%]">
//                     <div className="w-[35%] ">
//                         <a className="font-semibold text-[#0083c2] mt-[20]">Nhập mã sinh viên:</a>
//                         <input value={masv} onChange={e => setMasv(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px] " placeholder="Nhập mã sinh viên" />
//                         <a className="font-semibold text-[#0083c2] mt-[20]">Nhập họ tên sinh viên:</a>
//                         <input value={hoten} onChange={e => setHoten(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Nhập họ tên sinh viên" />
//                         <a className="font-semibold text-[#0083c2] mt-[20]">Nhập số CMDD:</a>
//                         <input value={socmnd} onChange={e => setSocmnd(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" placeholder="Nhập số chứng minh nhân dân" />
//                         <a className="font-semibold text-[#0083c2] mt-[20]">Nhập ngày/tháng/năm cấp:</a>
//                         <br />
//                         <input type="date" value={date} onChange={handleDateChange} className="w-[50%] pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" />

//                     </div>
//                     <div className="w-[35%] ml-[20%] flex flex-col">
//                         <a className="font-semibold text-[#0083c2] mt-[20]">Loại học vấn:</a>
//                         <select id="dropdown" value={selectedItem} onChange={handleSelectItem} className="appearance-none border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
//                             <option value="">-- Chọn loại học vấn --</option>
//                             <option value="vanbang">Văn bằng</option>
//                             <option value="chungchi">Chứng chỉ</option>
//                             <option value="phulucvanbang">Phụ lục văn bằng</option>
//                         </select>
//                         {selectedItem === 'chungchi' && <>
//                             <a className="font-semibold text-[#0083c2] mt-[30]">Nhập tên chứng chỉ:</a>
//                             <input value={tenchungchi} onChange={e => setTenchungchi(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px] " placeholder="Nhập tên chứng chỉ" />
//                         </>}
//                         {selectedItem === 'vanbang' && <>
//                             <a className="font-semibold text-[#0083c2] mt-[30]">Nhập mã số văn bằng:</a>
//                             <input value={masovanbang} onChange={e => setMasovanbang(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px] " placeholder="Nhập mã số văn bằng" />
//                         </>}
//                         <a className="font-semibold text-[#0083c2] mt-[30]">Nhập số quyết định:</a>
//                         <input value={soquyetdinh} onChange={e => setSoquyetdinh(e.target.value)} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px] " placeholder="Nhập số quyết định" />
//                         <a className="font-semibold text-[#0083c2] mt-[30]">Nhập số lần cấp:</a>
//                         <input value={solancap} type="number" min={0} max={100} onChange={e => {e.target.value<0 ? setSolancap(0):setSolancap(e.target.value) }} className="w-full pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px] " placeholder="Lần cấp thứ:" />

//                     </div>
//                 </div>
//                 <div className="flex justify-center items-center">
//                     <button className='mt-[8px] ml-[3px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] text-white 
//                     border border-black hover:bg-red-600 hover:text-white text-[18px] flex justify-center items-center'
//                         onClick={() => {
//                             callApi()
//                             swal("Cập nhật ảnh thành công!", "Nhấn OK để tiếp tục!", "success")
//                             setMasv("")
//                             setSocmnd("")
//                             setHoten("")
//                             setTenchungchi("")
//                             setMasovanbang("")
//                             setSoquyetdinh("")
//                             setSolancap("")
//                             setDate("")
//                             setSelectedItem("")

//                         }}
//                     >Lưu
//                     </button>
//                 </div>
//             </div>}
//             {showsthongke && <div className="flex flex-col">
//                 <div className="flex flex-col ml-[10%]">
//                     <div>Từ ngày <input type="date" value={datebatdau} onChange={handleDateChangebatdau} className="w-[20%] pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" /> đến ngày <input type="date" value={dateketthuc} onChange={handleDateChangeketthuc} className="w-[20%] pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" /> </div>
//                     <div className="mt-[10px] mb-[10px] flex">
//                         <a className="font-semibold text-[#0083c2] mt-[20] ">Thống kê theo </a>
//                         <select id="dropdown" value={selectedItem2} onChange={handleSelectItem2} className="ml-[5px] w-[20%] appearance-none border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
//                             <option value="">-- Chọn loại học vấn --</option>
//                             <option value="vanbang">Văn bằng</option>
//                             <option value="chungchi">Chứng chỉ</option>
//                             <option value="phulucvanbang">Phụ lục văn bằng</option>
//                         </select>
//                         <button className="mt-[8px] ml-[10px] w-[100px] bg-[#0083c2] rounded-[15px] h-[32px] text-white 
//                     border border-black hover:bg-red-600 hover:text-white text-[16px] flex justify-center items-center" onClick={() => { callApithongke() 
//                     setShowthongkeloc(true) }}>Thống kê</button>
//                     </div>

//                 </div>
//                 {showsthongkeloc && selectedItem2==='chungchi' && <div>
//                     <div className="flex justify-center text-[30px] font-semibold text-[#0083c2]">BẢNG THỐNG KÊ SỔ LƯU  CHỨNG CHỈ</div>
//                     <table className="min-w-full border-collapse border border-gray-300 ">
//                         <thead>
//                             <tr className="text-[15px]">
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left">STT</th>
//                                 <th className="py-2 px-6 border-b border-gray-300 bg-gray-100 text-center">Họ tên</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Mã sinh viên</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Số CMND</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Số quyết định</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Tên chứng chỉ</th>
//                                 <th className="py-2 px-6 border-b border-gray-300 bg-gray-100 text-center">Họ tên người lưu sổ</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center"> Mã giáo viên</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center"> Ngày cấp</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center"> Cấp</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {datathongke && datathongke.map((item, index) => (
//                                 <tr key={index} className="text-[15px]">
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{index + 1}</td>
//                                     <td className="py-2 px-6 border-b border-gray-300 text-center">{item.hoten}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.masinhvien}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.socmnd}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.soquyetdinh}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.tenchungchi}</td>
//                                     <td className="py-2 px-6 border-b border-gray-300 text-center">{item.hotennguoisua}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.magiaovien}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.ngaycap.substring(8, 10) + "-" + item.ngaycap.substring(5, 7) + "-" + item.ngaycap.substring(0, 4)}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">lần {item.solancap}</td>
//                                 </tr>
//                             ))}

//                         </tbody>
//                     </table>
//                 </div>}


//                 {showsthongkeloc && selectedItem2==='vanbang' && <div>

//                 <div className="flex justify-center text-[30px] font-semibold text-[#0083c2]">BẢNG THỐNG KÊ SỔ LƯU VĂN BẰNG </div>
//                     <table className="min-w-full border-collapse border border-gray-300 ">
//                         <thead>
//                             <tr className="text-[15px]">
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left">STT</th>
//                                 <th className="py-2 px-6 border-b border-gray-300 bg-gray-100 text-center">Họ tên</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Mã sinh viên</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Số CMND</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Số quyết định</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Mã số văn bằng</th>
//                                 <th className="py-2 px-6 border-b border-gray-300 bg-gray-100 text-center">Họ tên người lưu sổ</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center"> Mã giáo viên</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center"> Ngày cấp</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {datathongke && datathongke.map((item, index) => (
//                                 <tr key={index} className="text-[15px]">
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{index + 1}</td>
//                                     <td className="py-2 px-6 border-b border-gray-300 text-center">{item.hoten}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.masinhvien}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.socmnd}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.soquyetdinh}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.masovanbang}</td>
//                                     <td className="py-2 px-6 border-b border-gray-300 text-center">{item.hotennguoisua}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.magiaovien}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.ngaycap.substring(8, 10) + "-" + item.ngaycap.substring(5, 7) + "-" + item.ngaycap.substring(0, 4)}</td>
//                                 </tr>
//                             ))}

//                         </tbody>
//                     </table>

//                 </div>}

//                 {showsthongkeloc && selectedItem2==='phulucvanbang' && <div>

//                 <div className="flex justify-center text-[30px] font-semibold text-[#0083c2]">BẢNG THỐNG KÊ SỔ LƯU PHỤ LỤC VĂN BẰNG CHỨNG CHỈ</div>
//                     <table className="min-w-full border-collapse border border-gray-300 ">
//                         <thead>
//                             <tr className="text-[15px]">
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left">STT</th>
//                                 <th className="py-2 px-6 border-b border-gray-300 bg-gray-100 text-center">Họ tên</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Mã sinh viên</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Số CMND</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Số quyết định</th>

//                                 <th className="py-2 px-6 border-b border-gray-300 bg-gray-100 text-center">Họ tên người lưu sổ</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center"> Mã giáo viên</th>
//                                 <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center"> Ngày cấp</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {datathongke && datathongke.map((item, index) => (
//                                 <tr key={index} className="text-[15px]">
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{index + 1}</td>
//                                     <td className="py-2 px-6 border-b border-gray-300 text-center">{item.hoten}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.masinhvien}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.socmnd}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.soquyetdinh}</td>

//                                     <td className="py-2 px-6 border-b border-gray-300 text-center">{item.hotennguoisua}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.magiaovien}</td>
//                                     <td className="py-2 px-4 border-b border-gray-300 text-center">{item.ngaycap.substring(8, 10) + "-" + item.ngaycap.substring(5, 7) + "-" + item.ngaycap.substring(0, 4)}</td>
//                                 </tr>
//                             ))}

//                         </tbody>
//                     </table>

//                 </div>}


//             </div>}
//         </div>

//     )
// }



import { useState } from "react"
export default function index() {
    const [show, setShow] = useState(false);
    const [datebatdau, setDatebatdau] = useState('');
    const [dateketthuc, setDateketthuc] = useState('');
    const [datathongke, setDatathongke] = useState([])
    const handleDateChangebatdau = (event) => {
        setDatebatdau(event.target.value);
    };
    const handleDateChangeketthuc = (event) => {
        setDateketthuc(event.target.value);
    };
    const callApithongke = async () => {

        await fetch(`https://qlvbcc.hasura.app/api/rest/get_soluuvanbang/${datebatdau}/${dateketthuc}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
            },


        }).then(response => response.json())
            .then(datathongke => {
                // setTendetai(datasv.f_get_ttsv5[0].tendetai)
                setDatathongke(datathongke.f_soluucapvanban)
            });
    }
    console.log(datathongke)
    return (
        <div className="w-[1400px] ml-[4%]">
            <div className="flex flex-col ">
                <div>Từ ngày <input type="date" value={datebatdau} onChange={handleDateChangebatdau} className="w-[20%] pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" /> đến ngày <input type="date" value={dateketthuc} onChange={handleDateChangeketthuc} className="w-[20%] pl-[10px] h-[35px] rounded-[8px] border border-black mt-[5px]" /> </div>
                <div className="mt-[10px] mb-[10px] flex">

                    <button className="mt-[8px] ml-[10px] w-[100px] bg-[#0083c2] rounded-[15px] h-[32px] text-white 
                    border border-black hover:bg-red-600 hover:text-white text-[16px] flex justify-center items-center" onClick={() => {
                            callApithongke() 
                            setShow(true)
                        }}>Tra cứu</button>
                </div>

                {show && datathongke && datathongke.length>0 && <div>

                    <div className="flex justify-center text-[30px] font-semibold text-[#0083c2]">BẢNG TRA CỨU VĂN BẰNG</div>
                    <table className="min-w-full border-collapse border border-gray-300 ">
                        <thead>
                            <tr className="text-[15px]">
                                <th className="py-2 px-1 border-b border-gray-300 bg-gray-100 text-left">STT</th>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Họ tên</th>
                                <th className="py-2 px-3 border-b border-gray-300 bg-gray-100 text-center">Mã sinh viên</th>
                                <th className="py-2 px-3 border-b border-gray-300 bg-gray-100 text-center">Số CMND</th>
                                <th className="py-2 px-3 border-b border-gray-300 bg-gray-100 text-center">Số quyết định</th>
                                <th className="py-2 px-3 border-b border-gray-300 bg-gray-100 text-center"> Số hiệu bằng</th>
                                <th className="py-2 px-3 border-b border-gray-300 bg-gray-100 text-center"> Số vào sổ</th>
                                <th className="py-2 px-3 border-b border-gray-300 bg-gray-100 text-center"> Ngày cấp bằng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datathongke && datathongke.map((item, index) => (
                                <tr key={index} className="text-[15px]">
                                    <td className="py-2 px-1 border-b border-gray-300 text-center">{index + 1}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">{item.hoten}</td>
                                    <td className="py-2 px-3 border-b border-gray-300 text-center">{item.masinhvien}</td>
                                    <td className="py-2 px-3 border-b border-gray-300 text-center">{item.socmnd}</td>
                                    <td className="py-2 px-3 border-b border-gray-300 text-center">{item.soquyetdinh}</td>

                                    <td className="py-2 px-3 border-b border-gray-300 text-center">{item.sohieubang}</td>   
                                    <td className="py-2 px-3 border-b border-gray-300 text-center">{item.sovaoso}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">{item.ngaycapbang.substring(8, 10) + "-" + item.ngaycapbang.substring(5, 7) + "-" + item.ngaycapbang.substring(0, 4)}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>}

            </div>

        </div>
    )
}


