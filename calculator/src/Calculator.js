import { useReducer } from "react";
import "./styles.css";
import DigitButton from "./digitButton";
import OperationButton from "./operationButton";
import { formatOperand } from "./helpers/formatOperand";
import { evaluate } from "./helpers/evaluate";

export const ACTIONS = {
  ADD_DIGITS:"add-digits",
  CHOOSE_OPERATION:"choose-operation",
  CLEAR:"clear",
  DELETE_DIGITS:"delete-digits",
  EVALUATE:"evaluate"
}

const reducer = (state, {type, payload}) =>{
  switch(type){
    case ACTIONS.ADD_DIGITS:

      if(state.overwrite){
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite:false
        } 
      }
      if(payload.digit === "0" && state.currentOperand ==="0"){
        return state
      }
      if(payload.digit === "." && state.currentOperand.includes(".")){
        return state
      }
      return {
        ...state,
        currentOperand:`${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      }

      if(state.currentOperand == null){
        return{
          ...state,
          operation:payload.operation
        }
      }

      if(state.previousOperand == null){
        return{
          ...state,
          operation: payload.operation,
          previousOperand:state.currentOperand,
          currentOperand: null
        }
      }

      return{
        ...state,
        operation:payload.operation,
        previousOperand: evaluate(state),
        currentOperand:null
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DELETE_DIGITS:

      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currentOperand:null
        }
      }

      if(state.currentOperand == null){
        return {}
      }

      if(state.currentOperand.length === 1){
        return{
          ...state,
          currentOperand:null
        }
      }

      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }

    case ACTIONS.EVALUATE:

      if(state.operation == null || state.previousOperand == null ||state.currentOperand == null){
        return state
      }

      return{
        ...state,
        overwrite: true,
        operation:null,
        previousOperand:null,
        currentOperand: evaluate(state),
      }
  }

}


const Calculator = () => {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{formatOperand(previousOperand)} {operation}</div>
        <div className='current-operand'>{formatOperand(currentOperand)} </div>
      </div>
      <button className="span-two" onClick={() =>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type:ACTIONS.DELETE_DIGITS})}>DEL</button>
      <OperationButton operation ="÷" dispatch={dispatch} />
      <DigitButton digit ="1" dispatch={dispatch} />
      <DigitButton digit ="2" dispatch={dispatch} />
      <DigitButton digit ="3" dispatch={dispatch} />
      <OperationButton operation ="*" dispatch={dispatch} />
      <DigitButton digit ="4" dispatch={dispatch} />
      <DigitButton digit ="5" dispatch={dispatch} />
      <DigitButton digit ="6" dispatch={dispatch} />
      <OperationButton operation ="+" dispatch={dispatch} />
      <DigitButton digit ="7" dispatch={dispatch} />
      <DigitButton digit ="8" dispatch={dispatch} />
      <DigitButton digit ="9" dispatch={dispatch} />
      <OperationButton operation ="-" dispatch={dispatch} />
      <DigitButton digit ="." dispatch={dispatch} />
      <DigitButton digit ="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  )
}

export default Calculator;