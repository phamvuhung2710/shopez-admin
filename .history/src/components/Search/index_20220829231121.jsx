import './style.css'
import { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

function Search({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('')

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
      <div className="search mt-10">
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
          <div className="searchResult">
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
