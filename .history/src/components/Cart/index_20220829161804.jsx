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

  const cart = useSelector((state) => state.cart)

  console.log('cart: ', cart)

  // const [cart, setCart] = useState(cartFromLocalStorage)

  // console.log('cart in Cart: ', cart)

  // useEffect(() => {
  //   setCart(cartFromLocalStorage)
  // }, [cartFromLocalStorage])

  return (
    <>
      <div className="relative cartIcon" onClick={showInsideCart}>
        {cart.cartItems.length !== 0 && (
          <div class="inline-flex absolute top-4 -right-2 justify-center items-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
            {cart.cartItems.length}
          </div>
        )}

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
