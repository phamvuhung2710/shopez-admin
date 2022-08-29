import { Input } from 'antd'
import React from 'react'

export default function Checkout() {
  return (
    <div
      className="flex justify-between mt-[120px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <div className="w-full basis-3/4">
        <h2>CHECKOUT</h2>
        <p className="">Thông tin liên hệ</p>
        <p>Số di động</p>
        <Input />
      </div>
      <div className="basis-1/4"></div>
    </div>
  )
}
