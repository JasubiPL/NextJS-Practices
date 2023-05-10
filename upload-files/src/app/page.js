"use client"
import { useState } from "react"

export default function HomePage() {
  const [file, setFile] = useState()
  const [img, setImg] = useState()
  const [showModal, setShowModal] = useState()

  //Handle Submit
  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!file) {
      handleModal({ description: `Selecciona una imagen`, statusCode: 204, animation: "show" })
      return
    }

    try {
      //throw new Error("Error")
      const form = new FormData()
      form.set("file", file)
  
      //Sending File
      const res = await fetch("./api/upload",{
        method: "POST",
        body:form
      })

      //Response to Server
      if(res.ok){
        const data = await res.json()
        //console.log(data)
        handleModal(data)
      }

    } catch (error) {
      //console.log(error)
      handleModal({ description: `Error al cargar imagen`, statusCode: 400, animation: "show" })
    }
      
  } 

  const handleModal = (data) => {
    //console.log(data)
    
    setShowModal (<Modal serverResponse={data} />)
    setTimeout(setShowModal, 4500)
  }

  const handleFile = (e) => {
    const previewFile = e.target.files[0]
    setFile(previewFile)
    const imgUrl = URL.createObjectURL(previewFile)
    //console.log( imgUrl)
    setImg(imgUrl)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      {showModal}

      <form 
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col text-center gap-4 max-w-5xl"
      >
        <label className="text-4xl mb-8">Upload Files 🗃️</label>
        <input 
          className="bg-gray-800 py-2 px-4 flex flex-col max-w-sm"
          type="file"
          onChange={(e) => handleFile(e)}
        />

        <div className="w-full flex justify-center">
          <img src={img} className=" max-h-96"/>
        </div>

        <button
          className="w-full max-w-sm bg-green-400 rounded-md p-2 self-center"
        >Upload</button>
      </form>
    </main>
  )
}

export function Modal({serverResponse}){
  return(
    <div className={` max-w-sm p-2 rounded-md flex flex-wrap justify-center gap-2 items-center absolute 
    ${serverResponse.animation}
    ${serverResponse.statusCode === 200 ? `bg-green-500` :
    serverResponse.statusCode === 204 ? `bg-yellow-500` : `bg-red-500`}  transition-all`}>

      <span className="py-1 px-3 rounded-md aspect-square border-4 border-white font-bold text-lg ">
        {serverResponse.statusCode === 200 ? `✓` : `✕`}
      </span>

      <span className="text-xl break-words p-2 w-full">
        {serverResponse.description}
      </span>

    </div>
  )
}
