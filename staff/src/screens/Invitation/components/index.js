import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import FetchMe from '../actions/FetchMe';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import * as Pages from "../../../router/Pages";
import Errors from "../../../components/Errors";
import Date from "../../../components/Date";
import Loading from "../../../components/Loading";
import Password from "../../../components/PasswordInput";

class Invitation extends React.Component {

  componentDidMount() {
    const {id} = this.props.match.params

    if (id)
      this.props.dispatch(FetchMe(id))
  }

  submit = () => {

    const {id} = this.props.match.params

    const {model} = this.props.Invitation

    this.props.dispatch(Save(id, model))
  }

  onChangeCheckbox = name => e => {
    this.props.dispatch({
      type: MODEL_CHANGED,
      payload: {
        [name]: e.target.checked
      }
    })
  }

  change = (name, value) => {
    this.props.dispatch({
      type: MODEL_CHANGED,
      payload: {
        [name]: value
      }
    })
  }

  changeString = name => e => {
    this.change(name, e.target.value)
  }

  changeDate = name => value => this.change(name, value)

  changePhone = name => e => {
    this.change(name, e.target.value.replace(/[^\d+]/g, ''))
  }

  getError = key => {
    const {errors} = this.props.Invitation.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block m-0">{errors[key]}</small>
  }

  renderProfile() {

    const {model} = this.props.Invitation

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('invitation.staff_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('invitation.staff_subtitle')}</h6>

        <h4>{model.user.email}</h4>

        <form noValidate autoComplete="off">
          <div className="form-group">
            <label className="m-0 required">{i18n.t('invitation.firstName')}</label>
            <input type="text"
                   placeholder={i18n.t('placeholder.text')}
                   name="user.firstName"
                   className="form-control"
                   onChange={this.changeString('user.firstName')}
                   value={model.user.firstName || ''}/>
            {this.getError('user.firstName')}
          </div>

          <div className="form-group">
            <label className="m-0 required">{i18n.t('invitation.lastName')}</label>
            <input type="text"
                   placeholder={i18n.t('placeholder.text')}
                   name="user.lastName"
                   className="form-control"
                   onChange={this.changeString('user.lastName')}
                   value={model.user.lastName || ''}/>
            {this.getError('user.lastName')}
          </div>

          <div className="form-group">
            <label className="m-0">{i18n.t('invitation.phone')}</label>
            <input type="text"
                   placeholder={i18n.t('placeholder.text')}
                   name="user.phone"
                   className="form-control"
                   onChange={this.changePhone('user.phone')}
                   value={model.user.phone || ''}/>
            {this.getError('user.phone')}
          </div>

          <div className="form-group">
            <label className="m-0">{i18n.t('invitation.birthday')}</label>
            <Date
              onChange={this.changeDate('user.birthday')}
              value={model.user.birthday || ''}
              name="user.birthday"/>
            {this.getError('user.birthday')}
          </div>

        </form>

      </div>
    </div>

  }

  renderSecurity() {

    const {model} = this.props.Invitation

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('invitation.security_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('invitation.security_subtitle')}</h6>

        <form noValidate autoComplete="off">
          <div className="form-group">
            <label className="m-0 required">{i18n.t('invitation.password1')}</label>
            <Password
              name="password1"
              onChange={this.changeString('password1')}
              value={model.password1 || ''}/>
            {this.getError('password1')}
          </div>

          <div className="form-group">
            <label className="m-0 required">{i18n.t('invitation.password2')}</label>
            <Password
              name="password2"
              onChange={this.changeString('password2')}
              value={model.password2 || ''}/>
            {this.getError('password2')}
          </div>
        </form>

      </div>
    </div>
  }

  renderContent() {

    const {model, isValid, isLoading, isInvitationSuccess} = this.props.Invitation

    if (!model.id) {
      if (isLoading) {
        return <Loading/>
      }

      return <div className="row">
        <div className="col-12 col-md-10 col-lg-6 mx-auto">
          <div className="alert alert-danger text-center">
            <h3>{i18n.t('invitation.not_found_title')}</h3>
            <p>{i18n.t('invitation.not_found_subtitle')}</p>

            <Link to={Pages.LOGIN} className="btn btn-warning">{i18n.t('invitation.not_found_action')}</Link>
          </div>
        </div>
      </div>
    }

    if (isInvitationSuccess) {
      return <div className="row">
        <div className="col-12 col-md-10 col-lg-6 mx-auto">
          <div className="alert alert-success text-center">
            <h3>{i18n.t('invitation.success_title')}</h3>
            <p>{i18n.t('invitation.success_subtitle')}</p>

            <Link to={Pages.LOGIN} className="btn btn-warning">{i18n.t('invitation.success_action')}</Link>
          </div>
        </div>
      </div>
    }

    return <React.Fragment>

      <p className="mb-3">{i18n.t('invitation.already_have_account')}&nbsp;
        <Link to={Pages.LOGIN} className="text-info">
          {i18n.t('invitation.already_have_account_action')}
        </Link>
      </p>

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
              <input type="checkbox" checked={model.hasAccepted}
                     name="hasAccepted"
                     onChange={this.onChangeCheckbox('hasAccepted')}/>

              &nbsp;{i18n.t('invitation.terms_and_conditions')}
            </label>

            {this.getError('hasAccepted')}

            <a href="https://nextfree.com.ua/privacy"
               rel="noopener noreferrer"
               target="_blank">{i18n.t('invitation.privacy_link')}</a>
          </div>

        </div>
        <div className="col-12 text-center">

          <button className="btn btn-success btn-lg"
                  onClick={this.submit}
                  disabled={isLoading || !isValid}>
            <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
            &nbsp;{i18n.t('invitation.save_action')}
          </button>

        </div>
      </div>

    </React.Fragment>
  }

  render() {

    const {serverErrors} = this.props.Invitation

    return <div className="container py-5">
      <div className="row no-gutters">
        <div className="col-12">

          <div className="row mb-5">
            <div className="col-12">

              <h2 className="h3">{i18n.t('invitation.title')}</h2>
              <p className="m-0">{i18n.t('invitation.subtitle')}</p>

            </div>
          </div>

          <Errors errors={serverErrors}/>

          {this.renderContent()}

        </div>
      </div>
    </div>

  }
}

const selectors = createStructuredSelector({
  Invitation: store => store.Invitation
})

export default withRouter(
  connect(selectors)(Invitation)
)
