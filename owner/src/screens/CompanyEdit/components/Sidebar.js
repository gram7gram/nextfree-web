import React from 'react';
import moment from 'moment';
import {Link, withRouter} from 'react-router-dom';
import i18n from "../../../i18n";
import * as Pages from "../../../router/Pages";
import {useSelector} from "react-redux";
import Status from "../../CompanyWebsite/components/Status";
import parameters from "../../../parameters";

const CompanyStatus = () => {

  const {raw} = useSelector(state => state.CompanyEdit)

  if (!raw) return null

  return <div className="card mb-4 small">
    <div className="card-body p-2 bg-dark-gray">
      <h4 className="text-center">{raw.name}</h4>

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
  </div>
}

const CompanyPageStatus = () => {

  const {raw} = useSelector(state => state.CompanyWebsite)

  if (!raw) return null

  return <div className="card mb-4 small">
    <div className="card-body p-2 bg-dark-gray">
      <h4 className="text-center">{i18n.t('company_website.sidebar_title')}</h4>

      <div className="mb-2">
        <div className="row">
          <div className="col-6">{i18n.t('placeholder.status')}:</div>
          <div className="col-6">
            <Status value={raw.status}/>
          </div>
        </div>
        <div className="row">
          <div className="col-6">{i18n.t('company_website.date_published')}:</div>
          <div className="col-6">
            {raw.publishedAt ? moment(raw.publishedAt).format('HH:mm DD.MM.YYYY') : ""}
          </div>
        </div>
      </div>

      {raw.status === 'PUBLISHED'
        ? <a href={`${parameters.wwwHost}/partners/${raw._id}`}
             target="_blank"
             className="btn btn-default btn-block btn-sm">
          <i className="fa fa-eye"/>&nbsp;{i18n.t('company_edit.page_preview_action')}
        </a> : null}

    </div>
  </div>
}

const Sidebar = () => {

  return <>

    <nav className="bg-dark-gray mb-4">

      <Link to={Pages.MY_COMPANY}
            className="btn-nav p-3">
        {i18n.t('navigation.my_company')}
      </Link>

      <Link to={Pages.MY_COMPANY_PAGE}
            className="btn-nav p-3">
        {i18n.t('navigation.my_company_page')}
      </Link>

    </nav>

    <CompanyStatus/>

    <CompanyPageStatus/>
  </>
}

export default Sidebar
