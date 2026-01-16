import React, { useContext } from 'react'
import {AppContext } from '../context/Appcontext'
import ProductCard from './ProductCard';

export default function BestSeller() {
    const {products}=useContext(AppContext);
  return (
     <div className='mt-16'>
      <p className='text-2xl font-medium md:text-3xl'>Best Seller</p>
      <div className=' my-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center'>
        {products.filter((product)=>product.inStock).slice(0,5).map((product,index)=>(
           <ProductCard key={index} product={product}/>))}
      </div>
    </div> 
  )
} 

