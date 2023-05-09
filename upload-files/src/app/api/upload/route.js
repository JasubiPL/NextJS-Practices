import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request){

  //form data is function from nextjs
  const data = await request.formData()
  const file = data.get("file")
  //console.log(file)

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)


  const filePath = path.join(process.cwd(), "public/image", file.name)
  console.log(filePath)
  writeFile(filePath, buffer)

  console.log("file upload to", filePath)

  return new Response(JSON.stringify({
    message:"uplading File"
  }))
}