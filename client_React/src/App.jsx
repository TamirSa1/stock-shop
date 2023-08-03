import { useState } from 'react'
import Login from "./components/login/Login"
import SignUp from "./components/signup/SignUp"
import Products from './components/products/products'
import Cart from './components/cart/Cart'
import ProductsWithSearch from './components/productsWithSearch/productsWithSearch'
import NavBar from './components/navbar/NavBar'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

const routes = [
  {
    path: "/login",
    component: <Login></Login>,
    key: "login"
  },
  {
    path: "/signUp",
    component: <SignUp></SignUp>,
    key: "signUp"
  },
  {
    path: "/searchProducts",
    component: <ProductsWithSearch></ProductsWithSearch>,
    key: "searchProducts"
  },
  {
    path: "/products",
    component: <Products></Products>,
    key: "products"
  },
  {
    path: "/cart",
    component: <Cart></Cart>,
    key: "cart"
  }
]


function App() {

  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          {routes.map((route) => {
            return <Route path={route.path} key={route.key} element={route.component} />
          })}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App