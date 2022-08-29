import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import React, { useState } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom'
import dummyShoesData from '../../dummyshoesdata.json'
import Cart from '../Cart'
import Favorite from '../Favorite'
import Search from '../Search'
import User from '../User'
import './style.css'

function Navbar() {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  const handleLogout = () => {
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('authenticated')
    localStorage.removeItem('ROLE')
    localStorage.removeItem('USERNAME')
    localStorage.removeItem('USERID')
    setSidebar('/')
  }

  return (
    <>
      <div className="navbar">
        <div className="flex items-center navbar-text-item-container">
          <div className="negative-space2"></div>
          <span style={{ fontSize: '24px' }}>SHO:EZ</span>
          <div className="negative-space2"></div>
          <NavLink
            className="font-semibold navbar-text-link text-md"
            to="/"
            onClick={() => {
              window.scrollTo(0, 0)
              document.body.style.overflow = 'visible'
            }}
          >
            HOME
          </NavLink>
          <NavLink
            className="font-semibold navbar-text-link text-md"
            to="/men"
            onClick={() => {
              window.scrollTo(0, 0)
              document.body.style.overflow = 'visible'
            }}
          >
            MEN
          </NavLink>
          <NavLink
            className="font-semibold navbar-text-link text-md"
            to="/women"
            onClick={() => {
              document.body.style.overflow = 'visible'

              window.scrollTo(0, 0)
            }}
          >
            WOMEN
          </NavLink>
          <NavLink
            className="font-semibold navbar-text-link text-md"
            to="/accessories"
            onClick={() => {
              document.body.style.overflow = 'visible'
              window.scrollTo(0, 0)
            }}
          >
            ACCESSORIES
          </NavLink>
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
      </div>
    </>
  )
}

export default Navbar
