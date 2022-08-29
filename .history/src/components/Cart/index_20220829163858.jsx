import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import './style.css'
import { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { originalURL } from '../../constants'
// import ClickAwayListener from "@mui/base/ClickAwayListener";

// const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || []

function Cart() {
  const [insideCart, setInsideCart] = useState(false)
  const showInsideCart = () => setInsideCart(!insideCart)

  const cart = useSelector((state) => state.cart)

  const numberProductInCart = cart.cartItems.reduce((a, b) => {
    return a + b.cartQuantity
  }, 0)

  return (
    <>
      <div className="relative cartIcon" onClick={showInsideCart}>
        {numberProductInCart !== 0 && (
          <div class="inline-flex absolute top-4 -right-5 justify-center items-center w-7 h-7 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
            {numberProductInCart < 10 ? numberProductInCart : '9+'}
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
            {cart.cartItems.map((item) => (
              <div className="flex items-center p-4 mt-2 bg-white rounded-md shadow-sm">
                <img
                  src={
                    item.imageUrl
                      ? originalURL + item.imageUrl
                      : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
                  }
                  alt="#"
                  className="object-cover w-40 h-20 rounded-md"
                />
                <div className="ml-2">
                  <p>{item.name}</p>
                  <p>Số lượng: {item.cartQuantity}</p>
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}

export default Cart
