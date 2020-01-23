import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {MODEL_CHANGED} from '../actions';
import Fetch from '../actions/Fetch';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Errors from "../../../components/Errors";
import Password from "../../../components/PasswordInput";
import password from "../../../utils/password";
import * as Pages from "../../../router/Pages";

class PasswordSet extends React.Component {

  componentDidMount() {

    const {id} = this.props.match.params

    this.props.dispatch(Fetch(id))
  }

  submit = () => {

    const {id} = this.props.match.params

    if (!id) return

    const {password1} = this.props.PasswordSet.model

    this.props.dispatch(Save(id, {
      password: password1
    }))
  }

  changeString = name => e => {
    this.props.dispatch({
      type: MODEL_CHANGED,
      payload: {
        [name]: e.target.value
      }
    })
  }

  getError = key => {
    const {errors} = this.props.PasswordSet.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  renderContent() {

    const {model, serverErrors, isValid, isLoading, isTokenValid} = this.props.PasswordSet

    if (!isTokenValid) {
      return <div className="row">
        <div className="col-12">
          <div className="alert alert-danger text-center">
            <h3>{i18n.t('password_set.not_found_title')}</h3>
            <p>{i18n.t('password_set.not_found_subtitle')}</p>

            <Link to={Pages.HOME} className="btn btn-default">{i18n.t('password_set.not_found_action')}</Link>
          </div>
        </div>
      </div>
    }

    return <div className="row">
      <div className="col-12">

        <Errors errors={serverErrors}/>

        <form noValidate>

          <div className="form-group">
            <label className="mb-1 required">{i18n.t('password_set.password1')}</label>
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

          <div className="form-group">
            <label className="mb-1 required">{i18n.t('password_set.password2')}</label>
            <Password
              name="password2"
              onChange={this.changeString('password2')}
              value={model.password2 || ''}/>
            {this.getError('password2')}
          </div>

          <div className="form-group text-right">
            <button className="btn btn-primary"
                    onClick={this.submit}
                    disabled={!isValid || isLoading}>
              <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-lock"}/>
              &nbsp;{i18n.t('password_set.action')}
            </button>
          </div>

        </form>

      </div>
    </div>
  }

  render() {

    return <div className="container py-5">
      <div className="row no-gutters">
        <div className="col-12 col-md-10 col-lg-6 mx-auto">

          <div className="row">
            <div className="col-12">

              <div className="mb-4">
                <h2 className="h3">{i18n.t('password_set.title')}</h2>
                <p>{i18n.t('password_set.subtitle')}</p>
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
  PasswordSet: store => store.PasswordSet
})

export default connect(selectors)(PasswordSet)
