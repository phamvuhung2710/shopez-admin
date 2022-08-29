import { Avatar, Breadcrumb, Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'

import {
  LogoutOutlined,
  SkinOutlined,
  UserOutlined,
  BarsOutlined,
  FileProtectOutlined,
  BarcodeOutlined
} from '@ant-design/icons'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
const { Header, Content, Sider } = Layout

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const isAuthenticated = localStorage.getItem('TOKEN')
  const role = localStorage.getItem('ROLE')

  const [activeMenu, setActiveMenu] = useState([])

  useEffect(() => {
    setActiveMenu([location.pathname])
  }, [location])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin')
    }
  })

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/')
    }
  })

  const handleLogout = () => {
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('authenticated')
    localStorage.removeItem('ROLE')
    localStorage.removeItem('USERNAME')
    localStorage.removeItem('USERID')
  }

  const handleSelectMenu = (menu) => {
    setActiveMenu(menu?.selectedKeys || [])
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="p-5 logo">
          <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            SHO:EZ
          </h1>
        </div>
        <Menu
          theme="dark"
          selectedKeys={activeMenu}
          mode="inline"
          onSelect={handleSelectMenu}
        >
          <Menu.Item key="/admin/users" icon={<UserOutlined />}>
            <NavLink to="/admin/users">Quản lí tài khoản</NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/categories" icon={<BarsOutlined />}>
            <NavLink to="/admin/categories">Quản lí danh mục</NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/products" icon={<SkinOutlined />}>
            <NavLink to="/admin/products">Quản lí sản phẩm</NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/vouchers" icon={<BarcodeOutlined />}>
            <NavLink to="/admin/vouchers">Quản lí voucher</NavLink>
          </Menu.Item>

          <Menu.Item key="/admin/orders" icon={<FileProtectOutlined />}>
            <NavLink to="/admin/orders">Quản lí hóa đơn</NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/logout" icon={<LogoutOutlined />}>
            <NavLink onClick={handleLogout} to="#">
              Đăng xuất
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="flex items-center justify-end site-layout-background">
          <Avatar
            className="w-10 h-10 border-2"
            src="https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/272199957_478019427028691_3297807774564139789_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=iKFqQ8Qbk2kAX_jg4ac&_nc_oc=AQmY9SbymxeADg27gCENWDt1d71oN-wWVrLSdFOma1XX_blTZIekMTyDhHMuRidjK0JuznAEO1VdAbpZA6P0803E&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT9J_UNgOYHHJPl88KAFFzlWW1O5qkXMbP9QV9aqDATnXQ&oe=6310B2DB"
          />
          <span className="ml-2 text-white">ADMIN</span>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: '85vh' }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
