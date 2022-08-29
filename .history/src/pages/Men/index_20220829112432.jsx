import './style.css'

export function Men() {
  return (
    <div className="men-container mt-[60px] px-16" style={{ width: '90vw' }}>
      <h1 className="mt-20 mb-12 text-6xl">Men</h1>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <img
            src="https://vn-test-11.slatic.net/p/3fd54105454e3b07d3ebd7f998d7fea2.jpg"
            alt=""
          />
          <div className="flex justify-between">
            <p className="font-semibold">1.500.000đ</p>
            <button className="p-5 bg-orange-400">+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
