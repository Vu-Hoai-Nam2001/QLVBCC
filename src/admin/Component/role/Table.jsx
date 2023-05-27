import "../../../App.css";
import { useState, useEffect } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import swal from 'sweetalert';
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
const columnHelper = createColumnHelper()
const columns = [

    columnHelper.accessor('user_code', {
        header: 'Mã giáo viên',
    }),
    columnHelper.accessor('hodem', {
        header: 'Họ đệm',


    }),
    columnHelper.accessor('ten', {
        header: 'Tên',


    }),
    columnHelper.accessor('email', {
        header: 'Email',


    }),
    columnHelper.accessor('role_id', {
        header: 'Quyền',
    }),
    // columnHelper.accessor('id', {
    //     header: '', // Đặt header trống để không hiển thị tiêu đề
    //     cell: () => (
    //         <button  className="ml-[20px] mr-[10px] bg-[#0083c2] border border-gray-800 text-white  px-4 rounded-md hover:bg-blue-600 hover:border-blue-700 focus:outline-none focus:border-blue-700">Sửa</button>
    //     ),
    // }),


]
const quyen = [
    {
        id: 2,
        name: "Quyền được sửa, in"
    },
    {
        id: 3,
        name: "Quyền xem, tìm kiếm"
    }
]
export default function Index({ datauser, role}) {

    const [data, setData] = useState([])
    const [checked, setChecked] = useState()

    useEffect(() => {

        setData(datauser)
    }, [datauser]);
    console.log(data)
    console.log(`đây là quyền ${role}`)

    // const [data, setData] = useState([])
    // useEffect(() => {
    //     setData(defaultData)
    // },[])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleClick= async () => {

        await fetch(`https://qlvbcc.hasura.app/api/rest/update_role_user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
            },
             body:JSON.stringify({
                usercode:`${datauser[0].user_code}`,
                roleid:`${checked}`
            })

        })
            .then(response => response.json())
            
    }


    return (
        <div className=" mt-[40px] ml-[9%]">
            {data.length > 0 ? <table className="w-[900px]">
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
                                {/* <button  className="ml-[20px] mr-[10px] bg-[#0083c2] border border-gray-800 text-white  px-4 rounded-md hover:bg-blue-600 hover:border-blue-700 focus:outline-none focus:border-blue-700">Sửa</button> */}
                            </tr>
                        );

                    })}
                </tbody>
            </table> : <></>}
            {role===2 && datauser && datauser.map((user, index) => (
                <div key={index}>

                    <div className="   w-[100%] mt-[50px] ">
                        <h2>Cập nhật lại quyền cho tài khoản</h2>
                        <div className="flex">
                            <div className="flex flex-col w-[50%] gap-[5px] mt-[20px]">
                                <a>Họ và tên: {user.hodem} {user.ten} </a>
                                <a>Mã giáo viên: {user.user_code}</a>
                                <a>Email: {user.email}</a>

                            </div>
                            <div className="text-[18px] mt-[20px]">
                                {quyen.map(q => (
                                    <div key={q.id}>
                                        <input
                                            type="radio"
                                            checked={checked === q.id}
                                            onChange={() => setChecked(q.id)}
                                        />
                                        {q.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => {
                            swal("Bạn có chắc chắn muốn sửa ?", {
                                buttons: ["Hủy!", true],
                              }).then((value) => {
                                if (value === true) {
                                  // Gọi handleClick() ở đây
                                  handleClick();
                                  swal("Cập nhật thành công!", "Nhấn OK để thoát!", "success").then(() => {
                                    window.location.href = "/admin/role";
                                  });
                                }
                              });
                        }}  className="mt-[30px] ml-[30%] mr-[10px] bg-[#0083c2] border border-gray-800 text-white  px-4 rounded-md hover:bg-blue-600 hover:border-blue-700 focus:outline-none focus:border-blue-700">Lưu sửa</button>
                    </div>


                </div>
            ))}



        </div>

    )
}
