import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector,  useDispatch } from 'react-redux'
import AllProducts from '../component/AllProducts'
import { addCartItem } from '../redux/productSlice'

const Menu = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
 const {filterby} = useParams()
 const productData = useSelector(state => state.product.productList)
 const productDisplay = productData.filter((el) => el._id === filterby)[0];
console.log(productDisplay)
//  console.log(productData)
const handleAddCartProduct = (e) => {
  // e.stopPropogation()
  dispatch(addCartItem(productDisplay))
  // alert("hi")
  }
  const handleBuy = ()=>{
    dispatch(addCartItem(productDisplay))
      navigate("/cart")
  }
  return (
    <div className=' p-2 md:p-4'>
      <div className='w-full max-w-4xl bg-white  m-auto md:flex '>
      <div className="max-w-sm  overflow-hidden w-full p-5">
          <img
            src={productDisplay.image}
            alt="productpic"
            className="hover:scale-105 transition-all h-full"
          />
        </div>
          <div className='flex flex-col gap-1'>
          <h3 className='font-semibold text-slate-600  capitalize text-2xl md:text-4xl'>{productDisplay.name}</h3>
        <p className=' text-slate-500 text-2xl '>{productDisplay.category}</p>
        <p className='font-bold text-2xl  '><span className='text-red-500'>₹</span>{productDisplay.price}</p>
        <div className='flex gap-3'>
        <button onClick={handleBuy} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">Buy</button>
        <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600  min-w-[100px]">Add Cart</button>  
        </div>
        <div>
            <p className="text-slate-600 font-medium">Description : </p>
            <p>{productDisplay.description}</p>
          </div>
          </div>
      </div>

      <AllProducts heading={"Related Product"}/>
    </div>
  )
}

export default Menu

