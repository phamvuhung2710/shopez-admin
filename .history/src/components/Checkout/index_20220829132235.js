import { Input } from 'antd'
import React from 'react'

export default function Checkout() {
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
      <div className="basis-1/3">
        
      </div>
    </div>
  )
}
