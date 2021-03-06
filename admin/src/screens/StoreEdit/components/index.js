import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FETCH_SUCCESS, MODEL_CHANGED, RESET} from '../actions';
import Fetch from '../actions/Fetch';
import FetchCompanies from '../../Company/actions/Fetch';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import PageTitle from "../../../components/PageTitle";

class StoreEdit extends React.Component {

  componentDidMount() {

    const {match} = this.props

    const {id} = match.params

    if (id) {
      this.props.dispatch(Fetch(id))
    } else {
      this.props.dispatch({
        type: FETCH_SUCCESS,
        payload: {},
        flatten: {},
      })
    }

    this.props.dispatch(FetchCompanies())
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

  getError = key => {
    const {errors} = this.props.StoreEdit.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  render() {

    const {companies, conditions} = this.props

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

    const buttons = []

    if (model.id && !model.isEnabled) {
      buttons.push({
        mainClass: "btn-primary",
        disabled: isLoading || !isValid,
        onClick: this.activate,
        icon: "fa-check",
        text: i18n.t('store_edit.activate_action'),
        isLoading
      })

    }

    if (model.id && model.isEnabled) {
      buttons.push({
        mainClass: "btn-default",
        disabled: isLoading || !isValid,
        onClick: this.deactivate,
        icon: "fa-ban",
        text: i18n.t('store_edit.deactivate_action'),
        isLoading
      })
    }

    buttons.push({
      mainClass: "btn-primary",
      disabled: isLoading || !isValid,
      onClick: this.submit,
      icon: "fa-save",
      text: i18n.t('store_edit.save_action'),
      isLoading
    })

    return <div className="container my-3">
      <div className="row">

        <div className="col-12">
          <PageTitle
            title={title}
            buttons={buttons}
            serverErrors={serverErrors}/>
        </div>

        <div className="col-12">

          <div className="mb-4">

            <div className="form-group">
              <label className="m-0 required">{i18n.t('store_edit.company')}</label>
              <select
                value={model.companyId || ''}
                onChange={this.changeString('companyId')}
                className="form-control">
                <option value="">{i18n.t('placeholder.select')}</option>
                {companies.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
              </select>
              {this.getError('companyId')}
            </div>

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

      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  companies: store => store.Company.items,
  StoreEdit: store => store.StoreEdit,
})

export default withRouter(
  connect(selectors)(StoreEdit)
)