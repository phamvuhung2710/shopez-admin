import './style.css'

export function Men() {
  return (
    <div className="men-container mt-[60px] px-16" style={{ width: '90vw' }}>
      <h1 className="my-16 text-6xl">Men</h1>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <img
            src="https://vn-test-11.slatic.net/p/3fd54105454e3b07d3ebd7f998d7fea2.jpg"
            alt=""
          />
          <div>
            <p>1.500.000đ</p>
            <button>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
