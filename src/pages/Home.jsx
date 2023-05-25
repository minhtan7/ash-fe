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
        // audio.play();
    };
    playSound(CracklingSound);

    return (
        <div className="container">
            <h1 className="home_title"> EMPIRES ASCENSION</h1>
            <div className="main-content">
                <div className="bg-container">
                    <video className="bg" autoPlay muted loop>
                        <source src={FireVideo} type="video/mp4" />
                    </video>
                </div>
                <div className="button-container">
                    <Link to='/play'>
                        <button className="button button1" onClick={() => playSound(SwordSound)}>
                            PLAY
                        </button>
                    </Link>
                    <Link to='/dashboard'>
                        <button className="button button2" onClick={() => playSound(CardsSound)}>
                            DECKS
                        </button>
                    </Link>
                    <Link to='/collection'>

                    <button className="button button3">COLLECTIONS</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Home;
