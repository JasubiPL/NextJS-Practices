import { handleResponse } from '@/app/page'
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(request){

  try{
    //form data is function from nextjs
    const data = await request.formData()
    const file = data.get("file")

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)


    const filePath = path.join(process.cwd(), "public/image", file.name)
    //console.log(filePath)
    writeFile(filePath, buffer)

    //console.log("file upload to", filePath)


    const responseObj = { description: `La imagen: ${file.name} se cargo con exito`, statusCode: 200, animation: "show" };
    const response = new Response(JSON.stringify(responseObj), {
      headers: {
        "content-type": "application/json",
      },
    });

    return response;

  }catch(error){
    return NextResponse.json(
      JSON.stringify({message: "no File"}),{
        status:400
      }
    )
  }

}