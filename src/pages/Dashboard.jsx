import React from 'react'
import './Dashboard.css'
import cardData from './cardData.json'



function Dashboard() {
  return (

   
    
      <div className="container">
        <div className="row">
          <h1>
            <center> Card/Deck Management </center>
          </h1>
        </div>
        <div className="row mb-3">
          {cardData.slice(0, 3).map((card, index) => (
            <div className="col-sm-4" key={index}>
              <div className="card">
                <img src={card.image} alt={card.name} />
              </div>
            </div>
          ))}
        </div>
        <div className="row mb-3">
          {cardData.slice(3, 6).map((card, index) => (
            <div className="col-sm-4" key={index}>
              <div className="card">
                <img src={card.image} alt={card.name} />
              </div>
            </div>
          ))}
        </div>
        <div className="row mb-3">
          {cardData.slice(6, 9).map((card, index) => (
            <div className="col-sm-4" key={index}>
              <div className="card">
                <img src={card.image} alt={card.name} />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    );
  
}

export default Dashboard