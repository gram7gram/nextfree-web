import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Errors from "../../../components/Errors";

class PasswordSet extends React.Component {

  submit = () => {

    const {id} = this.props.match.params

    if (!id) return

    const {password1} = this.props.PasswordSet.model

    this.props.dispatch(Save(id, {
      password: password1
    }))
  }

  submitIfEnter = e => {
    if (e.keyCode === 13) {

      const {isValid} = this.props.PasswordSet

      if (isValid)
        this.submit()
    }
  }

  onChange = name => e => {
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

  render() {

    const {model, serverErrors, isValid, isLoading} = this.props.PasswordSet

    return <div className="container py-5">
      <div className="row no-gutters">
        <div className="col-8 col-lg-7 col-xl-6 mx-auto">

          <div className="row">
            <div className="col-12">

              <div className="mb-4">
                <h2 className="h3">{i18n.t('password_set.title')}</h2>
                <p>{i18n.t('password_set.subtitle')}</p>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-12">

              <Errors errors={serverErrors}/>

              <form noValidate>

                <div className="form-group">
                  <label className="mb-1 required">{i18n.t('password_set.password2')}</label>
                  <input type="password"
                         className="form-control"
                         autoFocus={true}
                         placeholder={"******"}
                         onChange={this.onChange('password1')}
                         onKeyDown={this.submitIfEnter}
                         value={model.password1 || ''}/>
                  {this.getError('password1')}
                </div>

                <div className="form-group">
                  <label className="mb-1 required">{i18n.t('password_set.password2')}</label>
                  <input type="password"
                         className="form-control"
                         placeholder={"******"}
                         onChange={this.onChange('password2')}
                         onKeyDown={this.submitIfEnter}
                         value={model.password2 || ''}/>
                  {this.getError('password2')}
                </div>

                <div className="form-group text-right">
                  <button className="btn btn-success"
                          onClick={this.submit}
                          disabled={!isValid || isLoading}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-lock"}/>
                    &nbsp;{i18n.t('password_set.action')}
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
  PasswordSet: store => store.PasswordSet
})

export default connect(selectors)(PasswordSet)