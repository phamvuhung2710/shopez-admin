import React, { useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminCategories from './components/AdminCategories'
import AdminOrders from './components/AdminOrders'
import AdminProducts from './components/AdminProducts'
import AdminUsers from './components/AdminUsers'
import AdminVouchers from './components/AdminVouchers'
import AdminLayout from './layout/AdminLayout'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'
import Login from './pages/Login'

const Wrapper = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
  return children
}

export default function AppRoutes() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="men" element={<MyProfile />} />
          <Route path="women" element={<OthersProfile />} />
        </Route>


        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          }
        />

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
    </Wrapper>
  )
}
