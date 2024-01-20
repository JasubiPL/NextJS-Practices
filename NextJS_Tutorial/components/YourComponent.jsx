import Image from "next/image";

 const YourComponent = () =>{
  return(
    <Image
    src='/image/profile.png'
    height={144}
    width={144}
    alt='Profile Picture'
    />
  )
}

export default YourComponent;