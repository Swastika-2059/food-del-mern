import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { assets } from '../assets/assets';
import { AppContext } from '../context/Appcontext';


export default function Navbar() {
   const [open, setOpen] = React.useState(false);
   const {user, setUser,navigate,setShowUserLogin,
    cartCount,searchQuery, setSearchQuery}=useContext(AppContext);

    useEffect(()=>{
        if(searchQuery.length > 0){
        navigate("/products");
        }
    },[searchQuery]);
  return (
    <div className='sticky top-0'>
   
        <nav className=" flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
        <Link to={"/"}>
         <h1 className='text-orange-600 font-bold'>Glocery app</h1>
        </Link>
    
        

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8 transition-all duration-500">
                <Link to={"/"}className='hover:text-2xl' >Home</Link>
                <Link to={"/products"} className='hover:text-2xl'> All Products</Link>
                
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=>setSearchQuery(e.target.value)}
                     className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="relative cursor-pointer">
                    <svg onClick={()=>navigate("/cart")} width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{cartCount()}</button>
                </div>
                        
              {user ? (
               <>
                 <div className='relative group'>
                            <img src={assets.profile_icon} alt="" className='w-10'/>
                            <ul className='hidden group-hover:block absolute top-10 bg-white shadow-md rounded-md border border-gray-200 py-2 w-30 text-sm'>
                                <li onClick={()=>{navigate("/my-orders");}} className='p-0.5 cursor-pointer'>my orders</li>
                                <li onClick={()=>setUser(null)} className='p-0.5 cursor-pointer'>logout</li>
                            </ul>
                 </div>
                        </> 
                       ):(
                    <button 
                     onClick={()=>setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                    Login
                     </button>
                       )}
                
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <Link to={"/"}>Home</Link>
                <Link to={"/products"}> All Products</Link>
                {user ? (
               <>
                 <div className='relative group'>
                            <img src={assets.profile_icon} alt="" className='w-10'/>
                            <ul className='hidden group-hover:block absolute top-10 bg-white shadow-md rounded-md border border-gray-200 py-2 w-30 text-sm'>
                                <li onClick={()=>{navigate("/my-orders");}} className='p-0.5 cursor-pointer'>my orders</li>
                                <li onClick={()=>setUser(null)} className='p-0.5 cursor-pointer'>logout</li>
                            </ul>
                 </div>
                        </> 
                       ):(
                    <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                    Login
                     </button>
                       )}
            </div>
            <button onClick={()=>navigate("/seller")} className="cursor-pointer px-8 py-2 bg-green-700 hover:bg-indigo-600 transition text-white rounded-full">
            admin
            </button>

        </nav>
        </div>
  )
}
