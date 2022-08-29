import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import './style.css'
import { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import ClickAwayListener from "@mui/base/ClickAwayListener";

// const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || []

function Cart() {
  const [insideCart, setInsideCart] = useState(false)
  const showInsideCart = () => setInsideCart(!insideCart)

  const cart = useSelector((state) => state.cart);

  // const [cart, setCart] = useState(cartFromLocalStorage)

  // console.log('cart in Cart: ', cart)

  // useEffect(() => {
  //   setCart(cartFromLocalStorage)
  // }, [cartFromLocalStorage])

  return (
    <>
      <div className="cartIcon" onClick={showInsideCart}>
        <ShoppingCartOutlinedIcon />
      </div>
      <div>
        <nav className={insideCart ? 'inside-cart active' : 'inside-cart'}>
          <ul className="inside-cart-items">
            <div onClick={showInsideCart} className="showInsideCart">
              <Link to="#">
                <CloseOutlinedIcon />
              </Link>
            </div>
          </ul>
          <div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Cart
