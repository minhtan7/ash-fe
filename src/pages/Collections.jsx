import React, { useEffect, useState } from 'react'

import cardData from './cardData.json'
import { FaPlus, FaSearch, FaStar } from 'react-icons/fa'
import axios from 'axios'
import api from '../apiService'
import InfiniteScroll from 'react-infinite-scroll-component'
import GameCard from '../component/GameCard'

// const CATEGORIES = ["soldier", "missle", "defense", "resource", "leader"]
const TYPES = {
  Depleter: ["Soldier", "Missle"],
  Generator: ["Defense", "Resource"],
  General: ["Leader"]
}

const FACTIONS = {
  roman: "red",
  viking: "black",
  spartan: "blue",
  egyptian: "yellow",
  threekd: "green"
}

function Collections() {
  const [cards, setCards] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [selectedType, setSelectedType] = useState("")
  const [category, setCategory] = useState("")
  const [star, setStar] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [searchSubmit, setSearchSubmit] = useState(false)

  const [showOpenPack, setShowOpenPack] = useState(false)


  useEffect(() => {
    const fetchCards = async () => {
      let url = `${process.env.REACT_APP_BACKEND_URL}/cards?page=${page}&limit=9`
      // if (category) {
      //   url += `&category=${category}`
      // }
      // if (star) {
      //   url += `&star=${star}`
      // }
      // if (selectedType) {
      //   url += `&type=${selectedType}`
      // }
      if (searchValue) {
        url += `&name=${searchValue}`
      } else {
        if (category) {
          url += `&category=${category}`
        }
        if (selectedType) {
          url += `&type=${selectedType}`
        }
      }
      if (star) {
        url += `&star=${star}`
      }
      const res = await api.get(url)
      setCards([...cards, ...res.data.cards])
      setTotalPage(res.data.totalPages)
    }
    fetchCards()
  }, [page])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fetchCards = async () => {
      let url = `${process.env.REACT_APP_BACKEND_URL}/cards?page=${page}&limit=9`
     if (searchValue) {
        url += `&name=${searchValue}`
      } else {
        if (category) {
          url += `&category=${category}`
        }
        if (selectedType) {
          url += `&type=${selectedType}`
        }
      }
      if (star) {
        url += `&star=${star}`
      }
    const res = await api(url)
      setCards(res.data.cards)
      setTotalPage(res.data.totalPages)
      setPage(1)
    }
    fetchCards()
  }

  const handleType = type => setSelectedType(type)
  const handleCat = cat => setCategory(cat)
  const handleStar = star => setStar(star)
  const handleChange = e => setSearchValue(e.target.value)
  
 
  const loadFunc = () => {
    if (page < totalPage) {
      setPage(page + 1)
    }
  }
  console.log(cards)
  return (
    <div id="dashboard" className="container">
      <h1 className='mb-2'>
        <center> Collections </center>
      </h1>
      <hr className='mb-5' />
      <div className='mb-4'>
        <form onSubmit={handleSubmit} className='row '>
          <div className='col-3 row flex-row me-3'>
            {[1, 2, 3].map(s => (
              <span
                onClick={() => handleStar(s)}
                className='col-3 me-2 d-flex flex-row justify-content-center align-items-center star'
                style={{ color: star === s ? "#fd7e14" : "black" }}
              >
                {s} <FaStar className='ms-1' />
              </span>
            ))}
            <div className='position-relative' style={{ height: "fit-content" }}>
              <input placeholder='search'
                className='py-2 px-3'
                onChange={handleChange}
              />
              <FaSearch
                onClick={() => setSearchSubmit(!searchSubmit)}
                className='position-absolute top-50 end-0 translate-middle' />
            </div>

          </div>
          <div className='col-8 text-start'>
            <div className='row mb-3'>
              <span className='m-auto col-4'>Choose type:</span>
              <div className='col-8'>
                {Object.keys(TYPES).map(type => (
                  <button
                    onClick={() => handleType(type)}
                    className='me-2 rounded bg-white border border-dark py-2 px-4 hover-shadow'

                  >{type}</button>
                ))}
              </div>
            </div>
            {selectedType && <div>
              <div className='row'>
                <span className='m-auto col-4'>Choose category:</span>
                <div className='col-8'>
                  {TYPES[selectedType].map(cat => (
                    <button
                      onClick={() => handleCat(cat)}
                      className='me-2 rounded bg-white border border-dark py-2 px-4 hover-shadow'

                    >{cat}</button>
                  ))}
                </div>
              </div>
            </div>}
          </div>
        </form>
      </div>
      <div className="row mb-3">
        <InfiniteScroll
        dataLength={cards.length} 
        next={loadFunc}
        hasMore={page < totalPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }

      >
        <div className="row mb-3">
          {cards.length && cards.map((card, index) => (
            <GameCard card={card} index={index}  />
          ))}

        </div>
      </InfiniteScroll>
      </div>

    </div>
  );

}

export default Collections