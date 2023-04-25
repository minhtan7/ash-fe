import React from "react";

import FireVideo from "./resourse/HomeResouce/Fire.mp4";
import CardsSound from "./resourse/HomeResouce/cards.mp3";
import SwordSound from "./resourse/HomeResouce/sword.mp3";
import CracklingSound from "./resourse/HomeResouce/Crackling.mp3";
import KeyIcon from "./resourse/HomeResouce/key.svg";
import { Link } from 'react-router-dom'

function Home() {
    const playSound = (soundUrl) => {
        const audio = new Audio(soundUrl);
        audio.play();
    };
    playSound(CracklingSound);

    return (
        <div className="App">
            <h1 className="home_title"> EMPIRES ASCENSION</h1>
            <div className="main-content">
                <div className="bg-container">
                    <video className="bg" autoPlay muted loop>
                        <source src={FireVideo} type="video/mp4" />
                    </video>
                </div>
                <div className="button-container">
                    <Link to='/Play'>
                        <button className="button button1" onClick={() => playSound(SwordSound)}>
                            PLAY
                        </button>
                    </Link>
                    <Link to='/Dashboard'>
                        <button className="button button2" onClick={() => playSound(CardsSound)}>
                            DECKS
                        </button>
                    </Link>
                    <button className="button button3">PACK OPENING</button>
                </div>

            </div>
        </div>
    );
}

export default Home;
