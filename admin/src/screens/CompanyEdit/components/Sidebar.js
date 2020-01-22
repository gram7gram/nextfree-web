import React from 'react';
import moment from 'moment';
import {Link, withRouter} from 'react-router-dom';
import i18n from "../../../i18n";
import * as Pages from "../../../router/Pages";
import {useSelector} from "react-redux";

const Sidebar = ({match}) => {

  const {raw, model} = useSelector(state => state.CompanyEdit)

  return <>

    {raw && raw.id ? <div className="card mb-4">
      <div className="card-body p-2 bg-dark-gray">
        <h2 className="text-center">{model.name}</h2>

        <div className="row">
          <div className="col-6">{i18n.t('placeholder.status')}:</div>
          <div className="col-6">
            {raw.isEnabled
              ? <div className="badge badge-success">
                <i className="fa fa-check"/>&nbsp;{i18n.t('company.enabled_badge')}
              </div> : null}

            {!raw.isEnabled
              ? <div className="badge badge-danger">
                <i className="fa fa-times"/>&nbsp;{i18n.t('company.disabled_badge')}
              </div> : null}
          </div>
        </div>
        <div className="row">
          <div className="col-6">{i18n.t('placeholder.createdAt')}:</div>
          <div className="col-6">
            {moment(raw.createdAt).format('HH:mm DD.MM.YYYY')}
          </div>
        </div>

      </div>
    </div> : null}

    <nav className="bg-dark-gray mb-4">

      <Link to={Pages.COMPANY_EDIT.replace(':id', match.params.id)}
            className="btn-nav p-3">
        {i18n.t('navigation.company_info')}
      </Link>

      <Link to={Pages.COMPANY_PAGE.replace(':id', match.params.id)}
            className="btn-nav p-3">
        {i18n.t('navigation.company_page')}
      </Link>

    </nav>
  </>
}

export default withRouter(Sidebar)
