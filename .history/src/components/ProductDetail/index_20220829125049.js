import React from 'react'

export default function ProductDetail() {
  return (
    <div>
      <div className="mt-[120px] mb-[120px] mx-auto" style={{ width: '90vw' }}>
        <img
          src="https://vietnamleather.com/wp-content/uploads/2020/08/2-3-640x470.jpg"
          alt=""
        />
      </div>

      <div>
        <h2>TEN GIAY</h2>
        <p>
          Size: <span>9.5</span>
        </p>
        <div>
          <p>Color</p>
          <div></div>
        </div>

        <div>
        <p></p>
        <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</button>
          1.500.000đ
        </div>
      </div>
    </div>
  )
}
