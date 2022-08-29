import React, {useLayoutEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminCategories from './components/AdminCategories'
import AdminOrders from './components/AdminOrders'
import AdminProducts from './components/AdminProducts'
import AdminUsers from './components/AdminUsers'
import AdminVouchers from './components/AdminVouchers'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import AdminLayout from './layout/AdminLayout'

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/users"
        element={
          <AdminLayout>
            <AdminUsers />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminLayout>
            <AdminProducts />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminLayout>
            <AdminOrders />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <AdminLayout>
            <AdminCategories />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/vouchers"
        element={
          <AdminLayout>
            <AdminVouchers />
          </AdminLayout>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <AdminLayout>
            <AdminUsers />
          </AdminLayout>
        }
      />
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
  )
}
