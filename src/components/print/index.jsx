import React from "react";
import { Viewer } from "@grapecity/activereports-react";
import "@grapecity/activereports/pdfexport";

// import { FontStore } from "@grapecity/activereports/core";
// FontStore.registerFonts("fontsConfig.json");

export default function Index(pros) {
  console.log(`đâu là masinhvien ${pros.data}`);

  const viewerRef = React.useRef();
  async function loadData(pros) {
    console.log(`đây là masinhvien trong loadData ${pros.data}`)
    const response = await fetch(
      `https://qlvbcc.hasura.app/api/rest/get_timkiem_ttsv/${pros.data}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'SeALKpEjjdBd2xlGyBXtGPjU9C46BocE6P3DERIgB8sJhPGvUH57qvh7QnMW4e9c',
        },
      }

    );
    const data = await response.json();
    return data.f_get_ttsv5[0];
  }

  async function loadData1(pros) {
    console.log(`đây là masinhvien trong loadData1 ${pros.data}`)
    const response = await fetch(
      `https://edumnghpu.hasura.app/api/rest/study/allscore/${pros.data}`
    );
    const data = await response.json();
    console.log(data.diem_toan_khoa)
    return data.diem_toan_khoa;
  }


  async function loadReport() {
    // load report definition from the file
    const reportResponse = await fetch("multisectionreport1.rdlx-json");
    const report = await reportResponse.json();
    return report;
  }
  React.useEffect(() => {
    async function openReport() {
      const data = await loadData(pros);
      const newData = Object.assign({}, data);

      // Chuyển đổi định dạng ngaysinh,
      const ngaysinh = newData.nganysinh.split(" ")[0]; // Lấy phần ngày tháng từ chuỗi nganysinh
      const parts = ngaysinh.split("-");
      const ngaysinhFormatted = parts[2] + "-" + parts[1] + "-" + parts[0]; // Chuyển đổi thành định dạng ngày-tháng-năm
      newData.nganysinh = ngaysinhFormatted;
      // chuyeernn đổi tên khóa học
      const tenkhoahoc=newData.tenkhoahoc.slice(-2)
      newData.tenkhoahoc=tenkhoahoc
      console.log(newData);


      console.log(data)
      const data1 = await loadData1(pros)
      console.log(data1)
      const report = await loadReport();
      report.DataSources[0].ConnectionProperties.ConnectString =
        "jsondata=" + JSON.stringify(data1);

      report.DataSources[1].ConnectionProperties.ConnectString =
        "jsondata=" + JSON.stringify(newData);
      viewerRef.current.Viewer.open(report);
    }
    openReport();
  }, [pros.data]);
  return (
    <div id="viewer-host">
      <Viewer ref={viewerRef} />
    </div>
  )

}
