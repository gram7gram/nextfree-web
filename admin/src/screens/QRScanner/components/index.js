import React from 'react';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Purchase from '../actions/Purchase'
import Scanner from 'qr-scanner'
import {MODEL_CHANGED, RESET} from "../actions";
import Errors from "../../../components/Errors";

Scanner.WORKER_PATH = '/qr-scanner-worker.min.js';

class QRScanner extends React.PureComponent {

  htmlVideo = null
  scanner = null

  constructor(props) {
    super(props);
    this.htmlVideo = React.createRef();
  }

  componentDidMount() {

    try {
      Scanner.hasCamera().then(result => {

        console.log('Has camera?', result)

      }).catch(ignore => {
      })
    } catch (ignore) {
    }

    this.scanner = new Scanner(this.htmlVideo.current, this.onResult)

    try {
      this.scanner.start();
    } catch (e) {
      console.log(e);
    }
  }

  onResult = json => {
    console.log('decoded qr code:', json)

    try {
      const data = JSON.parse(json)

      if (!data || !data.customer) return

      this.props.dispatch({
        type: MODEL_CHANGED,
        payload: {
          customer: data.customer
        }
      })
    } catch (e) {
      console.log(e);
    }

  }

  purchase = () => {
    const {model} = this.props.QRScanner

    this.props.dispatch(Purchase(model))
  }

  componentWillUnmount() {

    this.scanner.destroy()
    this.scanner = null

    this.props.dispatch({
      type: RESET,
    })
  }

  renderSuccess() {

    const {isSuccess, isBonus} = this.props.QRScanner

    if (!isSuccess) return null

    if (isBonus) {
      return <div className="alert alert-success">
        <h4>{i18n.t('qr_scanner.purchase_bonus_title')}</h4>
        <p>{i18n.t('qr_scanner.purchase_bonus_subtitle')}</p>
      </div>
    }

    return <div className="alert alert-light">
      <h4>{i18n.t('qr_scanner.purchase_success_title')}</h4>
      <p>{i18n.t('qr_scanner.purchase_success_subtitle')}</p>
    </div>
  }

  render() {

    const {isLoading, model, serverErrors} = this.props.QRScanner

    const isValid = !!model.customerId

    return <div className="container py-5">
      <div className="row">

        <div className="col-12 mb-4">
          <div className="qr-scanner-container text-center w-100">
            <video ref={this.htmlVideo} className="bg-secondary"/>
          </div>
        </div>

        <div className="col-12 text-center">

          <p className="text-muted">{i18n.t('qr_scanner.help')}</p>

          <Errors errors={serverErrors}/>

          {this.renderSuccess()}

          <button className="btn btn-success"
                  onClick={this.purchase}
                  disabled={!isValid || isLoading}>
            <i className={"fa " + (isLoading ? "fa-spin fa-circle-o-notch" : "fa-check")}/>
            &nbsp;{i18n.t('qr_scanner.purchase_action')}
          </button>

        </div>
      </div>
    </div>

  }
}

const selectors = createStructuredSelector({
  QRScanner: store => store.QRScanner
})

export default connect(selectors)(QRScanner)
