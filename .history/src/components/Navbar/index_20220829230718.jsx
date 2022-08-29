import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import dummyShoesData from '../../dummyshoesdata.json'
import Cart from '../Cart'
import Favorite from '../Favorite'
import Search from '../Search'
import User from '../User'
import './style.css'

function Navbar() {
  const location = useLocation()
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  const username = localStorage.getItem('USERNAME') || null

  const handleLogout = () => {
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('authenticated')
    localStorage.removeItem('ROLE')
    localStorage.removeItem('USERNAME')
    localStorage.removeItem('USERID')
    setSidebar(false)
  }

  return (
    <>
      <div className="navbar">
        <div className="flex items-center navbar-text-item-container">
          <div className="negative-space2"></div>
          <span style={{ fontSize: '24px' }}>SHO:EZ</span>
          <div className="negative-space2"></div>
          <Link
            className={`font-semibold navbar-text-link text-md ${
              location.pathname === '/' ? 'active-user' : ''
            }`}
            to="/"
            onClick={() => {
              window.scrollTo(0, 0)
              document.body.style.overflow = 'visible'
            }}
          >
            HOME
          </Link>
          <Link
            className={`font-semibold navbar-text-link text-md ${
              location.pathname === '/men' ? 'active-user' : ''
            }`}
            to="/men"
            onClick={() => {
              window.scrollTo(0, 0)
              document.body.style.overflow = 'visible'
            }}
          >
            MEN
          </Link>
          <Link
            className={`font-semibold navbar-text-link text-md ${
              location.pathname === '/women' ? 'active-user' : ''
            }`}
            to="/women"
            onClick={() => {
              document.body.style.overflow = 'visible'

              window.scrollTo(0, 0)
            }}
          >
            WOMEN
          </Link>
          <Link
            className={`font-semibold navbar-text-link text-md ${
              location.pathname === '/accessories' ? 'active-user' : ''
            }`}
            to="/accessories"
            onClick={() => {
              document.body.style.overflow = 'visible'
              window.scrollTo(0, 0)
            }}
          >
            ACCESSORIES
          </Link>
          <Search placeholder="Search" data={dummyShoesData} />
          <div className="negative-space3"></div>
          {username ? (
            <div onClick={showSidebar}>
              <User />
            </div>
          ) : (
            <div>
              <Link
                to="/signin"
                // onClick={() => {
                //   document.body.style.overflow = 'hidden'
                // }}
              >
                {' '}
                <User />
              </Link>
            </div>
          )}

          <div>
            <Favorite />
          </div>
          <Cart />
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            123
            <div onClick={showSidebar} className="closeSideBarIcon">
              <Link to="#">
                <CloseOutlinedIcon />
              </Link>
            </div>
            <li className="sidebar-item">
              <Link to="/orders" onClick={showSidebar}>
                <ShoppingBagOutlinedIcon className="sidebar-item-icon" />
                Orders
              </Link>
            </li>
            {/* <li className="sidebar-item">
              <Link to="#" onClick={showSidebar}>
                <SettingsOutlinedIcon className="sidebar-item-icon" />
                Settings
              </Link>
            </li> */}
            <li className="sidebar-item">
              <Link to="# " onClick={handleLogout}>
                <LogoutOutlinedIcon className="sidebar-item-icon" />
                <span>Sign out</span>
              </Link>
            </li>
          </ul>
        </nav>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">Tìm kiếm</ul>
        </nav>
      </div>
    </>
  )
}

export default Navbar
