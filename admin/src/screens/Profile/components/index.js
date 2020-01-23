import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import FetchMe from '../actions/FetchMe';
import Date from '../../../components/Date';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Errors from "../../../components/Errors";
import ProfileSidebar from "./ProfileSidebar";
import {AvatarBody} from "../../../components/Avatar";
import Upload from "../actions/Upload";
import PageTitle from "../../../components/PageTitle";

class Profile extends React.Component {

  componentDidMount() {
    this.props.dispatch(FetchMe())
  }

  submit = () => {
    const {model} = this.props.Profile

    this.props.dispatch(Save(model))
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
    const {errors} = this.props.Profile.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  setAvatar = (e) => {

    const {
      model,
    } = this.props.Profile

    const file = e.target.files[0]
    if (!file) return

    if (file.size / 1024 > 1000) {
      e.target.value = null
      return;
    }

    this.props.dispatch(Upload(model.id, file))

    e.target.value = null
  }

  render() {

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.Profile

    const buttons = [
      {
        mainClass: "btn-primary",
        disabled: isLoading || !isValid,
        onClick: this.submit,
        icon: "fa-check",
        text: i18n.t('profile.action'),
        isLoading
      }
    ]

    return <div className="container-fluid my-3">

      <div className="row">

        <div className="col-12">
          <PageTitle
            title={model.user.email}
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
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('profile.firstName')}</label>
                    <input type="text" placeholder={i18n.t('placeholder.text')}
                           name="user.firstName"
                           className="form-control"
                           onChange={this.changeString('user.firstName')}
                           value={model.user.firstName || ''}/>
                    {this.getError('user.firstName')}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('profile.lastName')}</label>
                    <input type="text" placeholder={i18n.t('placeholder.text')}
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
                    <input type="text" placeholder={i18n.t('placeholder.text')}
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

          <div className="row">
            <div className="col-12 col-md-6">
              <div className="card mb-4 bg-dark-gray">
                <div className="card-body">
                  <AvatarBody src={model.user.avatar}/>
                </div>

                <div className="card-footer p-1">
                  <div className="form-group text-center">
                    <label className="btn btn-secondary btn-sm m-0">
                      <i className="fa fa-upload"/>&nbsp;{i18n.t('profile.upload_action')}
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
          </div>
        </div>

      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  Profile: store => store.Profile,
})

export default connect(selectors)(Profile)
