import React ,{useState} from 'react'
import {BsCloudUpload} from "react-icons/bs"
import ImagetoBase64 from "../utility-items/ImagetoBase64";
import { toast } from "react-hot-toast";


const Newproduct = () => {
  const [data,setData] = useState({
    name:"",
    category:"",
    image:"",
    price:"",
    description:" ",
  })

  const handleOnChange = (e)=>{
    const {name,value} = e.target
    setData((preve)=>{
      return{
        ...preve,[name] : value
      }
    })

  }
  const uploadImage = async(e) =>{
    const data = await ImagetoBase64(e.target.files[0])
    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
  })
    // console.log(data)
  }
   const handleSubmit = async(e) => {
    e.preventDefault();
      console.log(data)
      const{name,category,image,price} = data

      if (name && category && image && price){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
          method:"POST",
          headers:{
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
  
        const fetchRes =await fetchData.json()
        console.log(fetchRes)
        toast(fetchRes.message)

        setData(()=>{
          return{
            name:"",
            category:"",
            image:"",
            price:"",
            description:" ",
          }
        })
  
      }
      else{
        toast("Enter required field")
      }

      
  }
  return (
    <div className='p-4'>
     <form className='m-auto w-full max-w-md p-4 shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
      <label  htmlFor='name'>Name</label>
      <input type={"text"} onChange={handleOnChange} value={data.name}  name='name' className='bg-slate-200 p-2 rounded'/>  
      <label htmlFor='category'>Category</label>
      <select className='bg-slate-200 p-1 my-1 rounded' id='category' value={data.category} name='category' onChange={handleOnChange}>
        <option value={"other"}>Select Category</option>
        <option value={"fruits"}>Fruits</option>
        <option value={"vegetable"}>Vegetable</option>
        <option value={"iceCream"}>IceCream</option>
        <option value={"dosa"}>Dosa</option>
        <option value={"pizza"}>Pizza</option>
        <option value={"rice"}>Rice</option>
        <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"panner"}>Panner</option>
          <option value={"sandwich"}>Sandwich</option>
      </select>

       <label htmlFor="image">Image
        
        <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
          {
            data.image ? <img src={data.image} alt='sevabd' className='h-full' /> : <span className='text-5xl' > <BsCloudUpload/> </span>
          }

        {/* <img src={data.image} alt='projectimg' className='h-full'/> */}
        <input type={'file'}  accept='image/*' name='image' id='image' onChange={uploadImage} className='hidden'/>
      </div>
      </label>

      <label htmlFor='price' className='my-1' >Price</label>
      <input type={'text'} value={data.price} name='price'  onChange={handleOnChange} className='bg-slate-200 p-1 my-1 rounded'></input>

      <label htmlFor='description'>Description</label>
      <textarea rows={2} name='description' value={data.description} onChange={handleOnChange} className='bg-slate-200 p-1 my-1 resize-none rounded'></textarea>

      <button className='bg-red-500 hover:bg-red-600 p-1 my-1 rounded text-white text-lg font-medium drop-shadow '>Save</button>

     </form>

    </div>
  )
}

export default Newproduct
