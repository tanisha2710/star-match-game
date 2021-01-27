import Game from "./Game";
import React from 'react';

const StartMatch = () => {
    const[id, setId] = React.useState(0);
    return <Game key={id} startNewGame ={() => setId(id+1)} />
}

export default StartMatch;