import './style.css'
import { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

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
          setDataProduct(
            res?.data?.data?.content?.filter(
              (item) => item?.category?.name === 'Women'
            )
          )
        })
        .catch((error) => console.log(error))
    }

    fetchData()
  }, [])


  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter = data.filter((value) => {
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
                <a
                  className="dataItem"
                  href={value.imageURL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>123{value.name}</p>
                </a>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default Search
