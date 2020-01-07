import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FETCH_SUCCESS, MODEL_CHANGED, RESET} from '../actions';
import Fetch from '../actions/Fetch';
import Remove from '../actions/Remove';
import Save from '../actions/Save';
import FetchStores from '../../Store/actions/Fetch';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Errors from "../../../components/Errors";
import Upload from "../actions/Upload";
import {AvatarBody} from "../../../components/Avatar";

class StaffEdit extends React.Component {

  componentDidMount() {

    const {match, defaultCompany, defaultStore} = this.props

    const {id} = match.params

    if (id) {
      this.props.dispatch(Fetch(id))
    } else if (defaultCompany && defaultStore) {
      this.props.dispatch({
        type: FETCH_SUCCESS,
        payload: {
          companyId: defaultCompany._id,
          storeId: defaultStore._id,
        },
        flatten: {
          companyId: defaultCompany._id,
          storeId: defaultStore._id,
        }
      })
    }

    this.props.dispatch(FetchStores())
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: RESET
    })
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

  setAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size / 1024 > 1000) {
      e.target.value = null
      return;
    }

    const {id} = this.props.StaffEdit.model

    this.props.dispatch(Upload(id, file))

    e.target.value = null
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

  renderPosition() {

    const {defaultCompany, stores} = this.props
    const {model} = this.props.StaffEdit

    return <div className="card mb-4">
      <div className="card-body">

        <h4 className="card-title">{i18n.t('staff_edit.position_title')}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{i18n.t('staff_edit.position_subtitle')}</h6>

        <form noValidate autoComplete="off">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label className="m-0 required">{i18n.t('staff_edit.company')}</label>
                <select
                  name="companyId"
                  value={defaultCompany._id || ''}
                  disabled={true}
                  className="form-control">
                  <option value={defaultCompany._id}>{defaultCompany.name}</option>
                </select>
                {this.getError('companyId')}
              </div>
            </div>
            <div className="col-12 col-md-6">

              <div className="form-group">
                <label className="m-0 required">{i18n.t('staff_edit.store')}</label>
                <select
                  name="storeId"
                  value={model.storeId || ''}
                  disabled={!model.companyId}
                  onChange={this.changeString('storeId')}
                  className="form-control">
                  <option value="">{i18n.t('placeholder.select')}</option>
                  {stores
                    .filter(item => item.companyId === model.companyId)
                    .map(item => <option key={item._id} value={item._id}>{item.address || item._id}</option>)}
                </select>
                {this.getError('storeId')}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="m-0">{i18n.t('staff_edit.position')}</label>
            <input type="text" placeholder={i18n.t('placeholder.text')}
                   name="position"
                   className="form-control"
                   onChange={this.changeString('position')}
                   value={model.position || ''}/>
            {this.getError('position')}
          </div>
        </form>

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

        <div className="col-12 col-md-4 col-lg-3">

          <div className="card">
            <div className="card-body">
              <AvatarBody src={model.user.avatar}/>
            </div>
            <div className="card-footer p-1">
              <div className="form-group text-center">
                <label className="btn btn-secondary btn-sm m-0">
                  <i className="fa fa-upload"/>&nbsp;{i18n.t('staff_edit.upload_action')}
                  <input type="file" className="d-none"
                         accept="image/*" max={1} min={1}
                         onChange={this.setAvatar}
                         disabled={isLoading}/>
                </label>
              </div>

              <div className="text-muted">
                <i className="fa fa-info-circle"/>&nbsp;{i18n.t('validation.avatar_rule_size')}
              </div>
              <div className="text-muted">
                <i className="fa fa-info-circle"/>&nbsp;{i18n.t('validation.avatar_rule_aspect')}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 col-lg-9">

          <Errors errors={serverErrors}/>

          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col-12 text-right">

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

              <table className="table table-sm">
                <tbody>
                <tr>
                  <th>{i18n.t('staff_edit.email')}</th>
                  <td>{model.user.email}</td>
                </tr>
                <tr>
                  <th>{i18n.t('staff_edit.lastName')}</th>
                  <td>{model.user.lastName}</td>
                </tr>
                <tr>
                  <th>{i18n.t('staff_edit.firstName')}</th>
                  <td>{model.user.firstName}</td>
                </tr>
                <tr>
                  <th>{i18n.t('staff_edit.phone')}</th>
                  <td>{model.user.phone}</td>
                </tr>
                <tr>
                  <th>{i18n.t('staff_edit.birthday')}</th>
                  <td>{model.user.birthday}</td>
                </tr>
                </tbody>
              </table>

            </div>
          </div>

          {this.renderPosition()}

          {/*{this.renderDelete()}*/}

        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  StaffEdit: store => store.StaffEdit,
  defaultCompany: store => store.App.defaultCompany,
  defaultStore: store => store.App.defaultStore,
  stores: store => store.Store.items,
})

export default withRouter(
  connect(selectors)(StaffEdit)
)