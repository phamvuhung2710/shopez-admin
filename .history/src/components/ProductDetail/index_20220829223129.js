import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../constants'

export default function ProductDetail() {
  const { id } = useParams()

  const [productDetail, setProductDetail] = useState(null)

  useEffect(() => {
    async function fetchData() {
      axios
        .get(`${baseURL}/products/product_get_detail/${id}`, {
          searchKey: '',
          pageNumber: 1,
          pageSize: 10000
        })
        .then((res) => {
          setProductDetail(
            res?.data?.data?.content?.filter(
              (item) => item?.category?.name === 'Women'
            )
          )
        })
        .catch((error) => console.log(error))
    }

    fetchData()
  }, [id])

  return (
    <div
      className="flex justify-center mt-[120px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <div className="flex justify-center flex-1">
        <img
          src="https://vietnamleather.com/wp-content/uploads/2020/08/2-3-640x470.jpg"
          alt=""
          className="rounded-sm"
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

        <div className="flex items-center mb-8">
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

        <h2 className="mb-8 font-bold text-[18px]">Description</h2>

        <p className="w-4/5">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo saepe
          aperiam voluptatum excepturi repudiandae voluptatibus facere sed,
          laboriosam vitae, doloribus nostrum sit ducimus est reiciendis
          molestiae maxime? Enim, dolorem id.
        </p>
      </div>
    </div>
  )
}
