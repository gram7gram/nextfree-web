import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED, RESET} from '../actions';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Password from "../../../components/PasswordInput";
import ProfileSidebar from "../../Profile/components/ProfileSidebar";
import password from "../../../utils/password";
import PageTitle from "../../../components/PageTitle";

class ProfileSecurity extends React.Component {

  componentWillUnmount() {
    this.props.dispatch({
      type: RESET,
    })
  }

  submit = () => {
    const {currentPassword, password1} = this.props.ProfileSecurity.model

    this.props.dispatch(Save({
      currentPassword,
      newPassword: password1,
    }))
  }

  change = (key, value = null) => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      [key]: value
    }
  })

  changeString = name => e => this.change(name, e.target.value)

  getError = key => {
    const {errors} = this.props.ProfileSecurity.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  render() {

    const {
      model, isLoading, isValid, serverErrors,
    } = this.props.ProfileSecurity

    const buttons = [{
      mainClass: "btn-primary",
      disabled: isLoading || !isValid,
      onClick: this.submit,
      icon: "fa-save",
      text: i18n.t('profile.action'),
      isLoading
    }]

    return <div className="container-fluid my-3">
      <div className="row">

        <div className="col-12">
          <PageTitle
            title={i18n.t('profile.security_title')}
            buttons={buttons}
            serverErrors={serverErrors}/>
        </div>

        <div className="col-12 col-md-4 col-lg-3">
          <ProfileSidebar/>
        </div>

        <div className="col-12 col-md-8 col-lg-9">

          <div className="mb-4">

            <form noValidate autoComplete="off">
              <div className="row">
                <div className="col-12 col-md-10 col-lg-6 mx-auto">

                  <div className="form-group">
                    <label className="m-0">{i18n.t('profile.currentPassword')}</label>
                    <Password
                      name="currentPassword"
                      onChange={this.changeString('currentPassword')}
                      value={model.currentPassword || ''}/>
                    {this.getError('currentPassword')}
                  </div>

                  <div className="form-group">
                    <label className="m-0">{i18n.t('profile.password1')}</label>
                    <Password
                      name="password1"
                      disabled={!model.currentPassword}
                      onChange={this.changeString('password1')}
                      value={model.password1 || ''}/>
                    {this.getError('password1')}

                    {model.password1 && password.validate(model.password1)
                      ? <small className="feedback valid-feedback d-block">
                        {i18n.t('validation.strong_password')}
                      </small>
                      : null}
                  </div>

                  <div className="form-group">
                    <label className="m-0">{i18n.t('profile.password2')}</label>
                    <Password
                      name="password2"
                      disabled={!model.password1}
                      onChange={this.changeString('password2')}
                      value={model.password2 || ''}/>
                    {this.getError('password2')}
                  </div>

                </div>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  }
}

const selectors = createStructuredSelector({
  ProfileSecurity: store => store.ProfileSecurity,
})

export default connect(selectors)(ProfileSecurity)
