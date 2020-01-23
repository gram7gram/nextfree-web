import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import Fetch from '../actions/Fetch';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import BonusCondition from "../../../components/BonusCondition";
import FetchConditions from "../../App/actions/FetchConditions";
import {LogotypeBody} from "../../../components/Logotype";
import Upload from "../actions/Upload";
import Sidebar from "./Sidebar";
import PageTitle from "../../../components/PageTitle";

class CompanyEdit extends React.Component {

  componentDidMount() {

    const {defaultCompany} = this.props

    this.props.dispatch(FetchConditions())

    if (defaultCompany) {
      this.props.dispatch(Fetch(defaultCompany._id))
    }
  }

  deactivate = () => {
    const {model} = this.props.CompanyEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: false
    }))
  }

  activate = () => {
    const {model} = this.props.CompanyEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: true
    }))
  }

  submit = () => {
    const {model} = this.props.CompanyEdit

    this.props.dispatch(Save(model))
  }

  change = (key, value = null) => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      [key]: value
    }
  })

  changeString = name => e => this.change(name, e.target.value)

  setCondition = value => () => this.change('bonusCondition', value)

  setLogotype = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const {
      model,
    } = this.props.CompanyEdit

    if (file.size / 1024 > 1000) {
      e.target.value = null
      return;
    }

    this.props.dispatch(Upload(model.id, file))

    e.target.value = null
  }

  getError = key => {
    const {errors} = this.props.CompanyEdit.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  render() {

    const {conditions} = this.props

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.CompanyEdit

    const buttons = []

    if (model.id) {
      if (model.isEnabled) {
        buttons.push({
          text: i18n.t('company_edit.deactivate_action'),
          icon: "fa-ban",
          mainClass: "btn-default",
          onClick: this.deactivate,
          disabled: isLoading || !isValid,
          isLoading
        })
      } else {
        buttons.push({
          text: i18n.t('company_edit.activate_action'),
          icon: "fa-check",
          mainClass: "btn-primary",
          onClick: this.activate,
          disabled: isLoading || !isValid,
          isLoading
        })
      }
    }

    buttons.push({
      text: i18n.t('company_edit.save_action'),
      icon: "fa-save",
      mainClass: "btn-primary",
      onClick: this.submit,
      disabled: isLoading || !isValid,
      isLoading
    })

    return <div className="container-fluid my-3">
      <div className="row">

        <div className="col-12">
          <PageTitle
            title={i18n.t('navigation.my_company')}
            buttons={buttons}
            serverErrors={serverErrors}/>
        </div>

        <div className="col-12 col-md-4 col-lg-3">
          <Sidebar/>
        </div>

        <div className="col-12 col-md-8 col-lg-9">

          <div className="mb-4">

            <div className="form-group">
              <label className="m-0 required">{i18n.t('company_edit.name')}</label>
              <input type="text" placeholder={i18n.t('placeholder.text')}
                     className="form-control"
                     onChange={this.changeString('name')}
                     value={model.name || ''}/>
              {this.getError('name')}
            </div>

          </div>

          <div className="row">
            <div className="col-12 col-md-6">

              <div className="card mb-4 bg-dark-gray">
                <div className="card-body">
                  <LogotypeBody src={model.logo}/>
                </div>
                <div className="card-footer p-1">
                  <div className="form-group text-center">
                    <label className="btn btn-secondary btn-sm m-0">
                      <i className="fa fa-upload"/>&nbsp;{i18n.t('company_edit.upload_action')}
                      <input type="file" className="d-none"
                             accept="image/*" max={1} min={1}
                             onChange={this.setLogotype}
                             disabled={isLoading}/>
                    </label>
                  </div>

                  <div className="text-secondary">
                    <i className="fa fa-info-circle"/>&nbsp;{i18n.t('company_edit.avatar_info')}
                  </div>
                  <div className="text-secondary">
                    <i className="fa fa-info-circle"/>&nbsp;{i18n.t('validation.avatar_rule_size')}
                  </div>
                  <div className="text-secondary">
                    <i className="fa fa-info-circle"/>&nbsp;{i18n.t('validation.avatar_rule_aspect')}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body px-0">

              <h4 className="card-title">{i18n.t('company_edit.conditions_title')}</h4>
              <h6 className="card-subtitle mb-2 text-secondary">{i18n.t('company_edit.conditions_subtitle')}</h6>

              <div className="row">
                {conditions.map(condition =>
                  <div key={condition.code} className="col-12 col-md-6">
                    <BonusCondition
                      onClick={this.setCondition(condition.code)}
                      title={condition.title}
                      content={condition.description}
                      selected={model.bonusCondition === condition.code}/>
                  </div>)}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  defaultCompany: store => store.App.defaultCompany,
  conditions: store => store.Conditions.items,
  CompanyEdit: store => store.CompanyEdit,
})

export default connect(selectors)(CompanyEdit)