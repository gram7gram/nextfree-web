import React from 'react'

const Errors = ({errors}) => {

  if (errors.length === 0) {
    return null
  }

  return <div className="alert alert-danger">
    {errors.map((e, i) => <p key={i} className="mb-0">{e}</p>)}
  </div>
}

export default Errors