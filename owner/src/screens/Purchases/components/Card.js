import React from 'react';

const Card = ({model}) => {

  return <tr>
    <td>{moment(model.createdAt).format('HH:mm DD.MM.YY')}</td>
    <td>{model.organization.name}</td>
    <td>{model.isBonus ? "+" : ""}</td>
  </tr>
}

export default Card
