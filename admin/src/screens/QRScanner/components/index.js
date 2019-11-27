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

  state = {
    hasCamera: true,
    hasCameraPermission: null
  }

  constructor(props) {
    super(props);
    this.htmlVideo = React.createRef();
  }

  componentDidMount() {

    try {
      Scanner.hasCamera().then(result => {

        this.setState({
          hasCamera: result
        })

        if (result) {
          this.scanner = new Scanner(this.htmlVideo.current, this.onResult)

          try {
            this.scanner.start();

            this.setState({
              hasCameraPermission: true
            })
          } catch (e) {
            console.log(e);

            this.setState({
              hasCameraPermission: false
            })
          }
        }

      })
    } catch (e) {
      console.log(e);

      this.setState({
        hasCameraPermission: false
      })
    }
  }

  onResult = json => {

    const {userId} = this.props.QRScanner.model

    console.log('decoded qr code:', json)

    if (!json) return

    try {

      const data = JSON.parse(json)

      if (!data || !data.user || data.user === userId) return

      this.props.dispatch({
        type: MODEL_CHANGED,
        payload: {
          userId: data.user
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

    if (this.scanner) {
      try {
        this.scanner.destroy()
        this.scanner = null
      } catch (e) {
        console.log(e);
      }
    }

    this.props.dispatch({
      type: RESET,
    })
  }

  renderSuccess() {

    const {isSuccess, purchase} = this.props.QRScanner

    if (!isSuccess || !purchase) return null

    if (purchase.isBonus) {

      const buyer = purchase.buyer.user.lastName + ' ' + purchase.buyer.user.firstName

      return <div className="alert alert-success">
        <h4>{i18n.t('qr_scanner.purchase_bonus_title')}</h4>
        <p>{i18n.t('qr_scanner.purchase_bonus_subtitle').replace('__NAME__', buyer)}</p>
      </div>
    }

    return <div className="alert alert-light">
      <h4>{i18n.t('qr_scanner.purchase_success_title')}</h4>
      <p>{i18n.t('qr_scanner.purchase_success_subtitle')}</p>
    </div>
  }

  renderCameraPermission = () => {

    if (this.state.hasCameraPermission === null) {
      return <div className="text-muted">
        <i className="fa fa-spin fa-circle-notch"/>&nbsp;{i18n.t('qr_scanner.checking_camera_permission')}
      </div>
    }

    if (!this.state.hasCameraPermission) {
      return <div className="text-danger">
        <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.no_camera_permission')}
      </div>
    }

    return <div className="text-success">
      <i className="fa fa-check"/>&nbsp;{i18n.t('qr_scanner.has_camera_permission')}
    </div>
  }

  render() {

    const {isLoading, model, serverErrors} = this.props.QRScanner

    const isValid = !!model.userId

    return <div className="container py-5">
      <div className="row">

        <div className="col-11 col-md-8 col-lg-6 mx-auto mb-4">

          <div className="qr-scanner-container text-center w-100">
            <video ref={this.htmlVideo}
                   className={"img-fluid bg-secondary " + (isValid ? "has-result" : "no-result")}/>
          </div>

          {!this.state.hasCamera
            ? <div className="text-danger">
              <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.no_camera')}
            </div>
            : <div className="text-success">
              <i className="fa fa-check"/>&nbsp;{i18n.t('qr_scanner.has_camera')}
            </div>}
          {this.renderCameraPermission()}
        </div>

        <div className="col-12 text-center">

          <p className="text-muted">{i18n.t('qr_scanner.help')}</p>

          <Errors errors={serverErrors}/>

          {this.renderSuccess()}

          <button className={"btn " + (!isValid || isLoading ? "btn-outline-success" : "btn-success")}
                  onClick={this.purchase}
                  disabled={!isValid || isLoading}>
            <i className={"fa " + (isLoading ? "fa-spin fa-circle-notch" : "fa-check")}/>
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
