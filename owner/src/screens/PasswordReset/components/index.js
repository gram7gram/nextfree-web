import React from 'react';
import {connect} from 'react-redux';
import {validate} from 'email-validator';
import {MODEL_CHANGED} from '../actions';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Errors from "../../../components/Errors";

class PasswordReset extends React.Component {

  submit = () => {

    const {email} = this.props.PasswordReset.model

    this.props.dispatch(Save({email}))
  }

  submitIfEnter = e => {
    if (e.keyCode === 13) {

      const isValid = this.isValid()

      if (isValid)
        this.submit()
    }
  }

  onChangeIgnoreCase = name => e => {
    const value = e.target.value = e.target.value.toLowerCase()
    this.props.dispatch({
      type: MODEL_CHANGED,
      payload: {
        [name]: value
      }
    })
  }

  isValid = () => {
    const {model: {email}} = this.props.PasswordReset

    return validate(email)
  }

  render() {

    const {model: {email}, serverErrors, isLoading} = this.props.PasswordReset

    const isValid = this.isValid()

    return <div className="container py-5">
      <div className="row no-gutters">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">

          <div className="row">
            <div className="col-12">

              <div className="mb-4">
                <h2 className="h3">{i18n.t('password_reset.title')}</h2>
                <p>{i18n.t('password_reset.subtitle')}</p>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-12">

              <Errors errors={serverErrors}/>

              <form noValidate>
                <div className="form-group">
                  <input type="text"
                         className="form-control"
                         placeholder={i18n.t('password_reset.placeholder')}
                         onChange={this.onChangeIgnoreCase('email')}
                         onKeyDown={this.submitIfEnter}
                         value={email || ''}/>
                </div>
                <div className="form-group text-right">
                  <button className="btn btn-success"
                          onClick={this.submit}
                          disabled={!isValid || isLoading}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-lock"}/>
                    &nbsp;{i18n.t('password_reset.action')}
                  </button>
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
  PasswordReset: store => store.PasswordReset
})

export default connect(selectors)(PasswordReset)
