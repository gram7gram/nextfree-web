import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import i18n from "../../../i18n";
import * as Pages from "../../../router/Pages";
import {useSelector} from "react-redux";

const Sidebar = () => {

  const {raw, model} = useSelector(state => state.CompanyEdit)

  return <>

    <div className="card mb-4">
      <div className="card-body p-2">
        <h2 className="text-center">{model.name}</h2>

        <div className="row">
          <div className="col-6">{i18n.t('placeholder.status')}:</div>
          <div className="col-6">
            {raw && raw.isEnabled
              ? <div className="badge badge-success">
                <i className="fa fa-check"/>&nbsp;{i18n.t('company.enabled_badge')}
              </div> : null}

            {raw && !raw.isEnabled
              ? <div className="badge badge-danger">
                <i className="fa fa-times"/>&nbsp;{i18n.t('company.disabled_badge')}
              </div> : null}
          </div>
        </div>
        <div className="row">
          <div className="col-6">{i18n.t('placeholder.createdAt')}:</div>
          <div className="col-6">
            {raw
              ? moment(raw.createdAt).format('HH:mm DD.MM.YYYY')
              : null}
          </div>
        </div>

      </div>
    </div>

    <nav className="bg-dark-gray mb-4">

      <Link to={Pages.COMPANY_EDIT.replace(':id', model.id)}
            className="btn btn-link btn-block text-left">
        {i18n.t('navigation.company_info')}
      </Link>

      <Link to={Pages.COMPANY_PAGE.replace(':id', model.id)}
            className="btn btn-link btn-block text-left">
        {i18n.t('navigation.company_page')}
      </Link>

    </nav>
  </>
}

export default Sidebar
