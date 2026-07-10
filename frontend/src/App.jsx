import { Routes, Route } from "react-router-dom";
import HomePage from "./landing_page/Pages/HomePage";
import Product from "./landing_page/Pages/Product";
import LoginPage from "./landing_page/Pages/LoginPage";
import SignupPage from "./landing_page/Pages/SignupPage";
import Cart from "./landing_page/Pages/Cart";
import SingleProduct from "./landing_page/Pages/SingleProduct";
import AdminLoginPage from "../src/admin/Pages/AdminLoginPage";
import AdminDashboardPage from "./admin/Pages/AdminDashboardPage";
import EditMyProduct from "./admin/Pages/EditMyProduct";
import AdminSignup from "./admin/Pages/AdminSignup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./landing_page/components/ProtectedRoute";
import ProtectedAdminRoute from "./admin/Pages/ProtectedAdminRoute";
import NotFound from "./landing_page/Pages/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }></Route>
        <Route path="/product/:id" element={<SingleProduct />}></Route>

        <Route path="/admin-login" element={<AdminLoginPage />}></Route>
        <Route path="/admin-dashboard" element={
          <ProtectedAdminRoute>
            <AdminDashboardPage />
          </ProtectedAdminRoute>
        }></Route>
        <Route
          path="/admin/products/edit/:id"
          element={<EditMyProduct />}
        ></Route>
        <Route path="/admin-signup" element={<AdminSignup />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
  );
};

export default App;
