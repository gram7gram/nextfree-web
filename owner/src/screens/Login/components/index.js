import React from 'react';
import {connect} from 'react-redux';
import {LOGIN_CREDENTIALS_CHANGED} from '../actions';
import LoginAction from '../actions/Login';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";

class Login extends React.Component {

  submit = () => {

    const {email, password} = this.props.Login

    this.props.dispatch(LoginAction(email, password))
  }

  submitIfEnter = e => {
    if (e.keyCode === 13) {

      const {isValid} = this.props.Login

      if (isValid)
        this.submit()
    }
  }

  onChange = name => e => {
    this.props.dispatch({
      type: LOGIN_CREDENTIALS_CHANGED,
      payload: {
        [name]: e.target.value
      }
    })
  }

  onChangeIgnoreCase = name => e => {
    const value = e.target.value = e.target.value.toLowerCase()
    this.props.dispatch({
      type: LOGIN_CREDENTIALS_CHANGED,
      payload: {
        [name]: value
      }
    })
  }

  render() {

    const {email, password, isValid, errors, isLoading} = this.props.Login

    return <div className="container py-5">
      <div className="row no-gutters">
        <div className="col-8 col-lg-7 col-xl-6 mx-auto">

          <div className="row">
            <div className="col-12">

              <div className="mb-4">
                <h2 className="h3">{i18n.t('login.title')}</h2>
                <p>{i18n.t('login.subtitle')}</p>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-12">

              {errors.length > 0 && <div className="alert alert-danger">
                <ul className="m-0">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
              </div>}

              <form noValidate>
                <div className="form-group">
                  <input type="text"
                         className="form-control"
                         name="login"
                         autoFocus={true}
                         placeholder={i18n.t('login.placeholder')}
                         onChange={this.onChangeIgnoreCase('email')}
                         onKeyDown={this.submitIfEnter}
                         value={email || ''}/>
                </div>
                <div className="form-group">
                  <input type="password"
                         className="form-control"
                         name="password"
                         placeholder='********'
                         onChange={this.onChange('password')}
                         onKeyDown={this.submitIfEnter}
                         value={password || ''}/>
                </div>
                <div className="form-group text-right">

                  <button className="btn btn-success"
                          onClick={this.submit}
                          disabled={!isValid || isLoading}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-lock"}/>
                    &nbsp;{i18n.t('login.action')}
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
  Login: store => store.Login
})

export default connect(selectors)(Login)
