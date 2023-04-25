

import FireVideo from "./resourse/Fire.mp4";//../Fire.mp4
import CardsSound from "./resourse/cards.mp3";
import SwordSound from "./resourse/sword.mp3";
//import CracklingSound from "../Crackling.mp3";
import KeyIcon from "./resourse/key.svg";
import { Link } from 'react-router-dom'

const Home = () => {
  const playSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };
  //playSound(CracklingSound);

  return (
    <div className="App">
      <h1 className="title">EMPIRES ASCENSION</h1>
      <div className="bg-container">
        <video className="bg" autoPlay muted loop>
          <source src={FireVideo} type="video/mp4" />
        </video>
      </div>
      <Link to='/play'>
        <button className="button button1" onClick={() => playSound(SwordSound)}>
          PLAY
        </button>
      </Link>
      <Link to='/Dashboard'>
        <button className="button button2" onClick={() =>
          playSound(CardsSound)

        }>
          DECKS
        </button>
      </Link>
      <button className="button button3">PACK OPENING</button>
      <Link to='/Login'>
        <button className="button button4">
          <img src={KeyIcon} alt="Login" /> LOGIN
        </button>
      </Link>
    </div>
  )
}

export default Home