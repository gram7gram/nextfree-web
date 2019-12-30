import React from 'react';
import {Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';
import avatar from '../../../assets/img/store-placeholder.png';

const Card = ({model}) => {

  return <div className="col-6 col-md-3 col-lg-2">
    <Link to={Pages.STORE_EDIT.replace(':id', model._id)}
          className="card shadow-sm mb-1 mr-1 store-card">
      <div className="card-image">
        <img src={avatar} alt="" className="img-fluid p-4"/>
      </div>
      <div className="card-footer p-1">
        <h6 className="m-0 text-truncate">{model.city || '-'}</h6>
        <p className="m-0 text-truncate">{model.address || '-'}</p>
      </div>
    </Link>
  </div>
}

export default Card
