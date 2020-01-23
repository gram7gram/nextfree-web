import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';
import avatar from '../../../assets/img/store-placeholder.png';
import {createStructuredSelector} from "reselect";
import i18n from "../../../i18n";

const Card = ({model, companies}) => {

  const company = companies.find(company => company._id === model.companyId)

  return <div className="col-6 col-md-3 col-lg-2">
    <Link to={Pages.STORE_EDIT.replace(':id', model._id)}
          className="card shadow-sm mb-1 mr-1 store-card">

      <div className="card-header p-1 text-truncate">
        <i className="fa fa-cubes"/>&nbsp;{company ? company.name : "???"}
      </div>

      <div className="card-image">
        <img src={avatar} alt="" className="img-fluid p-4"/>
      </div>
      <div className="card-footer p-1">
        <h6 className="m-0 text-truncate">{model.city || '-'}</h6>
        <p className="m-0 text-truncate">{model.address || '-'}</p>

        {model.isEnabled
          ? <div className="badge badge-success">
            <i className="fa fa-check"/>&nbsp;{i18n.t('store.enabled_badge')}
          </div>
          : <div className="badge badge-danger">
            <i className="fa fa-times"/>&nbsp;{i18n.t('store.disabled_badge')}
          </div>}
      </div>
    </Link>
  </div>
}

const selectors = createStructuredSelector({
  companies: store => store.Company.items,
})

export default connect(selectors)(Card)
