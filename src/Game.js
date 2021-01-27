import './style.css'
import StarsPanel from "./StarsPanel";
import NumberPanel from "./NumberPanel";
import { utils } from "./functionUtils"
import React from 'react';
import {status} from "./NumberStatus";

export default function Game () {
    const [stars, setStars] = React.useState(utils.random(1, 5));
    const [numbersAvailable, setNumbersAvailable] = React.useState([1,3,5,6]);
    const [numbersSelected, setNumbersSelected] = React.useState([1,3]);
    const onNumberClick = (number) =>{
      // if(isNumberClickedUsed(number, numbersAvailable))
      console.log("hii");
    }
    const numbersSelectedWrong = utils.sum(numbersSelected) > stars;

    const getStatus = (number) =>{
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
                  <StarsPanel count={stars} />
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
          <div className="timer">Time Remaining: 10</div>
        </div>
      );
}
