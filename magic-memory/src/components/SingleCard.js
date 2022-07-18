import React from "react";
import "./SingleCard.css";
export default function SingleCard({ card,handleChoice, flipped, disabled }) {

const handleClick=()=>{
    if(!disabled){
handleChoice(card)//clicked card, send it back
    }
}

  return (

    <div className="card">
      <div className={flipped?"flipped":""}>
        <img className="front" src={card.src} alt="" />
        <img
          className="back"
          src="/img/cover.png"
          alt=""
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
