import { useEffect, useState } from 'react'
import HeroIcon from '../../Icon/Icon'
import './style.css'
import axios from 'axios'
import { baseURL, originalURL } from '../../constants'
import { formatMoney } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart
} from '../../slices/cartSlice'

export function Women() {
  const [data, setData] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotals())
  }, [dispatch])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }
  // const handleDecreaseCart = (product) => {
  //   dispatch(decreaseCart(product))
  // }
  // const handleRemoveFromCart = (product) => {
  //   dispatch(removeFromCart(product))
  // }
  // const handleClearCart = () => {
  //   dispatch(clearCart())
  // }

  useEffect(() => {
    async function fetchData() {
      axios
        .post(
          `${baseURL}/products/product_get_list_paging_sort_search_filter`,
          {
            searchKey: '',
            pageNumber: 1,
            pageSize: 10000
          }
        )
        .then((res) => {
          setData(
            res?.data?.data?.content?.filter(
              (item) => item?.category?.name === 'Women'
            )
          )
        })
        .catch((error) => console.log(error))
    }

    fetchData()
  }, [])

  // const handleAddToCart = (product) => {
  //   const idsProductCart = cart.map((item) => item.product.id)
  //   const indexProduct = idsProductCart.indexOf(product.id)
  //   if (indexProduct !== -1) {
  //     const newCart = [...cart]
  //     newCart[indexProduct].quantity = newCart[indexProduct].quantity + 1
  //     setCart(newCart)
  //   } else {
  //     const newCart = [...cart]
  //     const newProductAddToCart = {
  //       product,
  //       quantity: 1
  //     }
  //     newCart.push(newProductAddToCart)
  //     setCart(newCart)
  //   }
  // }

  return (
    <div
      className="men-container mt-[60px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <h1 className="mt-20 mb-12 text-6xl">Women</h1>
      <div className="grid grid-cols-4 gap-x-5 gap-y-8">
        {data?.map((product) => (
          <div className="relative">
            <HeroIcon className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2" />
            <img
              src={
                product.imageUrl
                  ? originalURL + product.imageUrl
                  : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
              }
              alt="#"
              className="object-cover w-full h-[300px]"
            />
            <div className="flex items-center justify-between bg-slate-200">
              <p className="pl-2 text-lg font-medium">
                {formatMoney(product?.price)}đ
              </p>
              <button
                className="px-4 py-1 bg-orange-400 text-[20px] font-semibold"
                onClick={() => handleAddToCart(product)}
              >
                +
              </button>
            </div>
            <p className="mt-1 font-semibold">{product?.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
