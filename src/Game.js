import './style.css'
import StarsPanel from "./StarsPanel";
import NumberPanel from "./NumberPanel";
import { utils } from "./functionUtils"
import React from 'react';
import {status} from "./NumberStatus";
import PlayAgain from "./PlayAgain";

export default function Game (props) {
    const [stars, setStars] = React.useState(utils.random(1, 5));
    const [numbersAvailable, setNumbersAvailable] = React.useState(utils.range(1,9));
    const [numbersSelected, setNumbersSelected] = React.useState([]);
    const [timer, setTimer] = React.useState(20);

    const gameStatus = numbersAvailable.length ===0
    ? "won"
    : timer
    ? "active"
    : "lost"


    React.useEffect(() =>{
      if (timer > 0 && numbersAvailable.length > 0) {
        const timerId = setTimeout(() => {
          setTimer(timer - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    },[timer])

    const onNumberClick = (number, NumberStatus) => {
      if(NumberStatus === status.USED){
        return
      }
      const newNumbersSelected = 
      NumberStatus === status.AVAILABLE
       ? numbersSelected.concat(number) 
       : numbersSelected.filter(num => num!== number);


       if(utils.sum(newNumbersSelected) === stars){
         const newNumbersAvailable = numbersAvailable.filter(num => !newNumbersSelected.includes(num));
         setNumbersAvailable(newNumbersAvailable);
         setNumbersSelected([]);
         setStars(utils.randomSumIn(newNumbersAvailable, 9));
       }else{
        setNumbersSelected(newNumbersSelected);
       }


    }
    const numbersSelectedWrong = utils.sum(numbersSelected) > stars;

    const getStatus = (number) => {
      console.log("Here ", numbersAvailable);
      if(!numbersAvailable.includes(number)){
        return status.USED;
      }
      else if(numbersSelected.includes(number)){
       return  numbersSelectedWrong ? status.WRONG : status.SELECTED
      }
      return status.AVAILABLE;
    }

    return (
        <div className="game">
          <div className="help">
            Pick 1 or more numbers that sum to the number of stars
          </div>
          <div className="body">
            <div className="left">
            {gameStatus !== 'active' ? (
          	<PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
          	<StarsPanel count={stars} />
          )}
            </div>
            <div className="right">
              {utils.range(1, 9).map(number => (
                <NumberPanel
                  key={number}
                  number={number}
                  status={getStatus(number)}
                  onClick={onNumberClick}
                  
                />
              ))}
            </div>
          </div>
          <div className="timer">Time Remaining: {timer}</div>
        </div>
      );
}
