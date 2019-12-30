import React from 'react';
import {Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';
import i18n from "../../../i18n";
import Avatar from "../../../components/Avatar";

const Card = ({model}) => {

  let name = model.user.email
  if (model.user.lastName || model.user.firstName) {
    name = `${model.user.lastName || ''} ${model.user.firstName || ''}`.trim()
  }

  return <div className="col-6 col-md-3 col-lg-2">
    <Link to={Pages.OWNER_EDIT.replace(':id', model._id)}
          className="card shadow-sm mb-1 mr-1 staff-card">
      <div className="card-image">
        <Avatar src={model.user.avatar}/>
      </div>
      <div className="card-footer p-1">
        <h5 className="m-0 text-truncate">{name}</h5>

        {model.isEnabled
          ? <div className="badge badge-success">
            <i className="fa fa-check"/>&nbsp;{i18n.t('owner.enabled_badge')}
          </div>
          : <div className="badge badge-danger">
            <i className="fa fa-times"/>&nbsp;{i18n.t('owner.disabled_badge')}
          </div>}
      </div>
    </Link>
  </div>
}

export default Card
