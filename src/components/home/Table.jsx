import "../../App.css";
export default function Index() {
    return (
        <div>

            <div className="flex flex-col mt-8 ">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className=" flex shadow overflow-hidden border-b border-gray-200 ">
                            <table className="min-w-[48%] divide-y divide-gray-700 border-black border-solid border-2 p-4">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-[5px] py-2 text-left text-xs font-medium text-black uppercase tracking-wider">STT</th>
                                        <th scope="col" className="py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Tên học phần</th>
                                        <th scope="col" className="py-2 text-left text-xs font-medium text-black uppercase tracking-wider">số TC</th>
                                        <th scope="col" className="py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Điểm 10</th>
                                        <th scope="col" className="py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Điểm 4</th>
                                        <th scope="col" className="py-2 text-left text-xs font-medium text-black uppercase tracking-wider">điểm chữ</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-500">

                                    <tr>
                                        <td className="px-[10px] py-4 whitespace-nowrap">1</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">Môn A</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">3</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">8.0</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">3.0</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">B+</td>
                                    </tr>

                                    <tr>
                                        <td className="px-[10px] py-4 whitespace-nowrap">1</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">Môn A</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">3</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">8.0</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">3.0</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">B+</td>
                                    </tr>

                                </tbody>
                            </table>
                            <table className="ml-[1%] min-w-[48%] divide-y divide-gray-700 border-black border-solid border-2 p-4">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-[5px] py-2 text-left text-xs font-medium text-black uppercase tracking-wider">STT</th>
                                        <th scope="col" className="py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Tên học phần</th>
                                        <th scope="col" className="py-2 text-left text-xs font-medium text-black uppercase tracking-wider">số TC</th>
                                        <th scope="col" className="py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Điểm 10</th>
                                        <th scope="col" className="py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Điểm 4</th>
                                        <th scope="col" className="py-2 text-left text-xs font-medium text-black uppercase tracking-wider">điểm chữ</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-500">

                                    <tr>
                                        <td className="px-[10px] py-4 whitespace-nowrap">1</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">Môn A</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">3</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">8.0</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">3.0</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">B+</td>
                                    </tr>

                                    <tr>
                                        <td className="px-[10px] py-4 whitespace-nowrap">1</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">Môn A</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">3</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">8.0</td>
                                        <td className="px-[10px] py-4 whitespace-nowrap">3.0</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">B+</td>
                                    </tr>

                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
