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
import Password from "../../../components/PasswordInput";
import password from "../../../utils/password";
import {AvatarBody} from "../../../components/Avatar";
import Upload from "../actions/Upload";
import SaveSecurity from "../actions/SaveSecurity";
import PageTitle from "../../../components/PageTitle";

class OwnerEdit extends React.Component {

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
    const {model} = this.props.OwnerEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: false
    }))
  }

  activate = () => {
    const {model} = this.props.OwnerEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: true
    }))
  }

  remove = () => {

    if (!window.confirm(i18n.t('owner_edit.remove_confirm_title'))) return

    const {id} = this.props.OwnerEdit.model

    this.props.dispatch(Remove(id))
  }

  submit = () => {
    const {model} = this.props.OwnerEdit

    this.props.dispatch(Save(model))
  }

  submitSecurity = () => {
    const {model} = this.props.OwnerEdit

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

  getError = key => {
    const {errors} = this.props.OwnerEdit.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  setAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size / 1024 > 1000) {
      e.target.value = null
      return;
    }

    const {id} = this.props.OwnerEdit.model

    this.props.dispatch(Upload(id, file))

    e.target.value = null
  }

  grantAdmin = () => {

    const {model} = this.props.OwnerEdit

    if (!window.confirm(i18n.t('owner_edit.grant_admin_confirm'))) return

    this.props.dispatch(Save({
      id: model.id,
      user: {
        isAdmin: true
      }
    }))
  }

  ungrantAdmin = () => {

    const {model} = this.props.OwnerEdit

    if (!window.confirm(i18n.t('owner_edit.ungrant_admin_confirm'))) return

    this.props.dispatch(Save({
      id: model.id,
      user: {
        isAdmin: false
      }
    }))
  }

  renderAdmin = () => {

    const {model, isLoading} = this.props.OwnerEdit

    if (!model.id) return null

    return <div className="card mb-4 border-1 border-danger text-danger text-center">
      <div className="card-body">

        <p>
          <i className="fa fa-info-circle"/>&nbsp;{i18n.t('owner_edit.is_admin_title')}
        </p>

        {!model.user.isAdmin
          ? <button className="btn btn-danger"
                    onClick={this.grantAdmin}
                    disabled={isLoading}>
            <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-plus"}/>
            &nbsp;{i18n.t('owner_edit.grant_admin_action')}
          </button>
          : <button className="btn btn-danger"
                    onClick={this.ungrantAdmin}
                    disabled={isLoading}>
            <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-times"}/>
            &nbsp;{i18n.t('owner_edit.ungrant_admin_action')}
          </button>}
      </div>
    </div>
  }

  renderDelete() {

    const {model, isLoading} = this.props.OwnerEdit

    if (!model.id) return null

    return <div className="card mb-4 border-1 border-danger text-light text-center">
      <div className="card-body">

        <p>
          <i className="fa fa-info-circle"/>&nbsp;{i18n.t('owner_edit.remove_content')}
        </p>

        <button className="btn btn-default"
                onClick={this.remove}
                disabled={isLoading}>
          <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-trash"}/>
          &nbsp;{i18n.t('owner_edit.remove_action')}
        </button>
      </div>
    </div>
  }

  renderSecurity() {

    const {model, isLoading, isValid} = this.props.OwnerEdit

    return <div className="card mb-4">
      <div className="card-header">
        <div className="row">
          <div className="col">
            <h4 className="m-0">{i18n.t('owner_edit.security_title')}</h4>
          </div>
          <div className="col-auto">

            {model.id ? <button className="btn btn-primary btn-sm"
                                onClick={this.submitSecurity}
                                disabled={isLoading || !isValid}>
              <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-key"}/>
              &nbsp;{i18n.t('owner_edit.save_action')}
            </button> : null}
          </div>
        </div>
      </div>
      <div className="card-body px-0">

        <p className="text-secondary">
          <i className="fa fa-info-circle"/>&nbsp;{i18n.t('owner_edit.security_subtitle')}
        </p>

        <form noValidate autoComplete="off">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label className="m-0 required">{i18n.t('owner_edit.password1')}</label>
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
                <label className="m-0 required">{i18n.t('owner_edit.password2')}</label>
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
    } = this.props.OwnerEdit

    const buttons = []

    if (model.id && model.isEnabled) {
      buttons.push({
        mainClass: "btn-primary",
        disabled: isLoading || !isValid,
        onClick: this.activate,
        icon: "fa-check",
        text: i18n.t('owner_edit.activate_action'),
        isLoading
      })

    }

    if (model.id && !model.isEnabled) {
      buttons.push({
        mainClass: "btn-default",
        disabled: isLoading || !isValid,
        onClick: this.deactivate,
        icon: "fa-ban",
        text: i18n.t('owner_edit.deactivate_action'),
        isLoading
      })
    }

    buttons.push({
      mainClass: "btn-primary",
      disabled: isLoading || !isValid,
      onClick: this.submit,
      icon: "fa-save",
      text: i18n.t('owner_edit.save_action'),
      isLoading
    })

    return <div className="container my-3">
      <div className="row">

        <div className="col-12">
          <PageTitle
            title={model.id ? model.user.email : i18n.t('owner_edit.new_title')}
            buttons={buttons}
            serverErrors={serverErrors}/>
        </div>

        <div className="col-12 col-md-4 col-lg-3">

          <div className="card bg-dark-gray mb-4">
            <div className="card-body">
              <AvatarBody src={model.user.avatar}/>
            </div>
            <div className="card-footer p-1">
              <div className="form-group text-center">
                <label className="btn btn-secondary btn-sm m-0">
                  <i className="fa fa-upload"/>&nbsp;{i18n.t('owner_edit.upload_action')}
                  <input type="file" className="d-none"
                         accept="image/*" max={1} min={1}
                         onChange={this.setAvatar}
                         disabled={isLoading}/>
                </label>
              </div>

              <div className="text-secondary">
                <i className="fa fa-info-circle"/>&nbsp;{i18n.t('validation.avatar_rule_size')}
              </div>
              <div className="text-secondary">
                <i className="fa fa-info-circle"/>&nbsp;{i18n.t('validation.avatar_rule_aspect')}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 col-lg-9">

          <div className="mb-4">
            <form noValidate autoComplete="off">
              {!model.id ? <div className="form-group">
                <label className="m-0 required">{i18n.t('owner_edit.email')}</label>
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
                    <label className="m-0 required">{i18n.t('owner_edit.firstName')}</label>
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
                    <label className="m-0 required">{i18n.t('owner_edit.lastName')}</label>
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
                    <label className="m-0">{i18n.t('owner_edit.phone')}</label>
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
                    <label className="m-0">{i18n.t('owner_edit.birthday')}</label>
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
  OwnerEdit: store => store.OwnerEdit,
})

export default withRouter(
  connect(selectors)(OwnerEdit)
)