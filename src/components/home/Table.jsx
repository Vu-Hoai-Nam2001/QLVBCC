import "../../App.css";
import { useEffect, useState } from "react";
// import {
//     createColumnHelper,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
// } from '@tanstack/react-table'
// import { useAuth } from "@clerk/clerk-react";
// const defaultData = [
//     {
//         firstName: 'tanner',
//         lastName: 'linsley',
//         age: 24,
//         visits: 100,
//         status: 'In Relationship',
//         progress: 50,
//     },
//     {
//         firstName: 'tandy',
//         lastName: 'miller',
//         age: 40,
//         visits: 40,
//         status: 'Single',
//         progress: 80,
//     },
//     {
//         firstName: 'joe',
//         lastName: 'dirte',
//         age: 45,
//         visits: 20,
//         status: 'Complicated',
//         progress: 10,
//     },
// ]
// const columnHelper = createColumnHelper()
// const columns = [
//     columnHelper.accessor('stt', {

//         header: "STT"
//     }),
//     columnHelper.accessor('tenmonhoc', {
//         header: () => <h3>Tên môn học</h3>,


//     }),
//     columnHelper.accessor('khoiluong', {
//         header: 'Số TC',


//     }),
//     columnHelper.accessor('diemthang4', {
//         header: 'Điểm hệ số 4',


//     }),
//     columnHelper.accessor('diemthang10', {
//         header: 'Điểm hệ số 10',


//     }),
//     columnHelper.accessor('diemchu', {
//         header: 'Điểm chữ',


//     }),

// ]
export default function Index({masinhvien,setTinchi}) {
    
    const [data, setData] = useState([])
    // const { getToken } = useAuth();
    const [datacc, setDatacc] = useState([])
    useEffect(() => {
        console.log(`gọi lại api table msv${masinhvien}`)
        const callApi = async () => {

            await fetch(`${import.meta.env.VITE_EDU_ALL_SCORE}${masinhvien}`
            // , {
            //     method: 'GET',
            //     // headers: {
            //     //     'Content-Type': 'application/json',
            //     //     'Authorization': `Bearer ${await getToken({
            //     //         template: import.meta.env.VITE_TEMPLATE_EDU_QLVBCC
            //     //     })}`,
            //     // },
            //     // body:JSON.stringify({masv:'1912101003'})

            // }
            )
                .then(response => response.json())
                .then(res => setData(res.diem_toan_khoa.map((item, index) => {
                    item.stt = index + 1
                    return item
                })));
        }
        callApi();
    }, [masinhvien]);
    useEffect(() => {
        console.log(`gọi lại api cc msv${masinhvien}`)
        const callApi = async () => {

            await fetch(`https://qlvbcc.hasura.app/api/rest/get_chungchi/${masinhvien}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
                },
                // body:JSON.stringify({masv:'1912101003'})

            })
                .then(response => response.json())
                .then(res => setDatacc(res.f_get_chungchi));
        }
        callApi();
    }, [masinhvien]);
    useEffect(() => {
        if(data.length > 0){
            setTinchi(data.reduce((total, current) => total + current.khoiluong, 0))

        }
    },[data])
    console.log(data)

    // const [data, setData] = useState([])
    // useEffect(() => {
    //     setData(defaultData)
    // },[])
    // const table = useReactTable({
    //     data,
    //     columns,
    //     getCoreRowModel: getCoreRowModel(),
    // })
    return (
        <div className="ml-[2%] mt-[15px]">
            {/* {data.length > 0 ? <table className="w-[1000px]">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr className="border-solid border-[1px] border-x-black border-y-black" key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className="pl-[10px] text-center" key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        
                            return (
                                <tr className="border-solid border-[1px] border-x-black border-y-black" key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td className="pl-[10px] text-center" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        
                    })}
                </tbody>
            </table> : <></>} */}
            <div  >
                {data.length > 0 ? <table className="min-w-full border-collapse border border-gray-300 ">
                    <thead>
                        <tr >
                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left">STT</th>
                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Mã môn học</th>
                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Tên môn học</th>
                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Số TC</th>
                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Điểm hệ số 10</th>
                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center">Điểm hệ số 4</th>
                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left"> Điểm chữ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b border-gray-300 text-left">{item.stt}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-left">{item.mamonhoc}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-left">{item.tenmonhoc}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center">{item.khoiluong}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center">{item.diemthang10}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center">{item.diemthang4}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center">{item.diemchu}</td>
                            </tr>
                        ))}
                        {datacc && datacc.map((item,index)=>(
                            <tr key={index}>
                                <td className="py-2 px-4 border-b border-gray-300 text-left">{data.length+ index +1}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-left">{item.machungchi}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-left">{item.ten}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center"></td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center"></td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center"></td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center">Đạt</td>
                            </tr>
                        ))}
                    </tbody>
                </table> : <></>}
            </div>

        </div>
        // <div>
        //     {data.length > 0 ? <table>
        //         <thead>
        //             {table.getHeaderGroups().map(headerGroup => (
        //                 <tr className="border-solid border-[1px] border-x-black border-y-black" key={headerGroup.id}>
        //                     {headerGroup.headers.map(header => (
        //                         <th className="p-[10px]" key={header.id}>
        //                             {header.isPlaceholder
        //                                 ? null
        //                                 : flexRender(
        //                                     header.column.columnDef.header,
        //                                     header.getContext()
        //                                 )}
        //                         </th>
        //                     ))}
        //                 </tr>
        //             ))}
        //         </thead>
        //         <tbody>
        //             {table.getRowModel().rows.map(row => (
        //                 <tr className="border-solid border-[1px] border-x-black border-y-black" key={row.id}>
        //                     {row.getVisibleCells().map(cell => (
        //                         <td className="pl-[15px]" key={cell.id}>
        //                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
        //                         </td>
        //                     ))}
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table> : <></>}

        // </div>
    )
}
