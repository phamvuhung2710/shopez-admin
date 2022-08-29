import './style.css'

export function Accessories() {
  return (
    <div
      className="men-container mt-[60px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <h1 className="mt-20 mb-12 text-6xl">Accessory</h1>
      <div className="grid grid-cols-4 gap-5"></div>
    </div>
  )
}
