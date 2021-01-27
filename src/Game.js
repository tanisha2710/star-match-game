import './style.css'
import StarsPanel from "./StarsPanel";
import NumberPanel from "./NumberPanel";
import { utils } from "./functionUtils"
import React from 'react';
import {status} from "./NumberStatus";
import PlayAgain from "./PlayAgain";
import {useGameState} from "./customHook";

export default function Game (props) {
  const [stars, numbersAvailable, numbersSelected, timer, setGameState] = useGameState();
    const gameStatus = numbersAvailable.length ===0
    ? "won"
    : timer
    ? "active"
    : "lost"
    const numbersSelectedWrong = utils.sum(numbersSelected) > stars;

    const getStatus = (number) => {
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
                  onClick={setGameState}
                  
                />
              ))}
            </div>
          </div>
          <div className="timer">Time Remaining: {timer}</div>
        </div>
      );
}
