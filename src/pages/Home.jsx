
import "./resourse/HomeResouce/styles.css"; //styles.css
import FireVideo from "./resourse/HomeResouce/Fire.mp4";
import CardsSound from "./resourse/HomeResouce/cards.mp3";
import SwordSound from "./resourse/HomeResouce/sword.mp3";
import CracklingSound from "./resourse/HomeResouce/Crackling.mp3";
import KeyIcon from "./resourse/HomeResouce/key.svg";

function Home() {
    const playSound = (soundUrl) => {
        const audio = new Audio(soundUrl);
        audio.play();
    };
    playSound(CracklingSound);

    return (
        <div className="App">
            <h1>EMPIRES ASCENSION</h1>
            <div className="bg-container">
                <video className="bg" autoPlay muted loop>
                    <source src={FireVideo} type="video/mp4" />
                </video>
            </div>
            <button className="button button1" onClick={() => playSound(SwordSound)}>
                PLAY
            </button>
            <button className="button button2" onClick={() => playSound(CardsSound)}>
                DECKS
            </button>
            <button className="button button3">SETTINGS</button>
            <button className="button button4">
                <img src={KeyIcon} alt="Login" /> LOGIN
            </button>
        </div>
    );
}

export default Home