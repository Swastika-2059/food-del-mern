import React from 'react'
import Hero from '../component/Hero'
import Category from '../component/Category'
import BestSeller from '../component/BestSeller'
import ProductCard from '../component/ProductCard'
import NewsLetter from '../component/NewsLetter'
import Footer from '../component/Footer'

export default function Home() {
  return (
    <div className='mt-5'>
      <Hero/>
      <Category/>
      <BestSeller/>
      <NewsLetter/>
      {/* <Footer/> */}
    </div>
  )
}
