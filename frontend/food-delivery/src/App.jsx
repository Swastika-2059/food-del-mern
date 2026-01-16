import {Routes,Route, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Productdetails from './pages/Productdetails';
import Products from './pages/Products';

import Navbar from './component/Navbar';
import { useContext } from 'react';

import MyOrder from './pages/MyOrder';
import Auth from './models/Auth';
import ProductCategory from './pages/ProductCategory';
import Footer from './component/Footer';
import {Toaster} from 'react-hot-toast';
import AddAddress from './pages/AddAddress';

import SellerLayout from './pages/seller/SellerLayout';
import SellerLogin from './component/seller/SellerLogin';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import { AppContext } from './context/Appcontext';
import Cart from './pages/cart';


const App=()=>{ 
  const {seller, showUserLogin}=useContext(AppContext);
  const sellerpath=useLocation().pathname.includes('seller');
  return (
    <div className='text-default min-h-screen'> 
    {sellerpath ? null: <Navbar/>}
    {showUserLogin? <Auth/>:null}

    <Toaster/>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/product/:category/:id" element={<Productdetails />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/my-orders" element={<MyOrder />}/>
          <Route path="/products/:category" element={<ProductCategory/>}/>
          <Route path="/add-address" element={<AddAddress />}/>

          <Route path='/seller' element={seller ? <SellerLayout/> : <SellerLogin/>}>
           <Route index  element={seller? <AddProduct/>:null}/>
           <Route path='product-list' element={seller ? <ProductList/>:null} />
           <Route path='orders' element={seller ? <Orders/>:null} />
          </Route>
        </Routes>
      </div>
      {sellerpath ? null: <Footer/>}
    </div>
  )
}
export default App;