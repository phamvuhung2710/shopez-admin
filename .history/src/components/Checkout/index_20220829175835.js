import { unwrapResult } from '@reduxjs/toolkit'
import { Input, Radio, Tag } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { baseURL, originalURL } from '../../constants'
import { getTotals, removeFromCart } from '../../slices/cartSlice'
import { formatMoney } from '../../utils/helper'
import axios from 'axios'

export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [dataVoucher, setDataVoucher] = useState([])
  const [codeVoucher, setCodeVoucher] = useState('')
  const [discountVoucher, setDiscountVoucher] = useState('')
  const [shipFee, setShipFee] = useState(0)
  const [infoPayment, setInfoPayment] = useState({})

  const handleSetCodeVoucher = (e) => {
    setCodeVoucher(e.target.value)
  }

  useEffect(() => {
    const indexCodeVoucher = dataVoucher
      .map((item) => item.code)
      .indexOf(codeVoucher)
    if (indexCodeVoucher !== -1) {
      setDiscountVoucher(dataVoucher[indexCodeVoucher].discount)
    } else {
      setDiscountVoucher(0)
    }
  }, [codeVoucher, dataVoucher])

  const onChange = (e) => {
    setShipFee(e.target.value)
  }

  useEffect(() => {
    async function fetchDataVoucher() {
      axios
        .post(
          `${baseURL}/vouchers/voucher_get_list_paging_sort_search_filter`,
          {
            searchKey: '',
            pageNumber: 1,
            pageSize: 1000
          }
        )
        .then((res) => {
          setDataVoucher(res?.data?.data?.content)
        })
        .catch((error) => console.log(error))
    }

    fetchDataVoucher()
  }, [])

  const cart = useSelector((state) => state.cart)

  const totalAmountCart = cart.cartItems.reduce(
    (cartTotal, cartItem) => {
      const { price, cartQuantity } = cartItem
      const itemTotal = price * cartQuantity

      cartTotal.total += itemTotal
      cartTotal.quantity += cartQuantity

      return cartTotal
    },
    {
      total: 0,
      quantity: 0
    }
  )

  const totalAmountAll = useMemo(() => {
    const total = totalAmountCart.total * (1 - discountVoucher / 100) + shipFee
    return total
  }, [discountVoucher, totalAmountCart.total, shipFee])

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }

  const handleChangeInfo = (e) => {
    console.log('value: ', e.target.name)
  }

  return (
    <div
      className="flex justify-between mt-[120px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <div className="w-full font-semibold uppercase basis-2/3">
        <h2 className="mb-6 text-4xl">CHECKOUT</h2>
        <p className="">Thông tin liên hệ</p>
        <p className="mb-1">Số di động</p>
        <Input className="border-black w-72" name="phone" onChange={handleChangeInfo} />
        <p className="mt-8">Thông tin giao hàng</p>
        <p className="mb-1">Họ tên</p>
        <Input className="border-black w-72" name="phone" onChange={handleChangeInfo} />
        <div className="flex mt-2">
          <div>
            <p className="mb-1">Tỉnh/ Thành Phố</p>
            <Input className="border-black w-72" name="phone" onChange={handleChangeInfo} />
          </div>

          <div className="mb-2 ml-8">
            <p className="mb-1">Quận / Huyện</p>
            <Input className="border-black w-72" name="phone" onChange={handleChangeInfo} />
          </div>
        </div>

        <div className="flex">
          <div>
            <p className="mb-1">Phường/ Xã</p>
            <Input className="border-black w-72" name="phone" onChange={handleChangeInfo} />
          </div>

          <div className="mb-2 ml-8">
            <p className="mb-1">Số nhà, Tên đường</p>
            <Input className="border-black w-72" name="phone" onChange={handleChangeInfo} />
          </div>
        </div>

        <h2 className="mt-5 mb-2 uppercase">phương thức giao hàng</h2>
        <Radio.Group
          onChange={onChange}
          value={shipFee}
          className="flex flex-col w-[300px]"
        >
          <Radio
            className="flex justify-between px-3 py-2 mb-2 uppercase border border-black rounded-sm"
            value={50000}
          >
            <span>giao hàng tiết kiệm</span>
            <span className="ml-7">{formatMoney(50000)}</span>
          </Radio>
        </Radio.Group>
      </div>
      {/* <p className="">Phương thức giao hàng</p> */}
      <div className="p-8 basis-1/3 bg-slate-200">
        <h2 className="pb-2 mb-4 text-lg font-semibold uppercase border-b border-black">
          Chi tiết giỏ hàng
        </h2>
        <div className="pb-2 mb-4 border-b border-black">
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

                <div className="flex items-center">
                  <Tag className="px-2 py-1 mr-2 rounded-sm" color="blue">
                    {formatMoney(item.price * item.cartQuantity)}đ
                  </Tag>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Input
          placeholder="NHẬP MÃ GIẢM GIÁ"
          className="my-4"
          onChange={handleSetCodeVoucher}
        />

        <div className="pt-2 mb-4 border-t border-black">
          <p className="mb-2">
            Tạm tính:{' '}
            <span className="ml-1 font-semibold">
              {formatMoney(totalAmountCart.total || 0)}đ
            </span>
          </p>
          <p className="mb-2">
            Giảm giá:{' '}
            <span className="ml-1 font-semibold">
              {discountVoucher}%{' '}
              <span className="ml-2">
                ( -
                {formatMoney((discountVoucher / 100) * totalAmountCart.total)}đ
                )
              </span>
            </span>
          </p>
          <p>
            Phí vận chuyển:{' '}
            <span className="ml-1 font-semibold">{formatMoney(shipFee)}đ</span>
          </p>
        </div>
        <div className="flex items-center justify-between pt-4 mb-4 font-semibold border-t border-black text-[18px]">
          <p className="uppercase">Tổng: </p>
          <p>{formatMoney(totalAmountAll)}đ</p>
        </div>

        <div className="flex flex-col mt-16">
          <button className="uppercase bg-orange-400 text-[16px] mb-8 py-2 font-semibold">
            tiếp tục
          </button>
          <button className="underline uppercase text-[16px] font-semibold">
            quay lại
          </button>
        </div>
      </div>
    </div>
  )
}
