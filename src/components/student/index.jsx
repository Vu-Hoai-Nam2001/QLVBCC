import { useEffect, useState } from "react"


export default function index() {
  const [anh,setAnh] = useState()
  const [image, setImage] = useState("")
  const [dataurl, setDataurl] = useState({})


  useEffect(() =>{
    return()=>{
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
  
  function submitImage() {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "hoainam")
    data.append("cloud_name", "dyfo2gtak")

    fetch("https://api.cloudinary.com/v1_1/dyfo2gtak/image/upload", {
      method: "post",
      body: data
    })
      .then((res) => res.json())
      .then((data) => {
        setDataurl(data)
        console.log(data);
      }).catch((err) => {
        console.log(err);
      })

    setImage(data)
  }
  console.log(dataurl.url)
  return (
    <div className="flex justify-center items-center w-[100%]">
      <div className="flex flex-col w-[30%] justify-center items-center">
        
        <input
          type="file"
          onChange={(e) =>{
            
            // handlePreviewImg
            handelChange(e.target.files[0])
          }}
          className=""
        />
        {anh && <img src={anh.preview} alt="" className="w-[355px]" />}
        <button
          className="bg-[#777777]"
          onClick={() => submitImage()}
        >
          Upload
        </button>

      </div>
    </div>
  )
}