import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import './style.css'
import { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Link } from 'react-router-dom'
// import ClickAwayListener from "@mui/base/ClickAwayListener";

function Cart() {
  const [insideCart, setInsideCart] = useState(false)
  const showInsideCart = () => setInsideCart(!insideCart)

  return (
    <>
      <div className="cartIcon" onClick={showInsideCart}>
        <ShoppingCartOutlinedIcon />
      </div>
      <div>
        <nav className={insideCart ? 'inside-cart active' : 'inside-cart'}>
          <ul className="inside-cart-items">
            <li>12</li>
            <li>12</li>
            <li>12</li>
            <li>12</li>
            <li>12</li>
            <li>12</li>
            <div onClick={showInsideCart} className="showInsideCart">
              <Link to="#">
                <CloseOutlinedIcon />
              </Link>
            </div>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Cart
