import { Input } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)

  return (
    <div
      className="flex justify-between mt-[120px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <div className="w-full font-semibold uppercase basis-2/3">
        <h2 className="mb-6 text-4xl">CHECKOUT</h2>
        <p className="">Thông tin liên hệ</p>
        <p className="mb-1">Số di động</p>
        <Input className="border-black w-72" />
        <p className="mt-8">Thông tin giao hàng</p>
        <p className="mb-1">Họ tên</p>
        <Input className="border-black w-72" />
        <div className="flex mt-2">
          <div>
            <p className="mb-1">Tỉnh/ Thành Phố</p>
            <Input className="border-black w-72" />
          </div>

          <div className="mb-2 ml-8">
            <p className="mb-1">Quận / Huyện</p>
            <Input className="border-black w-72" />
          </div>
        </div>

        <div className="flex">
          <div>
            <p className="mb-1">Phường/ Xã</p>
            <Input className="border-black w-72" />
          </div>

          <div className="mb-2 ml-8">
            <p className="mb-1">Số nhà, Tên đường</p>
            <Input className="border-black w-72" />
          </div>
        </div>
      </div>
      {/* <p className="">Phương thức giao hàng</p> */}
      <div className="p-8 basis-1/3 bg-slate-200">
        <h2 className="pb-2 mb-4 text-lg font-semibold uppercase border-b border-black">
          Chi tiết giỏ hàng
        </h2>
        <div className="pb-2 mb-4 border-b border-black">Sản phẩm 01</div>
        <Input placeholder="NHẬP MÃ GIẢM GIÁ" className="my-4" />

        <div className="pt-2 mb-4 border-t border-black">
          <p>Tạm tính: </p>
          <p>Phí vận chuyển: </p>
        </div>

        <div className="flex items-center justify-between pt-4 mb-4 font-semibold border-t border-black text-[18px]">
          <p className="uppercase">Tổng: </p>
          <p>200.000</p>
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
