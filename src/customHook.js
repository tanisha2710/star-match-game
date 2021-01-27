import { utils } from "./functionUtils"
import React from 'react';
import {status} from "./NumberStatus";

export const useGameState = timeLimit => {
    const [stars, setStars] = React.useState(utils.random(1, 5));
    const [numbersAvailable, setNumbersAvailable] = React.useState(utils.range(1,9));
    const [numbersSelected, setNumbersSelected] = React.useState([]);
    const [timer, setTimer] = React.useState(20);

    React.useEffect(() =>{
      if (timer > 0 && numbersAvailable.length > 0) {
        const timerId = setTimeout(() => {
          setTimer(timer - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    },[timer])

    const setGameState = (number, NumberStatus) => {
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
    return[stars, numbersAvailable, numbersSelected, timer, setGameState]
  };