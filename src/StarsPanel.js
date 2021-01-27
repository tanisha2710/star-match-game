import { utils } from "./functionUtils"
const StarsPanel = props =>
    <>
      {utils.range(1, props.count).map(starId => (
        <div key={starId} className="star" />
      ))}
    </>
  
  export default StarsPanel;