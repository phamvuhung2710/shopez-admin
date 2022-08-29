import React, { useState } from 'react'
import './style.css'
import { Link, Outlet } from 'react-router-dom'
import Search from '../Search'
import User from '../User'
import Favorite from '../Favorite'
import Cart from '../Cart'
import dummyShoesData from '../../dummyshoesdata.json'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

function Navbar() {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <div className="navbar">
        <div className="navbar-text-item-container flex items-center">
          <div className="negative-space2"></div>
          <span style={{ fontSize: '24px' }}>SHO:EZ</span>
          <div className="negative-space2"></div>
          <Link
            className="navbar-text-link font-semibold text-md"
            to="/"
            onClick={() => {
              window.scrollTo(0, 0)
              document.body.style.overflow = 'visible'
            }}
          >
            HOME
          </Link>
          <Link
            className="navbar-text-link font-semibold text-md"
            to="/men"
            onClick={() => {
              window.scrollTo(0, 0)
              document.body.style.overflow = 'visible'
            }}
          >
            MEN
          </Link>
          <Link
            className="navbar-text-link font-semibold text-md"
            to="/women"
            onClick={() => {
              document.body.style.overflow = 'visible'

              window.scrollTo(0, 0)
            }}
          >
            WOMEN
          </Link>
          <Link
            className="navbar-text-link font-semibold text-md"
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
          <div>
            <Link
              to="/signin"
              onClick={() => {
                document.body.style.overflow = 'hidden'
              }}
            >
              {' '}
              <User />
            </Link>
          </div>
          <div onClick={showSidebar}>
            <Favorite />
          </div>
          <Cart />
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <div onClick={showSidebar} className="closeSideBarIcon">
              <Link to="#">
                <CloseOutlinedIcon />
              </Link>
            </div>
            <li className="sidebar-item">
              <Link to="#" onClick={showSidebar}>
                <ShoppingBagOutlinedIcon className="sidebar-item-icon" />
                Orders
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="#" onClick={showSidebar}>
                <SettingsOutlinedIcon className="sidebar-item-icon" />
                Settings
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="# " onClick={showSidebar}>
                <LogoutOutlinedIcon className="sidebar-item-icon" />
                <span>Sign out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  )
}

export default Navbar
