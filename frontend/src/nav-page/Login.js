import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {loginRedux} from "../redux/userSlice"


const Login = () => {
 

  

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const userData = useSelector(state => state)
  console.log(userData.user)
  const dispatch = useDispatch()
  // console.log(data);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: [value],
      };
    });
    // setData({
    //   ...data,
    //   [e.target.name]: e.target.value,
    // });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataRes = await fetchData.json()
      // console.log(dataRes)
     
      // alert("login successfully logined");
      toast( dataRes.message)

      if(dataRes.alert){
        dispatch(loginRedux(dataRes))
        setTimeout(()=>{ navigate("/")},1000);
      }
      // console.log(userData)
    }
      else {
      alert("please enter required fields");
    }
  }

  const handleshowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4 ">
        <div className="w-20  overflow-hidden rounded-full drop-shadow-md m-auto">
          <img
            src={loginSignupImage}
            alt="loginimg.png"
            className="w-full h-full"
          />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-1 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-1 py-1  bg-slate-200 rounded mt-1 mb-2 focus-within:outline  focus-within:outline-blue-300 ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full  bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleshowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type={"submit"}
            className="max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 mt-4"
          >
            LOGIN
          </button>
        </form>
        <p>
          Don't have an account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
