
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import { Link } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlice";
import { useDispatch ,useSelector} from "react-redux";
function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData = await res.json()
      // console.log(resData)
      dispatch(setDataProduct(resData))
    })()
  },[])
  console.log(productData)
  return (
   <>
   <Toaster/>
      <Header />
      <main className='pt-16 bg-slate-100  min-h-[calc(100vh)]'>
        <Outlet link ={Link} />
      </main>
   </>
  );
}

export default App;
