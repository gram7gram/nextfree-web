import React from 'react';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Purchase from '../actions/Purchase'
import {MODEL_CHANGED, RESET, SET_DEFAULTS} from "../actions";
import Errors from "../../../components/Errors";

import PurchaseBonus from "./PurchaseBonus";
import PurchaseSuccess from "./PurchaseSuccess";
import Customer from "./Customer";
import IdInput from "./IdInput";

class QRScannerById extends React.PureComponent {

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

  purchase = () => {
    const {model} = this.props.QRScanner

    if (!this.isValid()) return

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

    const {isLoading, serverErrors} = this.props.QRScanner

    const isValid = this.isValid()

    return <>
      <Errors errors={serverErrors}/>

      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label className="required">{i18n.t('qr_scanner.find_user_placeholder')}</label>
            <IdInput
              onSubmit={this.purchase}/>
          </div>
        </div>
      </div>

      <Customer/>

      <div className="text-right d-none d-md-block">
        <button className="btn btn-sm btn-default mr-1"
                onClick={this.setDefaults}>
          <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.discard')}
        </button>
        <button className="btn btn-sm btn-primary"
                onClick={this.purchase}
                disabled={!isValid || isLoading}>
          <i className={"fa " + (isLoading ? "fa-spin fa-circle-notch" : "fa-check")}/>
          &nbsp;{i18n.t('qr_scanner.purchase_action')}
        </button>
      </div>

      <div className="d-block d-md-none">
        <button className="btn btn-block mb-3 btn-default"
                onClick={this.setDefaults}>
          <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.discard')}
        </button>
        <button className="btn btn-block mb-3 btn-primary"
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

          <div className="row text-center qr-steps my-4">
            <div className="col-6">
              <div className="step">
                <h4 className="circle mx-auto p-2">
                  {model.userId && model.match && model.match.isEnabled
                    ? <i className="fa fa-check text-primary"/>
                    : '1'}
                </h4>
                <h5>{i18n.t('qr_scanner.step2')}</h5>
              </div>
            </div>
            <div className="col-6">
              <div className="step">
                <h4 className="circle mx-auto p-2">
                  {purchase && purchase._id
                    ? <i className="fa fa-check text-primary"/>
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

export default connect(selectors)(QRScannerById)
