import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import * as Pages from "../../../router/Pages";
import Errors from "../../../components/Errors";

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

        <form noValidate autoComplete="off">
          <div className="form-group">
            <label className="m-0 required">{i18n.t('register.email')}</label>
            <input type="email"
                   placeholder={i18n.t('placeholder.text')}
                   name="user.email"
                   className="form-control"
                   onChange={this.onStringChange('user.email')}
                   value={customer.user.email || ''}/>
            {this.getError('user.email')}
          </div>

          <div className="form-group">
            <label className="m-0 required">{i18n.t('register.firstName')}</label>
            <input type="text"
                   placeholder={i18n.t('placeholder.text')}
                   name="user.firstName"
                   className="form-control"
                   onChange={this.onStringChange('user.firstName')}
                   value={customer.user.firstName || ''}/>
            {this.getError('user.firstName')}
          </div>

          <div className="form-group">
            <label className="m-0">{i18n.t('register.lastName')}</label>
            <input type="text"
                   placeholder={i18n.t('placeholder.text')}
                   name="user.lastName"
                   className="form-control"
                   onChange={this.onStringChange('user.lastName')}
                   value={customer.user.lastName || ''}/>
            {this.getError('user.lastName')}
          </div>
        </form>

      </div>
    </div>

  }

  renderSecurity() {

    const {customer} = this.props.Register

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('register.security_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('register.security_subtitle')}</h6>

        <form noValidate autoComplete="off">
          <div className="form-group">
            <label className="m-0 required">{i18n.t('register.password1')}</label>
            <input type="password"
                   name="password1"
                   className="form-control"
                   placeholder="*******"
                   onChange={this.onStringChange('password1')}
                   value={customer.password1 || ''}/>
            {this.getError('password1')}
          </div>

          <div className="form-group">
            <label className="m-0 required">{i18n.t('register.password2')}</label>
            <input type="password"
                   name="password2"
                   className="form-control"
                   placeholder="*******"
                   onChange={this.onStringChange('password2')}
                   value={customer.password2 || ''}/>
            {this.getError('password2')}
          </div>
        </form>

      </div>
    </div>
  }

  renderContent() {

    const {customer, isValid, serverErrors, isLoading, isRegisterSuccess} = this.props.Register

    if (isRegisterSuccess) {
      return <div className="row">
        <div className="col-12 col-md-10 col-lg-6 mx-auto">
          <div className="alert alert-success text-center">
            <h3>{i18n.t('register.success_title')}</h3>
            <p>{i18n.t('register.success_subtitle')}</p>

            <Link to={Pages.LOGIN} className="btn btn-warning">{i18n.t('register.success_action')}</Link>
          </div>
        </div>
      </div>
    }

    return <React.Fragment>

      <div className="row mb-5 text-center text-md-left">
        <div className="col-12">

          <h2 className="h3">{i18n.t('register.title')}</h2>
          <p className="m-0">{i18n.t('register.subtitle')}</p>

        </div>
      </div>

      <p className="mb-3">{i18n.t('register.already_have_account')}&nbsp;
        <Link to={Pages.LOGIN} className="text-info">
          {i18n.t('register.already_have_account_action')}
        </Link>
      </p>

      <Errors errors={serverErrors}/>

      <div className="row">
        <div className="col-12 col-lg-6">
          {this.renderProfile()}
        </div>

        <div className="col-12 col-lg-6">
          {this.renderSecurity()}
        </div>
      </div>

      <div className="row">
        <div className="col-12">

          <div className="alert alert-light">
            <label>
              <input type="checkbox"
                     checked={customer.hasAccepted}
                     name="hasAccepted"
                     onChange={this.onChangeCheckbox('hasAccepted')}/>

              &nbsp;{i18n.t('register.terms_and_conditions')}
            </label>

            {this.getError('hasAccepted')}

            <ul className="m-0 pl-4">
              <li>
                <a href="https://nextfree.com.ua/terms"
                   rel="noopener noreferrer"
                   target="_blank">{i18n.t('register.terms_link')}</a>
              </li>

              <li>
                <a href="https://nextfree.com.ua/privacy"
                   rel="noopener noreferrer"
                   target="_blank">{i18n.t('register.privacy_link')}</a>
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
        <div className="col-12">

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
