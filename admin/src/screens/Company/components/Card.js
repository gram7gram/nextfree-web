import React from 'react';
import {Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';
import i18n from "../../../i18n";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import Logotype from "../../../components/Logotype";

const Card = ({model, owners}) => {

  const owner = owners.find(owner => owner._id === model.ownerId)

  let name = "???"
  if (owner) {
    name = owner.user.email
    if (owner.user.lastName || owner.user.firstName) {
      name = `${owner.user.lastName || ''} ${owner.user.firstName || ''}`.trim()
    }
  }

  return <div className="col-6 col-md-3 col-lg-2">
    <Link to={Pages.COMPANY_EDIT.replace(':id', model._id)}
          className="card shadow-sm mb-1 mr-1 company-card">

      <div className="card-header p-1 text-truncate bg-light text-dark">
        <i className="fa fa-user-circle"/>&nbsp;{name}
      </div>

      <div className="card-image">
        <Logotype src={model.logo}/>
      </div>
      <div className="card-footer p-1">
        <p className="m-0 text-truncate">{model.name}</p>

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

const selectors = createStructuredSelector({
  owners: store => store.Owner.items,
})

export default connect(selectors)(Card)
