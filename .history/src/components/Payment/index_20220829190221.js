import React, { useEffect } from 'react'

export default function Payment() {
  useEffect(() => {
    setTimeout(() => {}, 3000)
  }, [])
  return (
    <div
      className="flex items-center flex-col mt-[120px] mb-[120px] mx-auto"
      style={{ width: '90vw', height: '50vh' }}
    >
      <img
        src="https://www.pngitem.com/pimgs/m/509-5099442_verified-blue-check-mark-png-transparent-png.png"
        alt="success"
        className="h-40 w-60"
      />
      <h2 className="mt-5 text-4xl font-semibold">
        Bạn đã thanh toán thành công
      </h2>
    </div>
  )
}
