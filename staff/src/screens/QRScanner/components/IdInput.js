import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import FetchUser from "../actions/FetchUser";
import {MODEL_CHANGED} from "../actions";

export const ID_LENGTH = 5

const IdInput = ({onSubmit}) => {

  const dispatch = useDispatch()
  const model = useSelector(state => state.QRScanner.model)

  const {inputValue0, inputValue1, inputValue2, inputValue3, inputValue4} = useSelector(state => ({
    inputValue0: state.QRScanner.model.cell0,
    inputValue1: state.QRScanner.model.cell1,
    inputValue2: state.QRScanner.model.cell2,
    inputValue3: state.QRScanner.model.cell3,
    inputValue4: state.QRScanner.model.cell4,
  }))

  const cell0 = React.useRef()
  const cell1 = React.useRef()
  const cell2 = React.useRef()
  const cell3 = React.useRef()
  const cell4 = React.useRef()

  const setInputValue = (cell, value) => {
    dispatch({
      type: MODEL_CHANGED,
      payload: {
        [cell]: value
      }
    })
  }

  const onChangeCell0 = e => {
    setInputValue('cell0', e.target.value.replace(/[^0-9]/g, ''))
  }

  const onChangeCell1 = e => {
    setInputValue('cell1', e.target.value.replace(/[^0-9]/g, ''))
  }

  const onChangeCell2 = e => {
    setInputValue('cell2', e.target.value.replace(/[^0-9]/g, ''))
  }

  const onChangeCell3 = e => {
    setInputValue('cell3', e.target.value.replace(/[^0-9]/g, ''))
  }

  const onChangeCell4 = e => {
    setInputValue('cell4', e.target.value.replace(/[^0-9]/g, ''))
  }

  const submit = () => {

    const value = [inputValue0, inputValue1, inputValue2, inputValue3, inputValue4].join('').trim()

    if (value.length === ID_LENGTH) {
      dispatch(FetchUser(value))
    } else if (model.displayId) {
      dispatch({
        type: MODEL_CHANGED,
        payload: {
          displayId: null,
          userId: null,
          match: null,
        }
      })
    }
  }

  React.useEffect(submit, [inputValue0, inputValue1, inputValue2, inputValue3, inputValue4])

  React.useEffect(() => {
    if (inputValue0) {
      cell1.current.focus()
    } else {
      cell0.current.focus()
    }
  }, [inputValue0])

  React.useEffect(() => {
    if (inputValue1) {
      cell2.current.focus()
    }
  }, [inputValue1])

  React.useEffect(() => {
    if (inputValue2) {
      cell3.current.focus()
    }
  }, [inputValue2])

  React.useEffect(() => {
    if (inputValue3) {
      cell4.current.focus()
    }
  }, [inputValue3])

  const submitIfEnter = e => {
    if (e.keyCode === 13) {
      onSubmit()
    }
  }

  return <div className="row justify-content-center id-inputs no-gutters">

    <div className="col col-md-2">
      <input type="number"
             ref={cell0}
             className="form-control text-center p-1 id-cell"
             onChange={onChangeCell0}
             onKeyDown={submitIfEnter}
             value={inputValue0}/>
    </div>
    <div className="col col-md-2">
      <input type="number"
             ref={cell1}
             className="form-control text-center p-1 id-cell"
             onChange={onChangeCell1}
             onKeyDown={submitIfEnter}
             value={inputValue1}/>
    </div>
    <div className="col col-md-2">
      <input type="number"
             ref={cell2}
             className="form-control text-center p-1 id-cell"
             onChange={onChangeCell2}
             onKeyDown={submitIfEnter}
             value={inputValue2}/>
    </div>
    <div className="col col-md-2">
      <input type="number"
             ref={cell3}
             className="form-control text-center p-1 id-cell"
             onChange={onChangeCell3}
             onKeyDown={submitIfEnter}
             value={inputValue3}/>
    </div>
    <div className="col col-md-2">
      <input type="number"
             ref={cell4}
             className="form-control text-center p-1 id-cell"
             onChange={onChangeCell4}
             onKeyDown={submitIfEnter}
             value={inputValue4}/>
    </div>

  </div>
}

export default IdInput