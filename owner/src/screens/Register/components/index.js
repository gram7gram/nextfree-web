import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";

class Register extends React.Component {

  submit = () => {

    const {owner, company} = this.props.Register

    this.props.dispatch(Save({
      owner, company
    }))
  }

  onChangeCheckbox = name => e => {
    this.props.dispatch({
      type: MODEL_CHANGED,
      payload: {
        [name]: e.target.checked
      }
    })
  }

  onOwnerChange = name => e => {
    this.props.dispatch({
      type: MODEL_CHANGED,
      payload: {
        ['owner.' + name]: e.target.value
      }
    })
  }

  onCompanyChange = name => e => {
    this.props.dispatch({
      type: MODEL_CHANGED,
      payload: {
        ['company.' + name]: e.target.value
      }
    })
  }

  getError = key => {
    const {errors} = this.props.Register.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block m-0">{errors[key]}</small>
  }

  renderStaff() {

    const {owner} = this.props.Register

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('register.owner_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('register.owner_subtitle')}</h6>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.email')}</label>
          <input type="email"
                 className="form-control"
                 onChange={this.onOwnerChange('user.email')}
                 value={owner.user.email || ''}/>
          {this.getError('owner.user.email')}
        </div>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.firstName')}</label>
          <input type="text"
                 className="form-control"
                 onChange={this.onOwnerChange('user.firstName')}
                 value={owner.user.firstName || ''}/>
          {this.getError('owner.user.firstName')}
        </div>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.lastName')}</label>
          <input type="text"
                 className="form-control"
                 onChange={this.onOwnerChange('user.lastName')}
                 value={owner.user.lastName || ''}/>
          {this.getError('owner.user.lastName')}
        </div>

      </div>
    </div>

  }

  renderCompany() {

    const {company} = this.props.Register

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('register.company_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('register.company_subtitle')}</h6>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.companyName')}</label>
          <input type="text"
                 className="form-control"
                 onChange={this.onCompanyChange('name')}
                 value={company.name || ''}/>
          {this.getError('company.name')}
        </div>

      </div>
    </div>
  }

  renderSecurity() {

    const {owner} = this.props.Register

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('register.security_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('register.security_subtitle')}</h6>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.password1')}</label>
          <input type="password"
                 className="form-control"
                 onChange={this.onOwnerChange('password1')}
                 value={owner.password1 || ''}/>
          {this.getError('owner.password1')}
        </div>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('register.password2')}</label>
          <input type="password"
                 className="form-control"
                 onChange={this.onOwnerChange('password2')}
                 value={owner.password2 || ''}/>
          {this.getError('owner.password2')}
        </div>

      </div>
    </div>
  }

  renderContent() {

    const {owner, isValid, serverErrors, isLoading, isRegisterSuccess} = this.props.Register

    if (isRegisterSuccess) {
      return <div className="alert alert-success text-center">
        <h3>{i18n.t('register.success_title')}</h3>
        <p>{i18n.t('register.success_subtitle')}</p>
      </div>
    }

    return <React.Fragment>

      {serverErrors.length > 0 && <div className="alert alert-danger">
        <ul className="m-0">{serverErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
      </div>}

      {this.renderStaff()}

      {this.renderCompany()}

      {this.renderSecurity()}

      <div className="row">
        <div className="col-12">

          <div className="alert alert-light">
            <label>
              <input type="checkbox" checked={owner.hasAccepted}
                     onChange={this.onChangeCheckbox('owner.hasAccepted')}/>

              &nbsp;{i18n.t('register.terms_and_conditions')}
            </label>

            {this.getError('owner.hasAccepted')}

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

          <div className="row">
            <div className="col-12">

              <div className="mb-4">
                <h2 className="h3">{i18n.t('register.title')}</h2>
                <p>{i18n.t('register.subtitle')}</p>
              </div>

            </div>
          </div>

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
