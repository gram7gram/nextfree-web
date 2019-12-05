import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {MODEL_CHANGED, FETCH_SUCCESS, RESET} from '../actions';
import Fetch from '../actions/Fetch';
import Remove from '../actions/Remove';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import BonusCondition from "../../../components/BonusCondition";
import Errors from "../../../components/Errors";
import FetchConditions from "../../App/actions/FetchConditions";

class StoreEdit extends React.Component {

  componentDidMount() {

    const {match, defaultCompany} = this.props

    const {id} = match.params

    this.props.dispatch(FetchConditions())

    if (id) {
      this.props.dispatch(Fetch(id))
    } else if (defaultCompany) {
      this.props.dispatch({
        type: FETCH_SUCCESS,
        payload: {
          companyId: defaultCompany._id,
        },
        flatten: {
          companyId: defaultCompany._id,
        },
      })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: RESET
    })
  }

  deactivate = () => {
    const {model} = this.props.StoreEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: false
    }))
  }

  activate = () => {
    const {model} = this.props.StoreEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: true
    }))
  }

  remove = () => {

    if (!window.confirm(i18n.t('store_edit.remove_confirm_title'))) return

    const {model} = this.props.StoreEdit

    this.props.dispatch(Remove(model))
  }

  submit = () => {
    const {model} = this.props.StoreEdit

    this.props.dispatch(Save(model))
  }

  change = (key, value = null) => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      [key]: value
    }
  })

  changeFloat = name => e => {
    let value = parseFloat(e.target.value)
    if (isNaN(value)) value = null

    this.change(name, value)
  }

  changeString = name => e => this.change(name, e.target.value)

  setCondition = value => () => this.change('bonusCondition', value)

  getError = key => {
    const {errors} = this.props.StoreEdit.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  renderDelete() {

    const {model, isLoading} = this.props.StoreEdit

    if (!model.id) return null

    return <div className="card mb-4">
      <div className="card-body">

        <div className="row">
          <div className="col-12 text-center">

            <p className="text-danger">{i18n.t('store_edit.remove_content')}</p>

            <button className="btn btn-outline-danger btn-sm"
                    onClick={this.remove}
                    disabled={isLoading}>
              <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-trash"}/>
              &nbsp;{i18n.t('store_edit.remove_action')}
            </button>

          </div>
        </div>
      </div>
    </div>
  }

  render() {

    const {defaultCompany, conditions} = this.props

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.StoreEdit

    let title = ''
    if (!isLoading) {
      title = model.id
        ? i18n.t('store_edit.title')
        : i18n.t('store_edit.new_title')
    }

    return <div className="container my-3">
      <div className="row">

        <div className="col-12">

          <Errors errors={serverErrors}/>

          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{title}</h3>
                </div>
                <div className="col-12 col-md-auto text-right">

                  {model.id && model.isEnabled
                    ? <button className="btn btn-outline-danger btn-sm mx-1"
                              onClick={this.deactivate}
                              disabled={isLoading || !isValid}>
                      <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-ban"}/>
                      &nbsp;{i18n.t('store_edit.deactivate_action')}
                    </button>
                    : null}

                  {model.id && !model.isEnabled
                    ? <button className="btn btn-outline-success btn-sm mx-1"
                              onClick={this.activate}
                              disabled={isLoading || !isValid}>
                      <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
                      &nbsp;{i18n.t('store_edit.activate_action')}
                    </button>
                    : null}

                  <button className="btn btn-success btn-sm mx-1"
                          onClick={this.submit}
                          disabled={isLoading || !isValid}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-save"}/>
                    &nbsp;{i18n.t('store_edit.save_action')}
                  </button>

                </div>
              </div>
            </div>
            <div className="card-body">

              {defaultCompany ? <div className="form-group">
                <label className="m-0 required">{i18n.t('store_edit.company')}</label>
                <select
                  value={defaultCompany._id}
                  disabled={true}
                  className="form-control">
                  <option value={defaultCompany._id}>{defaultCompany.name}</option>
                </select>
              </div> : null}

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('store_edit.city')}</label>
                    <input type="text" placeholder={i18n.t('placeholder.text')}
                           className="form-control"
                           onChange={this.changeString('city')}
                           value={model.city || ''}/>
                    {this.getError('city')}
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('store_edit.address')}</label>
                    <input type="text" placeholder={i18n.t('placeholder.text')}
                           className="form-control"
                           onChange={this.changeString('address')}
                           value={model.address || ''}/>
                    {this.getError('address')}
                  </div>

                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="m-0">{i18n.t('store_edit.coordinates')}</label>

                    <div className="input-group">
                      <input type="text" placeholder={i18n.t('store_edit.lat')}
                             className="form-control"
                             onChange={this.changeFloat('lat')}
                             value={model.lat || ''}/>
                      <input type="text" placeholder={i18n.t('store_edit.lng')}
                             className="form-control"
                             onChange={this.changeFloat('lng')}
                             value={model.lng || ''}/>
                    </div>
                    {this.getError('coordinates')}

                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">

              <h4 className="card-title">{i18n.t('store_edit.conditions_title')}</h4>
              <h6 className="card-subtitle mb-2 text-muted">{i18n.t('store_edit.conditions_subtitle')}</h6>

              <div className="row">
                {conditions.map(condition =>
                  <div key={condition.code} className="col-12 col-md-6 col-lg-4">
                    <BonusCondition
                      onClick={this.setCondition(condition.code)}
                      title={condition.title}
                      content={condition.description}
                      selected={model.bonusCondition === condition.code}/>
                  </div>)}
              </div>
            </div>
          </div>

          {/*{this.renderDelete()}*/}

        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  defaultCompany: store => store.App.defaultCompany,
  conditions: store => store.Conditions.items,
  StoreEdit: store => store.StoreEdit,
})

export default withRouter(
  connect(selectors)(StoreEdit)
)