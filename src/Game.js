import './style.css'
import StarsPanel from "./StarsPanel";
import NumberPanel from "./NumberPanel";
import { utils } from "./functionUtils"
import React from 'react';
import {status} from "./NumberStatus";

export default function Game () {
    const [stars, setStars] = React.useState(utils.random(1, 5));
    const [numbersAvailable, setNumbersAvailable] = React.useState(utils.range(1,9));
    const [numbersSelected, setNumbersSelected] = React.useState([]);

    const onNumberClick = (number, NumberStatus) => {
      //console.log("came here");
      if(NumberStatus === status.USED){
        return
      }
      //console.log("came till here");
      const newNumbersSelected = 
      NumberStatus === status.AVAILABLE
       ? numbersSelected.concat(number) 
       : numbersSelected.filter(num => num!== number);
      //console.log("new numbers", newNumbersSelected); 

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
