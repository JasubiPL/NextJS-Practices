"use client"
import { useState } from "react"

export default function HomePage() {
  const [file, setFile] = useState()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!file) return

    const form = new FormData()
    form.set("file", file)

    //sending File
    const res = await fetch("./api/upload",{
      method: "POST",
      body:form
    })
    const data = await res.json()
    console.log(data)
    
  } 

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Upload Files</label>
        <input 
          type="file"
          onChange={(e) => handleFile(e)} 
        />

        <button>Upload</button>
      </form>
    </main>
  )
}
