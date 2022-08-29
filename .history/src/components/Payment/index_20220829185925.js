import { Input, Radio } from 'antd'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Payment() {
  return (
    <div
      className="flex flex-col mt-[120px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <img
        src="https://www.pngitem.com/pimgs/m/509-5099442_verified-blue-check-mark-png-transparent-png.png"
        alt="success"
        className="w-56 h-40"
      />
      <h2 className="text-2xl font-semibold">Bạn đã thanh toán thành công</h2>
    </div>
  )
}
