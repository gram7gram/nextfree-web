import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Editor from 'react-quill';
import {WEBSITE_CHANGED} from '../actions';
import FetchWebsite from '../actions/Fetch';
import SaveWebsite from '../actions/Save';
import i18n from '../../../i18n';
import parameters from '../../../parameters';
import {createStructuredSelector} from "reselect";
import Errors from "../../../components/Errors";
import Loading from "../../../components/Loading";
import Sidebar from "../../CompanyEdit/components/Sidebar";
import Status from "./Status";

class CompanyWebsite extends React.Component {

  componentDidMount() {

    const {defaultCompany} = this.props

    if (!defaultCompany) return

    this.props.dispatch(FetchWebsite(defaultCompany._id))
  }

  draft = () => {
    const {model} = this.props.CompanyWebsite
    const {defaultCompany} = this.props

    if (!defaultCompany) return

    this.props.dispatch(SaveWebsite(defaultCompany._id, {
      ...model,
      status: 'DRAFT'
    }))
  }

  publish = () => {
    const {model} = this.props.CompanyWebsite
    const {defaultCompany} = this.props

    if (!defaultCompany) return

    this.props.dispatch(SaveWebsite(defaultCompany._id, {
      ...model,
      status: 'IN_REVIEW'
    }))
  }

  change = (key, value = null) => this.props.dispatch({
    type: WEBSITE_CHANGED,
    payload: {
      [key]: value,
      'status': 'DRAFT',
    }
  })

  changeString = name => e =>
    this.change(name, e.target.value)

  changeHtml = name => (value = '') => {
    const trimmed = value.trim().split('<p><br></p><p><br></p>').join('<br/>')

    this.change(name, trimmed.split('<p><br></p>').join(''))
  }

  enablePage = () =>
    this.change('isEnabled', true)

  getError = key => {
    const {errors} = this.props.CompanyWebsite.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  renderContent() {

    const {model, isValid, isLoading, raw} = this.props.CompanyWebsite

    const {meta, social} = model

    if (isLoading && !model.id) {
      return <div className="text-center py-5">

        <Loading/>

      </div>
    }

    if (!model.isEnabled) {
      return <div className="text-center py-5">

        <h4>{i18n.t('company_edit.page_create_title')}</h4>
        <p>{i18n.t('company_edit.page_create_content')}</p>

        <button
          className="btn btn-outline-success"
          onClick={this.enablePage}>
          {i18n.t('company_edit.page_create_action')}
        </button>

      </div>
    }

    const isPublished = raw.status === 'PUBLISHED'

    const buttons = [
      {
        text: i18n.t('company_edit.page_save_publish_action'),
        icon: "fa-check",
        mainClass: "btn-success",
        onClick: this.publish,
        disabled: isLoading || !isValid || isPublished,
      },
      {
        text: i18n.t('company_edit.page_save_draft_action'),
        icon: "fa-save",
        mainClass: "btn-outline-warning",
        onClick: this.draft,
        disabled: isLoading || !isValid,
      }
    ]

    if (isPublished) {
      buttons.push({
        text: i18n.t('company_edit.page_deactivate_action'),
        icon: "fa-times",
        mainClass: "btn-outline-danger",
        onClick: this.draft,
        disabled: isLoading || !isValid,
      })
      buttons.push({
        text: i18n.t('company_edit.page_preview_action'),
        icon: "fa-eye",
        mainClass: "btn-info",
        href: `${parameters.wwwHost}/partners/${model.id}`,
      })
    }

    return <>

      <div className="d-block d-md-none mb-4">
        {buttons.map((btn, i) =>
          btn.onClick
            ? <button key={i}
                      className={`btn ${btn.mainClass} btn-block mb-1`}
                      onClick={btn.onClick}
                      disabled={!!btn.disabled}>
              <i className={isLoading ? "fa fa-spin fa-circle-notch" : `fa ${btn.icon}`}/>
              &nbsp;{btn.text}
            </button>
            : <a key={i}
                 target="_blank"
                 className={`btn ${btn.mainClass} btn-block mb-1`}
                 href={btn.href}>
              <i className={isLoading ? "fa fa-spin fa-circle-notch" : `fa ${btn.icon}`}/>
              &nbsp;{btn.text}
            </a>
        )}
      </div>

      <div className="card mb-4">
        <div className="card-header">

          <div className="row">
            <div className="col">
              <h4 className="m-0 text-white">{i18n.t('company_edit.page_title')}</h4>
              <div>
                <Status value={model.status}/>
                &nbsp;{raw.publishedAt ? moment(raw.publishedAt).format('HH:mm DD.MM.YYYY') : ''}
              </div>
            </div>

            <div className="col-auto text-right d-none d-md-block">
              {buttons.map((btn, i) =>
                btn.onClick
                  ? <button key={i}
                            className={`btn ${btn.mainClass} btn-sm mx-1`}
                            onClick={btn.onClick}
                            disabled={!!btn.disabled}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : `fa ${btn.icon}`}/>
                    &nbsp;{btn.text}
                  </button>
                  : <a key={i}
                       target="_blank"
                       className={`btn ${btn.mainClass} btn-sm mx-1`}
                       href={btn.href}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : `fa ${btn.icon}`}/>
                    &nbsp;{btn.text}
                  </a>
              )}
            </div>
          </div>

        </div>

        <div className="card-body">

          <p>
            <i className="fa fa-info-circle"/>&nbsp;{i18n.t('company_edit.page_subtitle')}
          </p>

          <div className="form-group">
            <label className="m-0">{i18n.t('company_edit.page.title')}</label>
            <input type="text" placeholder={i18n.t('placeholder.text')}
                   className="form-control"
                   onChange={this.changeString('title')}
                   value={model.title || ''}/>
            {this.getError('title')}
          </div>

          <div className="form-group">
            <label className="m-0">{i18n.t('company_edit.page.content')}</label>
            <Editor
              theme="snow"
              className="bg-light text-dark"
              onChange={this.changeHtml('content')}
              value={model.content || ''}/>
            {this.getError('content')}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="m-0 text-white">{i18n.t('company_edit.meta_title')}</h3>
            </div>
            <div className="card-body">

              <p>
                <i className="fa fa-info-circle"/>&nbsp;{i18n.t('company_edit.meta_subtitle')}
              </p>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.meta.title')}</label>
                <input type="text" placeholder={i18n.t('placeholder.text')}
                       className="form-control"
                       onChange={this.changeString('meta.title')}
                       value={meta.title || ''}/>
                {this.getError('meta.title')}
              </div>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.meta.description')}</label>
                <textarea placeholder={i18n.t('placeholder.text')}
                       className="form-control"
                       onChange={this.changeString('meta.description')}
                       value={meta.description || ''}/>
                {this.getError('meta.description')}
              </div>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.meta.keywords')}</label>
                <input type="text" placeholder={i18n.t('placeholder.text')}
                       className="form-control"
                       onChange={this.changeString('meta.keywords')}
                       value={meta.keywords || ''}/>
                {this.getError('meta.keywords')}
              </div>

            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="m-0 text-white">{i18n.t('company_edit.social_title')}</h3>
            </div>
            <div className="card-body">

              <p>
                <i className="fa fa-info-circle"/>&nbsp;{i18n.t('company_edit.social_subtitle')}
              </p>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.social.facebook')}</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fab fa-facebook"/>
                  </span>
                  </div>
                  <input type="text" placeholder={i18n.t('placeholder.link')}
                         className="form-control"
                         onChange={this.changeString('social.facebook')}
                         value={social.facebook || ''}/>
                </div>
                {this.getError('social.facebook')}
              </div>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.social.instagram')}</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fab fa-instagram"/>
                  </span>
                  </div>
                  <input type="text" placeholder={i18n.t('placeholder.link')}
                         className="form-control"
                         onChange={this.changeString('social.instagram')}
                         value={social.instagram || ''}/>
                </div>
                {this.getError('social.instagram')}
              </div>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.social.website')}</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-link"/>
                  </span>
                  </div>
                  <input type="text" placeholder={i18n.t('placeholder.link')}
                         className="form-control"
                         onChange={this.changeString('social.website')}
                         value={social.website || ''}/>
                </div>
                {this.getError('social.website')}
              </div>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.social.phone')}</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-phone"/>
                  </span>
                  </div>
                  <input type="text" placeholder={i18n.t('placeholder.phone')}
                         className="form-control"
                         onChange={this.changeString('social.phone')}
                         value={social.phone || ''}/>
                </div>
                {this.getError('social.phone')}
              </div>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.social.email')}</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-at"/>
                  </span>
                  </div>
                  <input type="text" placeholder={i18n.t('placeholder.text')}
                         className="form-control"
                         onChange={this.changeString('social.email')}
                         value={social.email || ''}/>
                </div>
                {this.getError('social.email')}
              </div>
            </div>

          </div>
        </div>
      </div>


    </>
  }

  render() {

    const {
      serverErrors,
    } = this.props.CompanyWebsite

    return <div className="container-fluid my-3">
      <div className="row">

        <div className="col-12 col-md-4 col-lg-3">
          <Sidebar/>
        </div>

        <div className="col-12 col-md-8 col-lg-9">

          <Errors errors={serverErrors}/>

          {this.renderContent()}

        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  defaultCompany: store => store.App.defaultCompany,
  CompanyWebsite: store => store.CompanyWebsite,
})

export default connect(selectors)(CompanyWebsite)