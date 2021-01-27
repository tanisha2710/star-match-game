import './style.css'
import StarsPanel from "./StarsPanel";
import NumberPanel from "./NumberPanel";
import { utils } from "./functionUtils"

export default function Game () {
    return (
        <div className="game">
          <div className="help">
            Pick 1 or more numbers that sum to the number of stars
          </div>
          <div className="body">
            <div className="left">
                  <StarsPanel count={utils.random(1,9)} />
            </div>
            <div className="right">
              {utils.range(1, 9).map(number => (
                <NumberPanel
                  key={number}
                  number={number}
                  //onClick={onNumberClick}
                />
              ))}
            </div>
          </div>
          <div className="timer">Time Remaining: 10</div>
        </div>
      );
}