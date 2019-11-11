import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import * as Pages from "../../../router/Pages";

class Register extends React.Component {

  submit = () => {

    const {customer} = this.props.Register

    this.props.dispatch(Save(customer))
  }

  onChangeCheckbox = name => e => {
    this.props.dispatch({
      type: MODEL_CHANGED,
      payload: {
        [name]: e.target.checked
      }
    })
  }

  onStringChange = name => e => {
    this.props.dispatch({
      type: MODEL_CHANGED,
      payload: {
        [name]: e.target.value
      }
    })
  }

  getError = key => {
    const {errors} = this.props.Register.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block m-0">{errors[key]}</small>
  }

  renderProfile() {

    const {customer} = this.props.Register

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('register.customer_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('register.customer_subtitle')}</h6>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.email')}</label>
          <input type="email"
                 className="form-control"
                 onChange={this.onStringChange('user.email')}
                 value={customer.user.email || ''}/>
          {this.getError('user.email')}
        </div>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.firstName')}</label>
          <input type="text"
                 className="form-control"
                 onChange={this.onStringChange('user.firstName')}
                 value={customer.user.firstName || ''}/>
          {this.getError('user.firstName')}
        </div>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.lastName')}</label>
          <input type="text"
                 className="form-control"
                 onChange={this.onStringChange('user.lastName')}
                 value={customer.user.lastName || ''}/>
          {this.getError('user.lastName')}
        </div>

      </div>
    </div>

  }

  renderSecurity() {

    const {customer} = this.props.Register

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('register.security_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('register.security_subtitle')}</h6>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.password1')}</label>
          <input type="password"
                 className="form-control"
                 onChange={this.onStringChange('password1')}
                 value={customer.password1 || ''}/>
          {this.getError('password1')}
        </div>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.password2')}</label>
          <input type="password"
                 className="form-control"
                 onChange={this.onStringChange('password2')}
                 value={customer.password2 || ''}/>
          {this.getError('password2')}
        </div>

      </div>
    </div>
  }

  renderContent() {

    const {customer, isValid, serverErrors, isLoading, isRegisterSuccess} = this.props.Register

    if (isRegisterSuccess) {
      return <div className="alert alert-success text-center">
        <h3>{i18n.t('register.success_title')}</h3>
        <p>{i18n.t('register.success_subtitle')}</p>

        <Link to={Pages.LOGIN} className="btn btn-warning">{i18n.t('register.success_action')}</Link>
      </div>
    }

    return <React.Fragment>

      <div className="row">
        <div className="col-12">

          <div className="mb-4">
            <h2 className="h3">{i18n.t('register.title')}</h2>
            <p>{i18n.t('register.subtitle')}</p>
          </div>

        </div>
      </div>

      {serverErrors.length > 0 && <div className="alert alert-danger">
        <ul className="m-0">{serverErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
      </div>}

      {this.renderProfile()}

      {this.renderSecurity()}

      <div className="row">
        <div className="col-12">

          <div className="alert alert-light">
            <label>
              <input type="checkbox" checked={customer.hasAccepted}
                     onChange={this.onChangeCheckbox('hasAccepted')}/>

              &nbsp;{i18n.t('register.terms_and_conditions')}
            </label>

            {this.getError('hasAccepted')}

            <ul className="m-0">
              <li>
                <a href="/terms" target="_blank">{i18n.t('register.terms_link')}</a>
              </li>

              <li>
                <a href="/privacy" target="_blank">{i18n.t('register.privacy_link')}</a>
              </li>
            </ul>
          </div>

        </div>
        <div className="col-12 text-center">

          <button className="btn btn-success btn-lg"
                  onClick={this.submit}
                  disabled={isLoading || !isValid}>
            <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
            &nbsp;{i18n.t('register.save_action')}
          </button>

        </div>
      </div>

    </React.Fragment>
  }

  render() {

    return <div className="container py-5">
      <div className="row no-gutters">
        <div className="col-8 col-lg-7 col-xl-6 mx-auto">

          {this.renderContent()}

        </div>
      </div>
    </div>

  }
}

const selectors = createStructuredSelector({
  Register: store => store.Register
})

export default connect(selectors)(Register)
