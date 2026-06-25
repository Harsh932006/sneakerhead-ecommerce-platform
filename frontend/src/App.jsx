import {Routes, Route} from "react-router-dom"
import HomePage from './landing_page/Pages/HomePage'
import Product from './landing_page/Pages/Product'
import LoginPage from './landing_page/Pages/LoginPage'
import SignupPage from './landing_page/Pages/SignupPage'
import CategoriesPage from './landing_page/Pages/CategoriesPage'
import AdminLoginPage from "../src/admin/Pages/AdminLoginPage"
import AdminDashboardPage from "./admin/Pages/AdminDashboardPage"
import EditMyProduct from "./admin/Pages/EditMyProduct"
import AdminSignup from "./admin/Pages/AdminSignup"

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/products' element={<Product />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignupPage />}></Route>
      <Route path='/categories' element={<CategoriesPage />}></Route>

      <Route path="/admin-login" element={<AdminLoginPage />}></Route>
      <Route path="/admin-dashboard" element={<AdminDashboardPage />}></Route>
      <Route path="/admin/products/edit/:id" element={<EditMyProduct />}></Route>
      <Route path="/admin-signup" element={<AdminSignup />}></Route>
    </Routes>
  )
}

export default App