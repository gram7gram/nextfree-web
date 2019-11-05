import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import FetchMe from '../actions/FetchMe';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";

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

    return <div className="container">
      <div className="row">

        <div className="col-12">
          <div className="card shadow-sm my-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('profile.title')}</h3>
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

              {serverErrors.length > 0 && <div className="alert alert-danger">
                <ul className="m-0">{serverErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
              </div>}

              <div className="form-group">
                <label className="m-0 required">{i18n.t('profile.email')}</label>
                <input type="email"
                       name="email"
                       className="form-control"
                       onChange={this.changeString('email')}
                       value={model.user.email || ''}/>
                {this.getError('email')}
              </div>

              <div className="form-group">
                <label className="m-0 required">{i18n.t('profile.firstName')}</label>
                <input type="text"
                       className="form-control"
                       onChange={this.changeString('firstName')}
                       value={model.user.firstName || ''}/>
                {this.getError('firstName')}
              </div>

              <div className="form-group">
                <label className="m-0 required">{i18n.t('profile.lastName')}</label>
                <input type="text"
                       className="form-control"
                       onChange={this.changeString('lastName')}
                       value={model.user.lastName || ''}/>
                {this.getError('lastName')}
              </div>

            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm mb-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('profile.security_title')}</h3>
                </div>
              </div>
            </div>
            <div className="card-body">

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('profile.password1')}</label>
                    <input type="password"
                           className="form-control"
                           onChange={this.changeString('password1')}
                           value={model.password1 || ''}/>
                    {this.getError('password1')}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('profile.password2')}</label>
                    <input type="password"
                           className="form-control"
                           onChange={this.changeString('password2')}
                           value={model.password2 || ''}/>
                    {this.getError('password2')}
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
