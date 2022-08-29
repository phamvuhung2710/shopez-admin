import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { baseURL, originalURL } from '../../constants'
import HeroIcon from '../../Icon/Icon'
import { addToCart, getTotals } from '../../slices/cartSlice'
import { formatMoney } from '../../utils/helper'
import './style.css'

export function Accessories() {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotals())
  }, [dispatch])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

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
              (item) => item?.category?.name === 'Accessories'
            )
          )
        })
        .catch((error) => console.log(error))
    }

    fetchData()
  }, [])

  return (
    <div
      className="men-container mt-[60px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <h1 className="mt-20 mb-12 text-6xl">Accessory</h1>
      <div className="grid grid-cols-4 gap-x-5 gap-y-8">
        {data?.map((product) => (
          <div className="relative cursor-pointer">
            {/* <HeroIcon className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2" /> */}
            <img
              src={
                product.imageUrl
                  ? originalURL + product.imageUrl
                  : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
              }
              alt="#"
              className="object-cover w-full h-[300px]"
              onClick={() => navigate(`/accessories/${product.id}`)}
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
