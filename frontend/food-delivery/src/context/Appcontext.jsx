import {  createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL= import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

const AppContextProvider = ({children})=>{
const navigate = useNavigate();
const [user, setUser]=useState(null);
const [seller,setSeller]=useState(null);
const [showUserLogin, setShowUserLogin]=useState(false);
const  [products, setProducts]=useState([]);
const [cartItems, setCartItems]=useState({});
const [searchQuery, setSearchQuery]=useState("");


const fetchSeller=async()=>{
    try{
        const { data } = await axios.get("/api/seller/is-auth");
        
if(data.success){
        setSeller(true);
    }
    else{
       setSeller(false);
    }
    
   }
   catch(error){
        setSeller(false); 
    }
};


const fetchUser=async()=>{
try{
    const { data }=await axios.get("/api/user/is-auth");
    if(data.success){
        setUser(data.user);
        setCartItems(data.user.cart);
    }
    else{
        toast.error(data.message);
    }
}
catch(error){
    toast.error(error.message);
}
}

const fetchProducts=async()=>{
   try{
    const { data }=await axios.get("/api/product/list");
     
    if(data.success){
        setProducts(data.products);
    }
    else{
        toast.error(data.message);
    }
    
   }
   catch(error){
        toast.error(error.message);
    }
};

const addToCart=(itemId)=>{
   let cartData=structuredClone(cartItems || {});

   if(cartData[itemId]){
    cartData[itemId]+=1;
   }
   else{
    cartData[itemId]=1;
   }
   setCartItems(cartData);
   toast.success("added to cart");
};
const updateCartItem=(itemId,quantity)=>{
    let cartData=structuredClone(cartItems);
    cartData[itemId]=quantity;
    setCartItems(cartData);
    toast.success("cart updated");
};

const cartCount=()=>{
    let totalCount=0;
    for(const item in cartItems){
        totalCount+=cartItems[item];
    }
    return totalCount;
};

const totalCartAmount=()=>{
    let totalAmount=0;
    for(const items in cartItems){
        let itemInfo=products.find((product)=>product._id==items);
        if(cartItems[items]>0){
            totalAmount+=cartItems[items] * itemInfo.offerPrice;

        }
    }
    return Math.floor(totalAmount*100)/100;
};

const removeFromCart = (itemId) => {
  let cartData = structuredClone(cartItems);
  if (cartData[itemId]) {
    cartData[itemId] -= 1;
    if (cartData[itemId] === 0) {
      delete cartData[itemId];
    }
    toast.success("Removed item from cart");
    setCartItems(cartData);
  }
};


 
useEffect(()=>{
    fetchProducts();
    // fetchSeller();
    fetchUser();
},[]);

useEffect(() => {
  const updateCart = async () => {
    try {
      const { data } = await axios.post("/api/cart/updated", { cartItems });
      if (!data.success) {
        toast.error(data.message);
      } 
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (user) {
    updateCart();
  }
}, [cartItems, user]);

const value={ navigate,user,setUser,seller,setSeller,showUserLogin, 
    setShowUserLogin,products,cartItems, setCartItems,updateCartItem,cartCount,
    totalCartAmount,removeFromCart,addToCart,searchQuery, setSearchQuery, axios,
fetchProducts,setProducts};
    return( 
        <AppContext.Provider value={value} > 
            {children}
        </AppContext.Provider>
    )
};
// export const useAppContext=()=>{
//     return useContext(AppContext)
// };

export default AppContextProvider;