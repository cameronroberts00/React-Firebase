import { useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import { useEffect } from "react";

const cardImages = [
  { src: "/img/chewie-1.png", matched: false },
  { src: "/img/chewie-2.png", matched: false },
  { src: "/img/monty-1.png", matched: false },
  { src: "/img/tess-1.png", matched: false },
  { src: "/img/trixie-1.png", matched: false },
  { src: "/img/trixie-2.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    //copy the array twice
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //sort fires a func for each pair of items in the array
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = (card) => {
    //card chosen as arg
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 cards
  //tutorials solution
  useEffect(() => {
    //fires for each state ont first load then ont refreshes
    // console.log("fired");
    if (choiceOne && choiceTwo) {
      //only run if we have both vals. ie. not on startup
      setDisabled(true); //disable cards while we evaluate
      if (choiceOne.src === choiceTwo.src) {
        console.log("Matched");
        setCards((prevCards) => {
          //add the matched property
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              //return new card array
              return { ...card, matched: true }; //set true to matched cards and spread them into a new array
            } else {
              return card; //if it int just chuck em out as they are
            }
          });
        });
        resetTurn();
      } else {
        console.log("No Matchy");
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //my solution: wrong
  //Reasons, didnt check both vals: choice 1 n 2
  //doesnt reset turns
  // useEffect(() => {
  //   if(choiceTwo!=null){
  //   if (choiceOne.src ==choiceTwo.src) {
  //     console.log("Matched!");
  //   }
  // }
  // }, [choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start a game automatically
  //bcoz useEffect is called on startup
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Dog Swap</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          /> //if the card we have is the one they chose, flip it, or if its already matched
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
