import './style.css'
import { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import axios from 'axios'
import { baseURL, originalURL } from '../../constants'
import { formatMoney } from '../../utils/helper'
import { Link } from 'react-router-dom'

function Search({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('')

  const [dataProduct, setDataProduct] = useState([])

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
          setDataProduct(res?.data?.data?.content)
        })
        .catch((error) => console.log(error))
    }

    fetchData()
  }, [])

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter = dataProduct.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase())
    })
    if (searchWord === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  const clearInput = () => {
    setFilteredData([])
    setWordEntered('')
  }

  return (
    <>
      <div className="search relative">
        <div className="searchInput">
          <input
            className="inputBar"
            type="text"
            placeholder={placeholder}
            onChange={handleFilter}
            value={wordEntered}
          />

          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchOutlinedIcon />
            ) : (
              <CloseOutlinedIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
          {filteredData.length === 0 ? (
            <div className="searchbar-line"></div>
          ) : (
            <div className="searchbar-line2"></div>
          )}
        </div>
        {filteredData.length > 0 && (
          <div className="searchResult absolute top-0 left-0">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <Link
                  className="dataItem flex justify-between p-2 mb-1"
                  to={`/${value?.category?.name.toLowerCase()}/${value?.id}`}
                  onClick={clearInput}
                >
                  <div className="flex items-center">
                    <img
                      src={
                        value?.imageUrl
                          ? originalURL + value?.imageUrl
                          : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
                      }
                      alt="#"
                      className="object-cover w-32 h-16 rounded-md select-none"
                    ></img>
                    <span className="ml-2">{value?.name}</span>
                  </div>

                  <span>{formatMoney(value?.price)}??</span>
                  {/* <div className="flex items-center p-4 my-2 bg-white rounded-md shadow-sm">
                    <img
                      src={
                        value?.imageUrl
                          ? originalURL + value?.imageUrl
                          : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
                      }
                      alt="#"
                      className="object-cover w-40 h-44 rounded-md select-none"
                    />
                    <div className="flex items-center justify-between w-full ml-2">
                      <div className="">
                        <p className="mb-1 select-none">
                          T??n s???n ph???m: {value?.name}
                        </p>
                        <p className="mb-1 select-none">
                          Gi?? ti???n: {formatMoney(value?.price)}??
                        </p>
                        <div className="flex items-center">
                          <p className="select-none">
                            S??? l?????ng: {value?.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default Search
