import { Input } from 'antd'
import React from 'react'

export default function Checkout() {
  return (
    <div
      className="flex justify-between mt-[120px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <div className="w-full font-semibold uppercase basis-3/4">
        <h2 className="mb-6 text-4xl">CHECKOUT</h2>
        <p className="">Thông tin liên hệ</p>
        <p className="mb-1">Số di động</p>
        <Input className="border-black w-72" />
        <p className="mt-8">Thông tin giao hàng</p>
        <p className="mb-1">Họ tên</p>
        <Input className="border-black w-72" />
        <p className="mb-1">Tỉnh/ Thành Phố</p>
        <Input className="border-black w-72" />
        <p className="mb-1">Phường/ Xã</p>
        <Input className="border-black w-72" />
        <p className="mb-1">Quận / Huyện</p>
        <Input className="border-black w-72" />
        <p className="mb-1">Họ tên</p>
        <Input className="border-black w-72" />
      </div>
      <div className="basis-1/4"></div>
    </div>
  )
}
