import React, { useContext, useEffect, useState } from 'react'
// import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-bootstrap/Modal';

import { FaPlus, FaSearch, FaStar } from 'react-icons/fa'
import axios from 'axios'
import api from '../apiService'

import GameCard from '../component/GameCard'
import backgroundDash from "./resourse/dashboardResource/dashboardBackground.jpg";
import { authContext } from '../context/authContext';
import { toast } from 'react-toastify';

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
  const { user } = useContext(authContext)
  const [cards, setCards] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [selectedType, setSelectedType] = useState("Depleter")
  const [category, setCategory] = useState("Soldier")
  const [star, setStar] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [searchSubmit, setSearchSubmit] = useState(false)

  const [showOpenPack, setShowOpenPack] = useState(false)

  const [show, setShow] = useState(false);
  const [showDeck, setShowDeck] = useState(false)

  const [cardsInDeck, setCardsInDeck] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const fetchCards = async () => {
      let url = `${process.env.REACT_APP_BACKEND_URL}/cards/mycard?page=${page}&limit=3`
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
    console.log(user)
    setCardsInDeck(user.deck)
  }, [page])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fetchCards = async () => {
      let url = `${process.env.REACT_APP_BACKEND_URL}/cards/mycard?page=${page}&limit=3`
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
  const handleShowOpenPack = () => setShowOpenPack(!showOpenPack)
  const handleOpenPack = async (faction) => {
    try {
      const res = await api.get(`/cards/packOpening/${faction}`)
      setShow(true)
    } catch (error) {
      console.log(error)
    }
  }
  const handleAddToDeck = async (card) => {
    try {
      const res = await api.post("/cards/addToDeck", { cardId: card._id })
      toast.success(`add card ${card.name} to your deck`)
      setCardsInDeck(res.data.deck)
    } catch (error) {
      console.log(error)
    }
  }

  const loadFunc = () => {
    if (page < totalPage) {
      setPage(page + 1)
    }
  }
  console.log(user)
  const handleRemove = (card)=>{
    setCardsInDeck(cardsInDeck.filter(c=> c._id !=card._id))

  }
  return (

    <div id="dashboard" className="container">
      <h1 className='mb-5'>
        <center className='dash_title'> Card/Deck Management ({user.collections.length})</center>
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
              <button
                onClick={() => handleStar(s)}
                className='col-3 me-2 d-flex flex-row justify-content-center align-items-center star
                rounded-circle border
                '
                style={{ color: star === s ? "#fd7e14" : "blue", height: "3rem", width: "3rem" }}
                type="submit"
              >
                {s} <FaStar className='ms-1' />
              </button>
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
                    type='submit'
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
                      type='submit'
                    >{cat}</button>
                  ))}
                </div>
              </div>
            </div>}
          </div>
        </form>
      </div>
      {/* <div className="row mb-3">
        {cards.length && cards.map((card, index) => (
          <GameCard card={card} index={index} handleAddToDeck={handleAddToDeck} />
        ))}
      </div> */}

      <InfiniteScroll
        dataLength={cards.length} //This is important field to render the next data
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
            <GameCard card={card.cards} index={index} handleAddToDeck={handleAddToDeck} />
          ))}

        </div>
      </InfiniteScroll>

      <button
        className='btn-deck position-fixed top-50 border rounded-circle '
        style={{ height: '5rem', width: "5rem" , right :"5rem"}}
        onClick={() => setShowDeck(true)}
      >
        Deck!
      </button>

      <Modal size='xl' show={showDeck} onHide={() => setShowDeck(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row mb-3">
              {cardsInDeck.length && cardsInDeck.map((card, index) => (
                <GameCard card={card} type="remove" index={index} handleRemove={handleRemove} />
              ))}
            </div>
          </div>


        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pack Opening</Modal.Title>
        </Modal.Header>
        <Modal.Body>Congratulation! You get 4 new cards!</Modal.Body>
      </Modal>
    </div>

  );

}

export default Dashboard