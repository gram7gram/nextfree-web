import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED, RESET} from '../actions';
import FetchMe from '../actions/FetchMe';
import Date from '../../../components/Date';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Errors from "../../../components/Errors";
import ProfileSidebar from "./ProfileSidebar";

class Profile extends React.Component {

  componentDidMount() {
    this.props.dispatch(FetchMe())
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: RESET
    })
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

  render() {

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.Profile

    return <div className="container-fluid my-3">

      <div className="row">

        <div className="col-12 col-md-4 col-lg-3">
          <ProfileSidebar/>
        </div>

        <div className="col-12 col-md-8 col-lg-9">

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
