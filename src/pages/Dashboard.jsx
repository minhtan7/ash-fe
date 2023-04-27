import React, { useEffect, useState } from 'react'

import { FaPlus, FaSearch, FaStar } from 'react-icons/fa'
import axios from 'axios'
import api from '../apiService'
import backgroundDash from "./resourse/dashboardResource/dashboardBackground.jpg";

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

function Dashboard() {

  const [cards, setCards] = useState([])
  const [page, setPage] = useState(1)
  const [selectedType, setSelectedType] = useState("")
  const [category, setCategory] = useState("")
  const [star, setStar] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [searchSubmit, setSearchSubmit] = useState(false)

  const [showOpenPack, setShowOpenPack] = useState(false)


  useEffect(() => {
    const fetchCards = async () => {
      let url = `${process.env.REACT_APP_BACKEND_URL}/cards?page=${page}&limit=9`
      if (category) {
        url += `&category=${category}`
      }
      if (star) {
        url += `&star=${star}`
      }
      if (selectedType) {
        url += `&type=${selectedType}`
      }

      console.log(url)
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      setCards(data.data.cards)
    }
    fetchCards()
  }, [page, category, selectedType, star])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fetchCards = async () => {
      let url = `${process.env.REACT_APP_BACKEND_URL}/cards?page=${page}&limit=9`
      if (searchValue) {
        url += `&name=${searchValue}`
      }
      console.log(url)
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      setCards(data.data.cards)
    }
    fetchCards()
  }

  const handleType = type => setSelectedType(type)
  const handleCat = cat => setCategory(cat)
  const handleStar = star => setStar(star)
  const handleChange = e => setSearchValue(e.target.value)
  const handleShowOpenPack = () => setShowOpenPack(!showOpenPack)
  const handleOpenPack = async (faction) => {
    try {
      const res = await api.get(`/cards/packOpening/${faction}`)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  const handleAddToDeck = async (card) => {
    try {
      const res = await api.post("/cards/addToDeck", { cardId: card._id })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    document.body.style.setProperty("--background-image", `url(${backgroundDash})`);
    return () => document.body.style.removeProperty("--background-image");
  }, []);

  return (

    <div id="dashboard" className="container">
      <h1 className='mb-5'>
        <center className='dash_title'> Card/Deck Management </center>
      </h1>
      <div>
        <button
          className='me-2 mb-3 rounded bg-white border border-dark py-2 px-4 hover-shadow'
          onClick={handleShowOpenPack}
        >
          Open pack
        </button>
        {showOpenPack &&
          <div>
            {Object.keys(FACTIONS).map(faction => (
              <button style={{ color: FACTIONS[faction], border: `1px solid ${FACTIONS[faction]}` }}
                className='py-1 px-2  rounded bg-light me-2'
                onClick={() => handleOpenPack(faction)}
              >
                {faction}
              </button>
            ))}
          </div>}
      </div>
      <hr />
      <div className='mb-4'>
        <form onSubmit={handleSubmit} className='row '>
          <div className='col-3 row flex-row me-3'>
            {[1, 2, 3].map(s => (
              <span
                onClick={() => handleStar(s)}
                className='col-3 me-2 d-flex flex-row justify-content-center align-items-center star'
                style={{ color: star === s ? "#fd7e14" : "blue" }}
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
        {cards.length && cards.map((card, index) => (
          <div className="col-4 mb-3" key={index}>
            <div className="card position-relative">
              <img src="https://i.imgur.com/a59yxYv.png" alt={card.name} />
              <div className='w-100 h-100 position-absolute 
                d-flex justify-content-center align-items-center
                addBtn
              '
              >
                <button className="border-0"
                  onClick={() => handleAddToDeck(card)}
                >
                  <FaPlus className='position' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>

  );

}

export default Dashboard