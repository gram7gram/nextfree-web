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

  onStringChange = name => e => {
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

        <h4 className="card-title">{i18n.t('invitation.model_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('invitation.model_subtitle')}</h6>

        <h4>{model.user.email}</h4>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('invitation.firstName')}</label>
          <input type="text" placeholder={i18n.t('placeholder.text')}
                 className="form-control"
                 onChange={this.onStringChange('user.firstName')}
                 value={model.user.firstName || ''}/>
          {this.getError('user.firstName')}
        </div>

        <div className="form-group">
          <label className="m-0">{i18n.t('invitation.lastName')}</label>
          <input type="text" placeholder={i18n.t('placeholder.text')}
                 className="form-control"
                 onChange={this.onStringChange('user.lastName')}
                 value={model.user.lastName || ''}/>
          {this.getError('user.lastName')}
        </div>

        <div className="form-group">
          <label className="m-0">{i18n.t('profile.phone')}</label>
          <input type="text" placeholder={i18n.t('placeholder.text')}
                 className="form-control"
                 onChange={this.changePhone('user.phone')}
                 value={model.user.phone || ''}/>
          {this.getError('user.phone')}
        </div>

        <div className="form-group">
          <label className="m-0">{i18n.t('profile.birthday')}</label>
          <Date
            onChange={this.changeDate('user.birthday')}
            value={model.user.birthday || ''}/>
          {this.getError('user.birthday')}
        </div>

      </div>
    </div>

  }

  renderSecurity() {

    const {model} = this.props.Invitation

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('invitation.security_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('invitation.security_subtitle')}</h6>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('invitation.password1')}</label>
          <input type="password" autoComplete="off"
                 className="form-control"
                 onChange={this.onStringChange('password1')}
                 value={model.password1 || ''}/>
          {this.getError('password1')}
        </div>

        <div className="form-group">
          <label className="m-0 required">{i18n.t('invitation.password2')}</label>
          <input type="password" autoComplete="off"
                 className="form-control"
                 onChange={this.onStringChange('password2')}
                 value={model.password2 || ''}/>
          {this.getError('password2')}
        </div>

      </div>
    </div>
  }

  renderContent() {

    const {model, isValid, isLoading, isInvitationSuccess} = this.props.Invitation

    if (!model.id) {
      if (isLoading) {
        return <Loading/>
      }

      return <div className="alert alert-danger text-center">
        <h3>{i18n.t('invitation.not_found_title')}</h3>
        <p>{i18n.t('invitation.not_found_subtitle')}</p>

        <Link to={Pages.LOGIN} className="btn btn-warning">{i18n.t('invitation.not_found_action')}</Link>
      </div>
    }

    if (isInvitationSuccess) {
      return <div className="alert alert-success text-center">
        <h3>{i18n.t('invitation.success_title')}</h3>
        <p>{i18n.t('invitation.success_subtitle')}</p>

        <Link to={Pages.LOGIN} className="btn btn-warning">{i18n.t('invitation.success_action')}</Link>
      </div>
    }

    return <React.Fragment>

      {this.renderProfile()}

      {this.renderSecurity()}

      <div className="row">
        <div className="col-12">

          <div className="alert alert-light">
            <label>
              <input type="checkbox" checked={model.hasAccepted}
                     onChange={this.onChangeCheckbox('hasAccepted')}/>

              &nbsp;{i18n.t('invitation.terms_and_conditions')}
            </label>

            {this.getError('hasAccepted')}

            <ul className="m-0">
              <li>
                <a href="/terms" target="_blank">{i18n.t('invitation.terms_link')}</a>
              </li>

              <li>
                <a href="/privacy" target="_blank">{i18n.t('invitation.privacy_link')}</a>
              </li>
            </ul>
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
        <div className="col-8 col-lg-7 col-xl-6 mx-auto">

          <div className="row">
            <div className="col-12">

              <div className="mb-4">
                <h2 className="h3">{i18n.t('invitation.title')}</h2>
                <p>{i18n.t('invitation.subtitle')}</p>
              </div>

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
