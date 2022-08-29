import React from 'react'

export default function ProductDetail() {
  return (
    <div
      className="flex justify-center mt-[120px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <div className="flex justify-center flex-1">
        <img
          src="https://vietnamleather.com/wp-content/uploads/2020/08/2-3-640x470.jpg"
          alt=""
        />
      </div>

      <div className="flex-1 font-semibold">
        <h2 className="mb-8 text-4xl">TEN GIAY</h2>
        <p className="mb-5">
          Size: <span className="ml-10">9.5</span>
        </p>
        <div className="flex mb-5">
          <p>Color: </p>
          <div className="w-6 h-6 ml-10 bg-black rounded-full"></div>
        </div>

        <div className="flex items-center mb-5">
          <p> 1.500.000đ</p>
          <button className="flex items-center justify-center px-5 py-2 ml-5 bg-orange-400 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add to cart
          </button>
        </div>

        <h2 className="mb-8 font-bold">Description</h2>
      </div>
    </div>
  )
}
