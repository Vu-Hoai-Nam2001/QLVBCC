import "../../App.css";

import PLVB from "./PLVS"


// import Table from "./Table"

export default function Index() {
 
  
 
  
  // const {getToken} = useAuth();
  // useEffect(() => {
  //   const callApi = async() => {

  //     await fetch(`https://qlvbcc.hasura.app/api/rest/get_tensv/1912101003`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${await getToken({
  //           template: `hasura-qlvbcc`
  //         })}`,
  //       },
  //       // body:JSON.stringify({masv:'1912101003'})

  //     })
  //       .then(response => response.json())
  //       .then((res) => {
  //         console.log(res);
  //       });
  //   }
  //   callApi();
  // }, []);
  return (
    <main className="flex flex-col  mt-[30px] w-[1300px] max-w[100%] mx-auto">
      <button className="ml-auto mt-[5px] w-[120px] bg-[#0083c2] rounded-[15px] h-[32px] border border-black
       hover:bg-red-600 hover:text-white">IN</button>
      <PLVB />
      {/* <Table/> */}
    </main>
  );
}
