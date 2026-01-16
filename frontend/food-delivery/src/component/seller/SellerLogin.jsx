import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/Appcontext';
import toast from 'react-hot-toast';

export default function SellerLogin() {
  const { seller, setSeller, navigate, axios } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    if(seller===true){
      navigate("/seller");

  }
  },[navigate,seller]);

  const submitHandler = async (e) => {
     e.preventDefault();
      // ✅ stop page reload
    try {
     
      const { data } = await axios.post("/api/seller/login",{ email, password, });
      if (data.success) {
        setSeller(true);
        navigate("/seller");  // ✅ redirect immediately
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    !seller && (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/50 text-gray-200">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-indigo-500">Seller</span> login
          </p>

          <div className="w-full">
            <p>Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="email"
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="password"
              required
            />
          </div>

          <button 
            className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
}
