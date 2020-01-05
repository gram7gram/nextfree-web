import React from 'react';
import {connect} from 'react-redux';
import Editor from 'react-quill';
import {WEBSITE_CHANGED} from '../actions';
import FetchWebsite from '../actions/FetchWebsite';
import SaveWebsite from '../actions/SaveWebsite';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Errors from "../../../components/Errors";
import Sidebar from "./Sidebar";

class PageTab extends React.Component {

  componentDidMount() {

    const {defaultCompany} = this.props

    if (defaultCompany) {
      this.props.dispatch(FetchWebsite(defaultCompany._id))
    }
  }

  draft = () => {
    const {model, page} = this.props.CompanyEdit

    this.props.dispatch(SaveWebsite(model.id, {
      ...page,
      status: 'DRAFT'
    }))
  }

  publish = () => {
    const {model, page} = this.props.CompanyEdit

    this.props.dispatch(SaveWebsite(model.id, {
      ...page,
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

  changeString = name => e => this.change(name, e.target.value)

  enablePage = () => this.change('isEnabled', true)

  getError = key => {
    const {errors} = this.props.CompanyEdit.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  renderContent() {

    const {page, isValid, isLoading} = this.props.CompanyEdit

    const {meta, social} = page

    if (!page.isEnabled) {
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

    return <>

      <div className="d-block d-md-none mb-4">

        <button className="btn btn-success btn-block mb-1"
                onClick={this.publish}
                disabled={isLoading || !isValid}>
          <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-save"}/>
          &nbsp;{i18n.t('company_edit.page_save_publish_action')}
        </button>

        <button className="btn btn-outline-warning btn-block mb-1"
                onClick={this.draft}
                disabled={isLoading || !isValid}>
          <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-save"}/>
          &nbsp;{i18n.t('company_edit.page_save_draft_action')}
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-header">

          <div className="row">
            <div className="col">
              <h4 className="m-0 text-white">{i18n.t('company_edit.page_title')}</h4>
            </div>

            <div className="col-auto text-right d-none d-md-block">
              <button className="btn btn-outline-warning btn-sm mx-1"
                      onClick={this.draft}
                      disabled={isLoading || !isValid}>
                <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-save"}/>
                &nbsp;{i18n.t('company_edit.page_save_draft_action')}
              </button>

              <button className="btn btn-success btn-sm mx-1"
                      onClick={this.publish}
                      disabled={isLoading || !isValid}>
                <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-save"}/>
                &nbsp;{i18n.t('company_edit.page_save_publish_action')}
              </button>
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
                   value={page.title || ''}/>
            {this.getError('title')}
          </div>

          <div className="form-group">
            <label className="m-0">{i18n.t('company_edit.page.content')}</label>
            <Editor
              theme="snow"
              className="bg-light"
              onChange={this.changeString('content')}
              value={page.content || ''}/>
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
                <input type="text" placeholder={i18n.t('placeholder.text')}
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
                <input type="text" placeholder={i18n.t('placeholder.text')}
                       className="form-control"
                       onChange={this.changeString('social.facebook')}
                       value={social.facebook || ''}/>
                {this.getError('social.facebook')}
              </div>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.social.instagram')}</label>
                <input type="text" placeholder={i18n.t('placeholder.text')}
                       className="form-control"
                       onChange={this.changeString('social.instagram')}
                       value={social.instagram || ''}/>
                {this.getError('social.instagram')}
              </div>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.social.website')}</label>
                <input type="text" placeholder={i18n.t('placeholder.text')}
                       className="form-control"
                       onChange={this.changeString('social.website')}
                       value={social.website || ''}/>
                {this.getError('social.website')}
              </div>

              <div className="form-group">
                <label className="m-0">{i18n.t('company_edit.social.phone')}</label>
                <input type="text" placeholder={i18n.t('placeholder.text')}
                       className="form-control"
                       onChange={this.changeString('social.phone')}
                       value={social.phone || ''}/>
                {this.getError('social.phone')}
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
    } = this.props.CompanyEdit

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
  CompanyEdit: store => store.CompanyEdit,
})

export default connect(selectors)(PageTab)