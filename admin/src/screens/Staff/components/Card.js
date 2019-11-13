import React from 'react';
import {Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';
import avatar from '../../../assets/img/staff-placeholder.png';

const Card = ({model}) => {

  let name = model.user.email
  if (model.user.lastName  || model.user.firstName) {
    name = (model.user.lastName  + ' ' + model.user.firstName).trim()
  }

  return <div className="col-3 col-lg-2">
    <Link to={Pages.STAFF_EDIT.replace(':id', model._id)}
          className="card shadow-sm mb-1 mr-1 staff-card">
      <div className="card-image">
        <img src={avatar} alt="" className="img-fluid"/>
      </div>
      <div className="card-footer p-1">
        <h5 className="m-0 text-truncate">{name}</h5>
        <p className="m-0 text-truncate">{model.position}</p>
      </div>
    </Link>
  </div>
}

export default Card