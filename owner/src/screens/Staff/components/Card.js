import React from 'react';
import {Link} from 'react-router-dom';
import i18n from '../../../i18n';
import * as Pages from '../../../router/Pages';
import Avatar from '../../../components/Avatar';

const Card = ({model}) => {

  let name = model.user.email
  if (model.user.lastName || model.user.firstName) {
    name = `${model.user.lastName || ''} ${model.user.firstName || ''}`.trim()
  }

  return <div className="col-6 col-md-3 col-lg-2">
    <Link to={Pages.STAFF_EDIT.replace(':id', model._id)}
          className="card mb-1 mr-1 bg-dark-gray staff-card">
      <div className="card-image">
        <Avatar src={model.user.avatar}/>
      </div>
      <div className="card-footer p-1">
        <h5 className="m-0 text-truncate">{name}</h5>
        <p className="m-0 text-truncate">{model.position || '-'}</p>

        {model.isEnabled
          ? <span className="badge badge-success">
            <i className="fa fa-check"/>&nbsp;{i18n.t('staff.enabled_badge')}
        </span>
          : <span className="badge badge-danger">
            <i className="fa fa-times"/>&nbsp;{i18n.t('staff.disabled_badge')}
          </span>}
      </div>
    </Link>
  </div>
}

export default Card
