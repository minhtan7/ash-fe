import { FaPlus } from "react-icons/fa"


const GameCard = ({ type, card, index, handleAddToDeck, handleRemove }) => {
    return (
        <div className="col-4 mb-3" key={index}>
            <div className="card position-relative">
                <img src={`http://localhost:3000/images/${card.imageUrl}`} alt={card.name} />
                <div className='w-100 h-100 position-absolute 
                d-flex justify-content-center align-items-center
                addBtn
              '
                >
                    {type === "remove" ?
                        <button className="border-0"
                            onClick={() => handleRemove(card)}
                        >
                            <FaPlus className='position' />
                        </button> :
                        <button className="border-0"
                            onClick={() => handleAddToDeck(card)}
                        >
                            <FaPlus className='position' />
                        </button>}
                </div>
            </div>
        </div>
    )
}

export default GameCard