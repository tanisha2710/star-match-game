
const colors = {
  1: 'lightgreen',
  2: 'lightgray',
  3: 'deepskyblue',
  4: 'lightcoral',
};

 const NumberPanel = props => 
   <button
      className="number"
      style={{backgroundColor: colors[props.status]}}
      onClick={() => props.onClick(props.number, props.status)}
    >
      {props.number}
    </button>

  export default NumberPanel;