import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import './style.css'
import { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { originalURL } from '../../constants'
import { formatMoney } from '../../utils/helper'
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
                <div className="flex items-center justify-between w-full ml-2">
                  <div className="">
                    <p>{item.name}</p>
                    <p>Giá tiền: {formatMoney(item.price)}đ</p>
                    <p>Số lượng: {item.cartQuantity}</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button></button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Cart
