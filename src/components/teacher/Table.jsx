import "../../App.css";
import { useEffect, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useAuth } from "@clerk/clerk-react";
const columnHelper = createColumnHelper()
const columns = [
    columnHelper.accessor('stt', {
        header: "STT"
    }),
    columnHelper.accessor('tenmonhoc', {
        header: 'Tên môn học',
    }),
    columnHelper.accessor('khoiluong', {
        header: 'Số TC',
    }),
    columnHelper.accessor('diemthang4', {
        header: 'Điểm hệ số 4',
    }),
    columnHelper.accessor('diemthang10', {
        header: 'Điểm hệ số 10',
    }),
    columnHelper.accessor('diemchu', {
        header: 'Điểm chữ',
    }),

]
export default function Index({masinhvien,setTinchi,setTbtk}) {
    
    const [data, setData] = useState([])
    const { getToken } = useAuth();
    useEffect(() => {
        console.log(`gọi lại api table msv${masinhvien}`)
        const callApi = async () => {

            await fetch(`${import.meta.env.VITE_EDU_ALL_SCORE}${masinhvien}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getToken({
                        template: import.meta.env.VITE_TEMPLATE_EDU_QLVBCC
                    })}`,
                },
                // body:JSON.stringify({masv:'1912101003'})

            })
                .then(response => response.json())
                .then(res => setData(res.diem_toan_khoa.map((item, index) => {
                    item.stt = index + 1
                    return item
                })));
        }
        callApi();
    }, [masinhvien]);
    
    useEffect(() => {
        if(data.length > 0){
            setTinchi(data.reduce((total, current) => total + current.khoiluong, 0))
            const a=data.reduce((total, current) => total + current.diemthang4, 0)/data.length
            const b = a.toFixed(2)
            setTbtk(b)

        }
    },[data])

   
    

    // const [data, setData] = useState([])
    // useEffect(() => {
    //     setData(defaultData)
    // },[])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <div className="flex mt-[20px] text-left">
            {data.length > 0 ? <table className="w-[630px]">
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
                        if (row.id <= 24) {
                            return (
                                <tr className="border-solid border-[1px] border-x-black border-y-black" key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td className="pl-[10px] text-center" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        } else {
                            return null; // Bỏ qua các dòng với row.id > 25
                        }
                    })}
                </tbody>
            </table> : <></>}

            {data.length > 0 ? <table className="w-[630px] ml-[20px]">
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
                        if (row.id > 24) {
                            return (
                                <tr className="border-solid border-[1px] border-x-black border-y-black" key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td className="pl-[10px] text-center" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        } else {
                            return null; // Bỏ qua các dòng với row.id > 25
                        }
                    })}
                </tbody>
            </table> : <></>}

        </div>
    //     <div className="flex">
    //     {data.length > 0 ? <table className="w-[600px]">
    //         <thead>
    //             {table.getHeaderGroups().map(headerGroup => (
    //                 <tr className="border-solid border-[1px] border-x-black border-y-black" key={headerGroup.id}>
    //                     {headerGroup.headers.map(header => (
    //                         <th className="p-[5px]" key={header.id}>
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
    //                         <td className="pl-[20px]" key={cell.id}>
    //                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //                         </td>
    //                     ))}
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </table> : <></>}
        
    //     {data.length > 0 ? <table className="w-[600px] ml-[20px]">
    //         <thead>
    //             {table.getHeaderGroups().map(headerGroup => (
    //                 <tr className="border-solid border-[1px] border-x-black border-y-black" key={headerGroup.id}>
    //                     {headerGroup.headers.map(header => (
    //                         <th className="p-[5px]" key={header.id}>
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
    //                         <td className="pl-[20px]" key={cell.id}>
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
