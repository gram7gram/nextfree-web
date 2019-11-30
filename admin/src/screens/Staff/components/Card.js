import React from 'react';
import {Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';
import avatar from '../../../assets/img/staff-placeholder.png';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import i18n from "../../../i18n";

const Card = ({model, companies}) => {

  const company = companies.find(company => company._id === model.companyId)

  let name = model.user.email
  if (model.user.lastName  || model.user.firstName) {
    name = (model.user.lastName  + ' ' + model.user.firstName).trim()
  }

  return <div className="col-6 col-md-3 col-lg-2">
    <Link to={Pages.STAFF_EDIT.replace(':id', model._id)}
          className="card shadow-sm mb-1 mr-1 staff-card">

      <div className="card-header p-1 text-truncate bg-light text-dark">
        <i className="fa fa-share-alt"/>&nbsp;{company ? company.name : "???"}
      </div>

      <div className="card-image">
        <img src={avatar} alt="" className="img-fluid"/>
      </div>
      <div className="card-footer p-1">
        <h5 className="m-0 text-truncate">{name}</h5>
        <p className="m-0 text-truncate">{model.position || '-'}</p>

        {model.isEnabled
          ? <div className="badge badge-success">
            <i className="fa fa-check"/>&nbsp;{i18n.t('staff.enabled_badge')}
          </div>
          : <div className="badge badge-danger">
            <i className="fa fa-times"/>&nbsp;{i18n.t('staff.disabled_badge')}
          </div>}
      </div>
    </Link>
  </div>
}

const selectors = createStructuredSelector({
  companies: store => store.Company.items,
})

export default connect(selectors)(Card)
