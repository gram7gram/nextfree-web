import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import FetchMe from '../actions/FetchMe';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Date from "../../../components/Date";
import Errors from "../../../components/Errors";

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

  renderSecurity() {

    const {
      model,
    } = this.props.Profile

    return <div className="card shadow-sm mb-3">
      <div className="card-body">

        <h3 className="card-title">{i18n.t('profile.security_title')}</h3>

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="m-0">{i18n.t('profile.password1')}</label>
              <input type="password" autoComplete="off"
                     className="form-control"
                     onChange={this.changeString('password1')}
                     value={model.password1 || ''}/>
              {this.getError('password1')}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="m-0">{i18n.t('profile.password2')}</label>
              <input type="password" autoComplete="off"
                     className="form-control"
                     onChange={this.changeString('password2')}
                     value={model.password2 || ''}/>
              {this.getError('password2')}
            </div>

          </div>
        </div>
      </div>
    </div>
  }

  render() {

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.Profile

    return <div className="container my-3">
      <div className="row">

        <div className="col-12">

          <Errors errors={serverErrors}/>

          <div className="card shadow-sm mb-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{model.user.email}</h3>

                  {model.user.isAdmin ? <div className="badge badge-danger">
                    <i className="fa fa-user"/>&nbsp;{i18n.t('profile.admin_badge')}
                  </div> : null}

                </div>
                <div className="col-12 col-md-auto text-right">
                  <button className="btn btn-success btn-sm"
                          onClick={this.submit}
                          disabled={isLoading || !isValid}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
                    &nbsp;{i18n.t('profile.action')}
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('profile.firstName')}</label>
                    <input type="text" placeholder={i18n.t('placeholder.text')}
                           className="form-control"
                           onChange={this.changeString('firstName')}
                           value={model.user.firstName || ''}/>
                    {this.getError('firstName')}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('profile.lastName')}</label>
                    <input type="text" placeholder={i18n.t('placeholder.text')}
                           className="form-control"
                           onChange={this.changeString('lastName')}
                           value={model.user.lastName || ''}/>
                    {this.getError('lastName')}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('profile.phone')}</label>
                    <input type="text" placeholder={i18n.t('placeholder.text')}
                      className="form-control"
                      onChange={this.changePhone('phone')}
                      value={model.user.phone || ''}/>
                    {this.getError('phone')}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('profile.birthday')}</label>
                    <Date
                      onChange={this.changeDate('birthday')}
                      value={model.user.birthday || ''}/>
                    {this.getError('birthday')}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="row">
        <div className="col-12">
          {this.renderSecurity()}
        </div>
      </div>

    </div>
  }
}

const selectors = createStructuredSelector({
  Profile: store => store.Profile,
})

export default connect(selectors)(Profile)
