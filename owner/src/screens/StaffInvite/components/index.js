import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Save from '../actions/Save';
import FetchStores from '../../Store/actions/Fetch';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import {MODEL_CHANGED, RESET} from "../actions";
import PageTitle from "../../../components/PageTitle";

class StaffInvite extends React.Component {

  componentDidMount() {
    const {defaultCompany, defaultStore} = this.props

    this.props.dispatch(FetchStores())

    if (defaultStore && defaultCompany) {
      this.props.dispatch({
        type: MODEL_CHANGED,
        payload: {
          companyId: defaultCompany._id,
          storeId: defaultStore._id,
        }
      })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: RESET
    })
  }

  submit = () => {
    const {model} = this.props.StaffInvite

    this.props.dispatch(Save({
      ...model,
      isEnabled: true
    }))
  }

  change = (key, value = null) => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      [key]: value
    }
  })

  changeString = name => e => this.change(name, e.target.value)

  getError = key => {
    const {errors} = this.props.StaffInvite.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  renderPosition() {

    const {defaultCompany, stores} = this.props
    const {model} = this.props.StaffInvite

    return <div className="card mb-4">
      <div className="card-header">
        <h5 className="m-0">{i18n.t('staff_invite.position_title')}</h5>
      </div>
      <div className="card-body px-0">

        <p className="text-secondary">
          <i className="fa fa-info-circle"/>&nbsp;{i18n.t('staff_invite.position_subtitle')}
        </p>

        <div className="row">

          <div className="col-12 col-md-6">
            {defaultCompany ? <div className="form-group">
              <label className="m-0 required">{i18n.t('staff_invite.company')}</label>
              <select
                value={defaultCompany._id}
                disabled={true}
                className="form-control">
                <option value={defaultCompany._id}>{defaultCompany.name}</option>
              </select>
              {this.getError('companyId')}
            </div> : null}
          </div>

          <div className="col-12 col-md-6">

            <div className="form-group">
              <label className="m-0 required">{i18n.t('staff_invite.store')}</label>
              <select
                value={model.storeId || ''}
                disabled={!model.companyId}
                onChange={this.changeString('storeId')}
                className="form-control">
                <option value="" disabled={true}>{i18n.t('placeholder.select')}</option>
                {stores
                  .map(item => <option key={item._id} value={item._id}>{item.address || item._id}</option>)}
              </select>
              {this.getError('storeId')}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="m-0">{i18n.t('staff_invite.position')}</label>
          <input type="text" placeholder={i18n.t('placeholder.text')}
                 className="form-control"
                 onChange={this.changeString('position')}
                 value={model.position || ''}/>
          {this.getError('position')}
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
    } = this.props.StaffInvite

    const buttons = [
      {
        text: i18n.t('staff_invite.save_action'),
        icon: "fa-save",
        mainClass: "btn-primary",
        onClick: this.submit,
        disabled: isLoading || !isValid,
        isLoading
      }
    ]

    return <div className="container my-3">
      <div className="row">

        <div className="col-12">
          <PageTitle
            title={i18n.t('staff_invite.title')}
            buttons={buttons}
            serverErrors={serverErrors}/>
        </div>

        <div className="col-12">

          <div className="mb-4">

            <h6 className="text-secondary">
              <i className="fa fa-info-circle"/>&nbsp;{i18n.t('staff_invite.subtitle')}
            </h6>

            <div className="form-group">
              <label className="m-0 required">{i18n.t('staff_invite.email')}</label>
              <input type="text" placeholder={i18n.t('placeholder.text')}
                     className="form-control"
                     onChange={this.changeString('user.email')}
                     value={model.user.email || ''}/>
              {this.getError('user.email')}
            </div>
          </div>

          {this.renderPosition()}

        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  StaffInvite: store => store.StaffInvite,
  defaultCompany: store => store.App.defaultCompany,
  defaultStore: store => store.App.defaultStore,
  stores: store => store.Store.items,
})

export default withRouter(
  connect(selectors)(StaffInvite)
)