import HeroIcon from '../../Icon/Icon'
import './style.css'

export function Men() {
  return (
    <div
      className="men-container mt-[60px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <h1 className="mt-20 mb-12 text-6xl">Men</h1>
      <div className="grid grid-cols-4 gap-5">
        <div className="shadow-sm">
          <HeroIcon />
          <img
            src="https://vn-test-11.slatic.net/p/3fd54105454e3b07d3ebd7f998d7fea2.jpg"
            alt="#"
          />
          <div className="flex items-center justify-between bg-slate-200">
            <p className="pl-2 text-lg font-medium">1.500.000đ</p>
            <button className="px-4 py-1 bg-orange-400 text-[20px] font-semibold">
              +
            </button>
          </div>
        </div>

        <div>
          <img
            src="https://vn-test-11.slatic.net/p/3fd54105454e3b07d3ebd7f998d7fea2.jpg"
            alt="#"
          />
          <div className="flex items-center justify-between bg-slate-200">
            <p className="pl-2 text-lg font-medium">1.500.000đ</p>
            <button className="px-4 py-1 bg-orange-400 text-[20px] font-semibold">
              +
            </button>
          </div>
        </div>

        <div>
          <img
            src="https://vn-test-11.slatic.net/p/3fd54105454e3b07d3ebd7f998d7fea2.jpg"
            alt="#"
          />
          <div className="flex items-center justify-between bg-slate-200">
            <p className="pl-2 text-lg font-medium">1.500.000đ</p>
            <button className="px-4 py-1 bg-orange-400 text-[20px] font-semibold">
              +
            </button>
          </div>
        </div>

        <div>
          <img
            src="https://vn-test-11.slatic.net/p/3fd54105454e3b07d3ebd7f998d7fea2.jpg"
            alt="#"
          />
          <div className="flex items-center justify-between bg-slate-200">
            <p className="pl-2 text-lg font-medium">1.500.000đ</p>
            <button className="px-4 py-1 bg-orange-400 text-[20px] font-semibold">
              +
            </button>
          </div>
        </div>

        <div>
          <img
            src="https://vn-test-11.slatic.net/p/3fd54105454e3b07d3ebd7f998d7fea2.jpg"
            alt="#"
          />
          <div className="flex items-center justify-between bg-slate-200">
            <p className="pl-2 text-lg font-medium">1.500.000đ</p>
            <button className="px-4 py-1 bg-orange-400 text-[20px] font-semibold">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
