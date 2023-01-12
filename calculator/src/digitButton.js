import { ACTIONS } from "./Calculator"


const DigitButton = ({dispatch, digit}) => {
  return (
    <button onClick={() => dispatch({type:ACTIONS.ADD_DIGITS,payload:{digit}})}>{digit}</button>
  )
}

export default DigitButton;