import React from 'react'
import Props from 'prop-types'

const BonusCondition = ({title, content, selected, onClick}) => {
  return <div className={"card condition-card bg-secondary text-white" + (selected ? " border-success" : "")} onClick={onClick}>

    <div className="card-body">
      <div className="row">
        <div className="col">
          <h4 className="card-title">{title}</h4>
        </div>
        <div className="col-auto">
          <input type="checkbox" checked={selected} onChange={onClick}/>
        </div>
      </div>
      <p className="card-text">{content}</p>
    </div>

  </div>
}

BonusCondition.defaultProps = {
  selected: false
}

BonusCondition.propTypes = {
  title: Props.string.isRequired,
  content: Props.string.isRequired,
  selected: Props.bool,
  onClick: Props.func.isRequired,
}

export default BonusCondition