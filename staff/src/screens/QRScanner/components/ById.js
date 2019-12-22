import React from 'react';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Purchase from '../actions/Purchase'
import {MODEL_CHANGED, RESET, SET_DEFAULTS} from "../actions";
import Errors from "../../../components/Errors";
import FetchUser from '../actions/FetchUser';

import PurchaseBonus from "./PurchaseBonus";
import PurchaseSuccess from "./PurchaseSuccess";
import Customer from "./Customer";

class QRScanner extends React.PureComponent {

  componentDidMount() {
    this.setDefaults()
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: RESET,
    })
  }

  setDefaults = () => {
    this.props.dispatch({
      type: SET_DEFAULTS,
    })
  }

  change = (key, value = null) => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      [key]: value
    }
  })

  changeString = name => e => this.change(name, e.target.value)

  fetchUserIfEnter = e => {
    if (e.keyCode === 13) {
      this.fetchUser()
    }
  }

  fetchUser = () => {
    const {displayId} = this.props.QRScanner.model

    this.props.dispatch(FetchUser(displayId))
  }

  purchase = () => {
    const {model} = this.props.QRScanner

    this.props.dispatch(Purchase({
      userId: model.userId,
      storeId: model.storeId,
      companyId: model.companyId,
    }))
  }

  isValid = () => {
    const {model} = this.props.QRScanner

    return model.userId && model.storeId && model.match && model.match.isEnabled
  }

  renderSuccess() {

    const {purchase} = this.props.QRScanner

    if (!purchase) return null

    if (purchase.isBonus) {
      return <PurchaseBonus/>
    }

    return <PurchaseSuccess/>
  }

  renderPurchaseForm() {

    const {isLoading, serverErrors, isLoadingUser, model} = this.props.QRScanner

    const isValid = this.isValid()

    const isIdValid = (model.displayId || '').length > 4

    return <>
      <Errors errors={serverErrors}/>

      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <div className="input-group">
              <input type="text"
                     className="form-control"
                     onKeyDown={this.fetchUserIfEnter}
                     onChange={this.changeString('displayId')}
                     value={model.displayId || ''}
                     placeholder={i18n.t('qr_scanner.find_user_placeholder')}/>
              <div className="input-group-append">
                <button className="btn btn-success"
                        onClick={this.fetchUser}
                        disabled={isLoadingUser || !isIdValid}>
                  <i className="fa fa-search"/>&nbsp;{i18n.t('qr_scanner.find_user_action')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Customer/>

      <div className="text-center text-md-right">
        <button className="btn btn-sm btn-outline-warning mr-1"
                onClick={this.setDefaults}>
          <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.discard')}
        </button>
        <button className={"btn btn-sm " + (!isValid || isLoading ? "btn-outline-success" : "btn-success")}
                onClick={this.purchase}
                disabled={!isValid || isLoading}>
          <i className={"fa " + (isLoading ? "fa-spin fa-circle-notch" : "fa-check")}/>
          &nbsp;{i18n.t('qr_scanner.purchase_action')}
        </button>
      </div>
    </>
  }

  render() {

    const {model, purchase} = this.props.QRScanner

    return <div className="container my-3">
      <div className="row">
        <div className="col-8 mx-auto">

          <div className="row text-center steps my-4">
            <div className="col-6">
              <div className="step">
                <h4 className="circle mx-auto p-2">
                  {model.userId && model.match && model.match.isEnabled
                    ? <i className="fa fa-check text-success"/>
                    : '1'}
                </h4>
                <h5>{i18n.t('qr_scanner.step2')}</h5>
              </div>
            </div>
            <div className="col-6">
              <div className="step">
                <h4 className="circle mx-auto p-2">
                  {purchase && purchase._id
                    ? <i className="fa fa-check text-success"/>
                    : '2'}
                </h4>
                <h5>{i18n.t('qr_scanner.step3')}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-10 col-md-8 col-lg-6 mx-auto">

          {purchase && purchase._id
            ? this.renderSuccess()
            : this.renderPurchaseForm()}

        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  defaultCompany: store => store.App.defaultCompany,
  QRScanner: store => store.QRScanner,
})

export default connect(selectors)(QRScanner)
