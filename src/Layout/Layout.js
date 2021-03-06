import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Shop from '../page/Shop/Shop';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Contact from '../page/Contact/Contact';
import Home from '../page/Home/Home';
import Brands from '../page/Brands/Brands';
import Cart from '../page/Cart/Cart';
import NotFound from '../page/NotFound/NotFound';
import Login from '../page/Login/Login';
import Register from '../page/Register/Register';
import Product from '../page/Product/Product';
import Account from '../page/Account/Account';
import Checkout from '../page/checkout/Checkout';
import Order from '../page/Order/Order';
import AdminPanel from '../page/AdminPanel/AdminPanel';
import { CustomContext } from '../Context'
import CreateProduct from '../page/CreateProduct/CreateProduct';


const Layout = () => {
    const location = useLocation();
    const {user} = useContext(CustomContext)
    
  return (
    <div>
  
      {
        location.pathname !== '/login' && location.pathname !== '/register' ? <Header/> : ''
      }
     
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/brands' element={<Brands/>}/>
            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/account' element={<Account/>}/>
            {user.email === 'admin@gmail.com' ? <Route path='/*' element={<AdminPanel/>}/> : ''}
            {user.email === 'admin@gmail.com' ? <Route path='/create' element={<CreateProduct/>}/> : ''}
            <Route path='*' element={<NotFound/>}/>
        </Routes>

        {
                location.pathname === "/login" 
            || location.pathname  === "/register"
            || location.pathname  === "/admin"  
           
            ? '' : <Footer/> 
        }
      
    </div>
  )
}

export default Layout