import React ,{useEffect, useRef,useState} from 'react'
import {useSelector} from "react-redux"
import HomeCard from '../component/HomeCard';
import CardFeature from '../component/CardFeature';
import { GrPrevious, GrNext } from "react-icons/gr";
// import { CiForkAndKnife } from "react-icons/ci";
// import FilterProduct from '../component/FilterProduct';
import AllProducts from '../component/AllProducts';

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData)
  const homeProductCartList = productData.slice(1,5)
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );
  console.log(homeProductCartListVegetables)
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };


  const categoryList = [...new Set(productData.map(el => el.category))]
  console.log(categoryList)





  return (
    <div className= "p-2 md:p-6">
      <div className='md:flex gap-6 py-2'>
        <div className='md:w-1/2 '>
          <div className='flex gap-3 bg-slate-300 w-36 px-2  item-center rounded-full'>
            <p className='text-sm font-medium text-slate-900 py-1'>Bike Delivery</p>
            <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" alt="BicyclePic" className='h-7 '/>

          </div>
          <h2 className='text-4xl font-bold py-3 md:text-7xl'>The Fastest Delivery in <span className='text-red-600 text'>Your Home</span></h2>
          <p className='py-5 text-base text-xl  '>"Lorem ipsum dolor sit amet,
           consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam,
             quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
             commodo consequat. deserunt mollit anim id est laborum.
             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam,consectetur adipiscing elit,"</p>
            <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>

        </div>
      
      <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
        {/* <div>image1</div>
        <div>image1</div>
        <div>image1</div> */}
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index+"loading"} loading={"Loading..."} />;
              })}
      </div>
      </div>
      <div className=''>
        <div className='flex w-full item-center'>
        <h2 className='font-bold text-2xl text-slate-800'> Fresh Vegetables </h2>
        <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>
      
        <div className='flex gap-5 overflow-scroll scrollbar-none  scroll-smooth transition-all'   ref={slideProductRef}>
        {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id+"vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Loading..." key={index+"cartLoading"} />
              ))}
             
        </div>
      </div>
       
      <AllProducts heading={"your product"} />




    </div>
  )
}

export default Home
