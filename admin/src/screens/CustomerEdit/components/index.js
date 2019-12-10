import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FETCH_SUCCESS, MODEL_CHANGED, RESET} from '../actions';
import Fetch from '../actions/Fetch';
import Remove from '../actions/Remove';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Date from "../../../components/Date";
import Errors from "../../../components/Errors";
import Password from "../../../components/PasswordInput";
import password from "../../../utils/password";
import Upload from "../actions/Upload";
import SaveSecurity from "../actions/SaveSecurity";
import Avatar from "../../../components/Avatar";

class CustomerEdit extends React.Component {

  componentDidMount() {

    const {match} = this.props

    const {id} = match.params

    if (id) {
      this.props.dispatch(Fetch(id))
    } else {
      this.props.dispatch({
        type: FETCH_SUCCESS,
        payload: {},
        flatten: {}
      })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: RESET
    })
  }

  deactivate = () => {
    const {model} = this.props.CustomerEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: false
    }))
  }

  activate = () => {
    const {model} = this.props.CustomerEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: true
    }))
  }

  remove = () => {

    if (!window.confirm(i18n.t('customer_edit.remove_confirm_title'))) return

    const {id} = this.props.CustomerEdit.model

    this.props.dispatch(Remove(id))
  }

  submit = () => {
    const {model} = this.props.CustomerEdit

    this.props.dispatch(Save(model))
  }

  submitSecurity = () => {
    const {model} = this.props.CustomerEdit

    this.props.dispatch(SaveSecurity(model))
  }

  change = (key, value = null) => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      [key]: value
    }
  })

  changeString = name => e => this.change(name, e.target.value)

  changeDate = name => value => this.change(name, value)

  changePhone = name => e => {
    this.change(name, e.target.value.replace(/[^\d+]/g, ''))
  }

  setAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return

    this.props.dispatch(Upload(file))

    e.target.value = null
  }

  getError = key => {
    const {errors} = this.props.CustomerEdit.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  grantAdmin = () => {

    const {model} = this.props.CustomerEdit

    if (!window.confirm(i18n.t('customer_edit.grant_admin_confirm'))) return

    this.props.dispatch(Save({
      id: model.id,
      user: {
        isAdmin: true
      }
    }))
  }

  ungrantAdmin = () => {

    const {model} = this.props.CustomerEdit

    if (!window.confirm(i18n.t('customer_edit.ungrant_admin_confirm'))) return

    this.props.dispatch(Save({
      id: model.id,
      user: {
        isAdmin: false
      }
    }))
  }

  renderAdmin = () => {

    const {model, isLoading} = this.props.CustomerEdit

    return <div className="card mb-4 border-warning text-warning">
      <div className="card-body">
        <div className="row">
          <div className="col-12 text-center">

            <p>{i18n.t('customer_edit.is_admin_title')}</p>

            {!model.user.isAdmin
              ? <button className="btn btn-outline-warning btn-sm"
                        onClick={this.grantAdmin}
                        disabled={isLoading}>
                <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-plus"}/>
                &nbsp;{i18n.t('customer_edit.grant_admin_action')}
              </button>
              : <button className="btn btn-outline-warning btn-sm"
                        onClick={this.ungrantAdmin}
                        disabled={isLoading}>
                <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-times"}/>
                &nbsp;{i18n.t('customer_edit.ungrant_admin_action')}
              </button>}
          </div>
        </div>
      </div>
    </div>
  }

  renderDelete() {

    const {model, isLoading} = this.props.CustomerEdit

    if (!model.id) return null

    return <div className="card mb-4 border-danger text-danger">
      <div className="card-body">

        <div className="row">
          <div className="col-12 text-center">

            <p>{i18n.t('customer_edit.remove_content')}</p>

            <button className="btn btn-outline-danger btn-sm"
                    onClick={this.remove}
                    disabled={isLoading}>
              <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-trash"}/>
              &nbsp;{i18n.t('customer_edit.remove_action')}
            </button>

          </div>
        </div>
      </div>
    </div>
  }

  renderSecurity() {

    const {model, isLoading, isValid} = this.props.CustomerEdit

    return <div className="card mb-4">
      <div className="card-body">

        <div className="row">
          <div className="col">

            <h4 className="card-title">{i18n.t('customer_edit.security_title')}</h4>
            <h6 className="card-subtitle mb-2 text-muted">{i18n.t('customer_edit.security_subtitle')}</h6>

          </div>
          <div className="col-auto">

            <button className="btn btn-success btn-sm"
                    onClick={this.submitSecurity}
                    disabled={isLoading || !isValid}>
              <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-key"}/>
              &nbsp;{i18n.t('customer_edit.save_action')}
            </button>
          </div>
        </div>

        <form noValidate autoComplete="off">

          <div className="row">

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label className="m-0 required">{i18n.t('customer_edit.password1')}</label>
                <Password
                  name="password1"
                  onChange={this.changeString('password1')}
                  value={model.password1 || ''}/>
                {this.getError('password1')}

                {model.password1 && password.validate(model.password1)
                  ? <small className="feedback valid-feedback d-block">
                    {i18n.t('validation.strong_password')}
                  </small>
                  : null}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label className="m-0 required">{i18n.t('customer_edit.password2')}</label>
                <Password
                  name="password2"
                  onChange={this.changeString('password2')}
                  value={model.password2 || ''}/>
                {this.getError('password2')}
              </div>
            </div>
          </div>
        </form>


      </div>
    </div>
  }

  render() {

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.CustomerEdit

    return <div className="container my-3">
      <div className="row">

        <div className="col-12 col-md-4 col-lg-3 text-center">

          <div className="card">
            <div className="card-body">
              <Avatar src={model.user.avatar}/>
            </div>
            <div className="card-footer p-1">
              <label className="btn btn-secondary btn-sm m-0">
                <i className="fa fa-upload"/>&nbsp;{i18n.t('customer_edit.upload_action')}
                <input type="file" className="d-none"
                       onChange={this.setAvatar}
                       disabled={isLoading}/>
              </label>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 col-lg-9">

          <Errors errors={serverErrors}/>

          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{model.user.email}</h3>

                  {model.user.isAdmin ? <div className="badge badge-danger">
                    <i className="fa fa-user"/>&nbsp;{i18n.t('profile.admin_badge')}
                  </div> : null}
                </div>
                <div className="col-12 col-md-auto text-right">

                  {model.id && model.isEnabled
                    ? <button className="btn btn-outline-danger btn-sm mx-1"
                              onClick={this.deactivate}
                              disabled={isLoading || !isValid}>
                      <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-ban"}/>
                      &nbsp;{i18n.t('customer_edit.deactivate_action')}
                    </button>
                    : null}

                  {model.id && !model.isEnabled
                    ? <button className="btn btn-outline-success btn-sm mx-1"
                              onClick={this.activate}
                              disabled={isLoading || !isValid}>
                      <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
                      &nbsp;{i18n.t('customer_edit.activate_action')}
                    </button>
                    : null}

                  <button className="btn btn-success btn-sm mx-1"
                          onClick={this.submit}
                          disabled={isLoading || !isValid}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-save"}/>
                    &nbsp;{i18n.t('customer_edit.save_action')}
                  </button>

                </div>
              </div>
            </div>
            <div className="card-body">

              <form noValidate autoComplete="off">

                {!model.id ? <div className="form-group">
                  <label className="m-0 required">{i18n.t('customer_edit.email')}</label>
                  <input type="email"
                         placeholder={i18n.t('placeholder.text')}
                         name="user.email"
                         className="form-control"
                         onChange={this.changeString('user.email')}
                         value={model.user.email || ''}/>
                  {this.getError('user.email')}
                </div> : null}

                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="m-0 required">{i18n.t('customer_edit.firstName')}</label>
                      <input type="text"
                             placeholder={i18n.t('placeholder.text')}
                             name="user.firstName"
                             className="form-control"
                             onChange={this.changeString('user.firstName')}
                             value={model.user.firstName || ''}/>
                      {this.getError('user.firstName')}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="m-0">{i18n.t('customer_edit.lastName')}</label>
                      <input type="text"
                             placeholder={i18n.t('placeholder.text')}
                             name="user.lastName"
                             className="form-control"
                             onChange={this.changeString('user.lastName')}
                             value={model.user.lastName || ''}/>
                      {this.getError('user.lastName')}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="m-0">{i18n.t('profile.phone')}</label>
                      <input type="text"
                             placeholder={i18n.t('placeholder.text')}
                             name="user.phone"
                             className="form-control"
                             onChange={this.changePhone('user.phone')}
                             value={model.user.phone || ''}/>
                      {this.getError('user.phone')}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="m-0">{i18n.t('profile.birthday')}</label>
                      <Date
                        onChange={this.changeDate('user.birthday')}
                        value={model.user.birthday || ''}
                        name="user.birthday"/>
                      {this.getError('user.birthday')}
                    </div>
                  </div>

                </div>
              </form>

            </div>
          </div>

          {this.renderSecurity()}

          <div className="row">
            <div className="col-12 col-md-6">
              {this.renderAdmin()}
            </div>
            <div className="col-12 col-md-6">
              {this.renderDelete()}
            </div>
          </div>

        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  CustomerEdit: store => store.CustomerEdit,
})

export default withRouter(
  connect(selectors)(CustomerEdit)
)