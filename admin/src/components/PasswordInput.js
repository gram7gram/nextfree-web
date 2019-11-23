import React, {useState} from 'react'

const Password = props => {

  const [inputType, setInputType] = useState('password')

  const toggleType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  return <div className="input-group">
    <input type={inputType}
           className="form-control"
           placeholder="*******"
           {...props}/>
    <div className={"input-group-append" + (!props.value ? ' d-none' : '')}>
      <i className={"input-group-text fa " + (inputType === 'password' ? "fa-eye" : "fa-eye-slash")}
         onClick={toggleType}/>
    </div>
  </div>

}

export default Password