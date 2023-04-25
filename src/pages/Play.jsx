
import React from "react";
import background from "./resourse/playResouce/background.jpg";

const GameMat = () => {
    React.useEffect(() => {
        document.body.style.setProperty("--background-image", `url(${background})`);
        return () => document.body.style.removeProperty("--background-image");
    }, []);
    return (
        <div className="game-mat-wrapper">
            <div className="game-mat">
                <Title />
                <div className="resource-counter">0</div>
                <div className="player">
                    <PlayerSide />
                    <CardRow />
                    <PlayerSide title="Graveyard" />
                </div>
                <div className="player">
                    <PlayerSide />
                    <CardRow />
                    <PlayerSide title="Graveyard" />
                </div>
                <div className="counter-wrapper">
                    <div className="resource-counter">0</div>
                </div>
            </div>
        </div>
    );
};

const Title = () => (
    <h1
        style={{
            color: "white",
            position: "absolute",
            top: 30,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "50px"
        }}
    >
        Empires Accesion
    </h1>
);

const PlayerSide = ({ title = "Deck" }) => (
    <div className="deck-graveyard">
        <div
            className="card-slot"
            style={{ backgroundColor: "rgba(85, 85, 85, 0.7)" }}
        >
            <p style={{ color: "white", fontSize: "14px" }}>{title}</p>
        </div>
    </div>
);

const CardRow = () => (
    <div className="row">
        {[...Array(6)].map((_, index) => (
            <div className="card-slot" key={index} />
        ))}
    </div>
);

export default GameMat;
