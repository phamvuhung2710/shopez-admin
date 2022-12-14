import { Input, Radio, Tag, message } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { baseURL, originalURL } from '../../constants'
import { addToCart, clearCart, decreaseCart, removeFromCart } from '../../slices/cartSlice'
import { formatMoney } from '../../utils/helper'
import axios from 'axios'

export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isPayment, setIsPayment] = useState(false)
  const [dataVoucher, setDataVoucher] = useState([])
  const [codeVoucher, setCodeVoucher] = useState('')
  const [discountVoucher, setDiscountVoucher] = useState('')
  const [shipFee, setShipFee] = useState(0)
  const [infoPayment, setInfoPayment] = useState({
    phone: '',
    name: '',
    province: '',
    district: '',
    ward: '',
    street: ''
  })
  const [valuePayment, setValuePayment] = useState(1)

  const userId = localStorage.getItem('USERID') || null

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

  const cartCheckoutDetails = cart.cartItems?.map((item) => ({
    productId: item.id,
    price: item.price,
    quantity: item.cartQuantity,
    amout: item.price * item.cartQuantity
  }))

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

  const handleIncreaseQuantity = (product) => {
    dispatch(addToCart(product))
  }

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseCart(product))
  }

  const handleChangeInfo = (e) => {
    setInfoPayment({
      ...infoPayment,
      [e.target.name]: e.target.value
    })
  }

  const onChangePayment = (e) => {
    setValuePayment(e.target.value)
  }

  const handlePayment = () => {
    const body = {
      ...infoPayment,
      voucherCode: codeVoucher,
      payment: valuePayment,
      userId,
      details: cartCheckoutDetails || []
    }

    axios
      .post(`${baseURL}/invoices/invoice_create`, body)
      .then(() => {
        dispatch(clearCart())
        navigate('/payment')
      })
      .catch((error) => console.log(error))
  }

  return (
    <div
      className="flex justify-between mt-[120px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <div className="w-full font-semibold uppercase basis-2/3">
        <h2 className="mb-6 text-4xl">CHECKOUT</h2>
        {isPayment ? (
          <>
            <p className="mb-5 text-lg uppercase">Ph????ng th???c thanh to??n</p>
            <Radio.Group
              onChange={onChangePayment}
              value={valuePayment}
              className="flex flex-col w-[300px]"
            >
              <Radio
                className="px-3 py-2 mb-2 border border-black rounded-sm"
                value={1}
              >
                thanh to??n khi nh???n h??ng
              </Radio>
              <Radio
                className="px-3 py-2 mb-2 border border-black rounded-sm"
                value={2}
              >
                Momo
              </Radio>
              <Radio
                className="px-3 py-2 mb-2 border border-black rounded-sm"
                value={3}
              >
                zalopay
              </Radio>
              <Radio
                className="px-3 py-2 mb-2 border border-black rounded-sm"
                value={4}
              >
                paypal
              </Radio>
              <Radio
                className="px-3 py-2 mb-2 border border-black rounded-sm"
                value={5}
              >
                th???
              </Radio>
            </Radio.Group>
          </>
        ) : (
          <>
            <p className="">Th??ng tin li??n h???</p>
            <p className="mb-1">S??? di ?????ng</p>
            <Input
              className="border-black w-72"
              name="phone"
              onChange={handleChangeInfo}
            />
            <p className="mt-8">Th??ng tin giao h??ng</p>
            <p className="mb-1">H??? t??n</p>
            <Input
              className="border-black w-72"
              name="name"
              onChange={handleChangeInfo}
            />
            <div className="flex mt-2">
              <div>
                <p className="mb-1">T???nh/ Th??nh Ph???</p>
                <Input
                  className="border-black w-72"
                  name="province"
                  onChange={handleChangeInfo}
                />
              </div>

              <div className="mb-2 ml-8">
                <p className="mb-1">Qu???n / Huy???n</p>
                <Input
                  className="border-black w-72"
                  name="district"
                  onChange={handleChangeInfo}
                />
              </div>
            </div>

            <div className="flex">
              <div>
                <p className="mb-1">Ph?????ng/ X??</p>
                <Input
                  className="border-black w-72"
                  name="ward"
                  onChange={handleChangeInfo}
                />
              </div>

              <div className="mb-2 ml-8">
                <p className="mb-1">S??? nh??, T??n ???????ng</p>
                <Input
                  className="border-black w-72"
                  name="street"
                  onChange={handleChangeInfo}
                />
              </div>
            </div>

            <h2 className="mt-5 mb-2 uppercase">ph????ng th???c giao h??ng</h2>
            <Radio.Group
              onChange={onChange}
              value={shipFee}
              className="flex flex-col w-[300px]"
            >
              <Radio
                className="flex justify-between px-3 py-2 mb-2 uppercase border border-black rounded-sm"
                value={0}
              >
                <span>giao h??ng ti???t ki???m</span>
                <span className="ml-7">FREE</span>
              </Radio>
            </Radio.Group>
          </>
        )}
      </div>
      {/* <p className="">Ph????ng th???c giao h??ng</p> */}
      <div className="p-8 basis-1/3 bg-slate-200">
        <h2 className="pb-2 mb-4 text-lg font-semibold uppercase border-b border-black">
          Chi ti???t gi??? h??ng
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
                className="object-cover w-40 h-20 rounded-md select-none"
              />
              <div className="flex items-center justify-between w-full ml-2">
                <div className="">
                  <p className="mb-1 select-none">{item.name}</p>
                  <p className="mb-1 select-none">
                    Gi?? ti???n: {formatMoney(item.price)}??
                  </p>
                  <div className="flex items-center">
                    <p className="select-none">S??? l?????ng: {item.cartQuantity}</p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 mx-2 border p-1 border-black rounded-sm cursor-pointer"
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 border p-1 border-black rounded-sm cursor-pointer"
                      onClick={() => handleDecreaseQuantity(item)}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 12h-15"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center">
                  <Tag
                    className="px-2 py-1 mr-2 rounded-sm select-none"
                    color="blue"
                  >
                    {formatMoney(item.price * item.cartQuantity)}??
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
          placeholder="NH???P M?? GI???M GI??"
          className="my-4"
          onChange={handleSetCodeVoucher}
        />

        <div className="pt-2 mb-4 border-t border-black">
          <p className="mb-2">
            T???m t??nh:{' '}
            <span className="ml-1 font-semibold">
              {formatMoney(totalAmountCart.total || 0)}??
            </span>
          </p>
          <p className="mb-2">
            Gi???m gi??:{' '}
            <span className="ml-1 font-semibold">
              {discountVoucher}%{' '}
              <span className="ml-2">
                ( -
                {formatMoney((discountVoucher / 100) * totalAmountCart.total)}??
                )
              </span>
            </span>
          </p>
          <p>
            Ph?? v???n chuy???n:{' '}
            <span className="ml-1 font-semibold">{formatMoney(shipFee)}??</span>
          </p>
        </div>
        <div className="flex items-center justify-between pt-4 mb-4 font-semibold border-t border-black text-[18px]">
          <p className="uppercase">T???ng: </p>
          <p>{formatMoney(totalAmountAll)}??</p>
        </div>

        <div className="flex flex-col mt-16">
          <button
            className="uppercase bg-orange-400 text-[16px] mb-8 py-2 font-semibold"
            onClick={
              () => {
                if (isPayment) {
                  handlePayment()
                } else {
                  setIsPayment(true)
                }
              }
              // navigate('/payment', {
              //   state: {
              //     ...infoPayment,
              //     voucherCode: codeVoucher,
              //     details: cartCheckoutDetails || []
              //   }
              // })
            }
          >
            {isPayment ? 'thanh to??n' : 'ti???p t???c'}
          </button>
          <button
            className="underline uppercase text-[16px] font-semibold"
            onClick={() => navigate(-1)}
          >
            quay l???i
          </button>
        </div>
      </div>
    </div>
  )
}
