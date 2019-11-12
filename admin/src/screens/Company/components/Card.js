import React from 'react';
import {Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';
import avatar from '../../../assets/img/company-placeholder.png';

const Card = ({model}) => {

  return <div className="col-3 col-lg-2">
    <Link to={Pages.COMPANY_EDIT.replace(':id', model._id)}
          className="card shadow-sm mb-1 mr-1 company-card">
      <div className="card-image">
        <img src={avatar} alt="" className="img-fluid "/>
      </div>
      <div className="card-footer p-1">
        <p className="m-0 text-truncate">{model.name}</p>
      </div>
    </Link>
  </div>
}

export default Card
