import { useEffect, useState } from 'react'
import HeroIcon from '../../Icon/Icon'
import './style.css'
import axios from 'axios'
import { baseURL } from '../../constants'

export function Women() {
  const [data, setData] = useState([])

  console.log('data: ', data)
  useEffect(() => {
    async function fetchData() {
      axios
        .post(
          `${baseURL}/products/product_get_list_paging_sort_search_filter`,
          {
            searchKey: '',
            pageNumber: 1,
            pageSize: 10000
          }
        )
        .then((res) => {
          setData(
            res?.data?.data?.content?.filter(
              (item) => item?.category?.name === 'Women'
            )
          )
        })
        .catch((error) => console.log(error))
    }

    fetchData()
  }, [])

  return (
    <div
      className="men-container mt-[60px] mb-[120px] mx-auto"
      style={{ width: '90vw' }}
    >
      <h1 className="mt-20 mb-12 text-6xl">Women</h1>
      <div className="grid grid-cols-4 gap-5">
        <div className="relative shadow-sm">
          <HeroIcon className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2" />
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

        <div className="relative shadow-sm">
          <HeroIcon className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2" />
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

        <div className="relative shadow-sm">
          <HeroIcon className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2" />
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

        <div className="relative shadow-sm">
          <HeroIcon className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2" />
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

        <div className="relative shadow-sm">
          <HeroIcon className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2" />
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
