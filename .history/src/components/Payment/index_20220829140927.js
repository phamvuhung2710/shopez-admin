import { Input, Radio } from 'antd'
import React, { useState } from 'react'

export default function Payment() {
  const [value, setValue] = useState(1)

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  return (
    <div
      className="flex justify-between mt-[120px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <div className="w-full font-semibold uppercase basis-2/3">
        <h2 className="mb-6 text-4xl">CHECKOUT</h2>
        <p className="mb-2 uppercase">Phương thức thanh toán</p>
        <Radio.Group
          onChange={onChange}
          value={value}
          className="flex flex-col"
        >
          <Radio
            className="px-3 py-2 mb-2 border border-black rounded-sm"
            value={1}
          >
            thanh toán khi nhận hàng
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
            thẻ
          </Radio>
        </Radio.Group>
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
