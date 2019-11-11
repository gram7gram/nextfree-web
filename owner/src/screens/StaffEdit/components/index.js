import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FETCH_SUCCESS, MODEL_CHANGED} from '../actions';
import Fetch from '../actions/Fetch';
import Remove from '../actions/Remove';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";

class StaffEdit extends React.Component {

  componentDidMount() {

    const {defaultStore, match} = this.props

    const {id} = match.params

    if (id) {
      this.props.dispatch(Fetch(id))
    } else {
      this.props.dispatch({
        type: FETCH_SUCCESS,
        payload: {
          storeId: defaultStore._id
        },
        flatten: {
          storeId: defaultStore._id
        }
      })
    }
  }

  deactivate = () => {
    const {model} = this.props.StaffEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: false
    }))
  }

  activate = () => {
    const {model} = this.props.StaffEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: true
    }))
  }

  remove = () => {

    if (!window.confirm(i18n.t('staff_edit.remove_confirm_title'))) return

    const {id} = this.props.StaffEdit.model

    this.props.dispatch(Remove(id))
  }

  submit = () => {
    const {model} = this.props.StaffEdit

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
    const {errors} = this.props.StaffEdit.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  renderDelete() {

    const {model, isLoading} = this.props.StaffEdit

    if (!model.id) return null

    return <div className="card mb-4">
      <div className="card-body">

        <div className="row">
          <div className="col-12 text-center">

            <p className="text-danger">{i18n.t('staff_edit.remove_content')}</p>

            <button className="btn btn-outline-danger btn-sm"
                    onClick={this.remove}
                    disabled={isLoading}>
              <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-trash"}/>
              &nbsp;{i18n.t('staff_edit.remove_action')}
            </button>

          </div>
        </div>
      </div>
    </div>
  }

  renderSecurity() {

    const {model} = this.props.StaffEdit

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('staff_edit.security_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('staff_edit.security_subtitle')}</h6>


        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="m-0 required">{i18n.t('staff_edit.password1')}</label>
              <input type="password"
                     className="form-control"
                     onChange={this.changeString('password1')}
                     value={model.password1 || ''}/>
              {this.getError('password1')}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="m-0 required">{i18n.t('staff_edit.password2')}</label>
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
  }

  render() {

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.StaffEdit

    return <div className="container my-3">
      <div className="row">

        <div className="col-12">

          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('staff_edit.title')}</h3>
                </div>
                <div className="col-12 col-md-auto text-right">

                  {model.id && model.isEnabled
                    ? <button className="btn btn-outline-danger btn-sm mx-1"
                              onClick={this.deactivate}
                              disabled={isLoading || !isValid}>
                      <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-ban"}/>
                      &nbsp;{i18n.t('staff_edit.deactivate_action')}
                    </button>
                    : null}

                  {model.id && !model.isEnabled
                    ? <button className="btn btn-outline-success btn-sm mx-1"
                              onClick={this.activate}
                              disabled={isLoading || !isValid}>
                      <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
                      &nbsp;{i18n.t('staff_edit.activate_action')}
                    </button>
                    : null}

                  <button className="btn btn-success btn-sm mx-1"
                          onClick={this.submit}
                          disabled={isLoading || !isValid}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-save"}/>
                    &nbsp;{i18n.t('staff_edit.save_action')}
                  </button>

                </div>
              </div>
            </div>
            <div className="card-body">

              {serverErrors.length > 0 && <div className="alert alert-danger">
                <ul className="m-0">{serverErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
              </div>}

              <div className="row">
                <div className="col-12">

                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('staff_edit.email')}</label>
                    <input type="email"
                           className="form-control"
                           onChange={this.changeString('user.email')}
                           value={model.user.email || ''}/>
                    {this.getError('user.email')}
                  </div>

                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('staff_edit.firstName')}</label>
                    <input type="text"
                           className="form-control"
                           onChange={this.changeString('user.firstName')}
                           value={model.user.firstName || ''}/>
                    {this.getError('user.firstName')}
                  </div>

                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('staff_edit.lastName')}</label>
                    <input type="text"
                           className="form-control"
                           onChange={this.changeString('user.lastName')}
                           value={model.user.lastName || ''}/>
                    {this.getError('user.lastName')}
                  </div>

                  <div className="form-group">
                    <label className="m-0">{i18n.t('staff_edit.position')}</label>
                    <input type="text"
                           className="form-control"
                           onChange={this.changeString('position')}
                           value={model.position || ''}/>
                    {this.getError('position')}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {this.renderSecurity()}

          {this.renderDelete()}

        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  StaffEdit: store => store.StaffEdit,
})

export default withRouter(
  connect(selectors)(StaffEdit)
)