import React from 'react';
import {captureException} from '@sentry/browser';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Purchase from '../actions/Purchase'
import Scanner from 'qr-scanner'
import {MODEL_CHANGED, RESET, SET_DEFAULTS} from "../actions";
import Errors from "../../../components/Errors";
import FetchUser from '../actions/FetchUser';
import {stopVideoStreams} from "../../../utils/camera";
import PurchaseSuccess from "./PurchaseSuccess";
import PurchaseBonus from "./PurchaseBonus";
import Customer from "./Customer";
import Store from "./Store";

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

    this.setDefaults()

    try {
      Scanner.hasCamera().then(result => {

        this.setState({
          hasCamera: result
        })

        if (result) {

          try {

            this.scanner = new Scanner(this.htmlVideo.current, this.onResult)
            this.scanner.start();

            this.setState({
              hasCameraPermission: true
            })
          } catch (e) {
            console.log(e);
            captureException(e)

            this.setState({
              hasCameraPermission: false
            })
          }
        }

      })

    } catch (e) {
      console.log(e);

      this.setState({
        hasCamera: false,
        hasCameraPermission: false
      })
    }
  }

  async componentWillUnmount() {

    this.stopScanner()

    await stopVideoStreams()

    try {
      if (this.htmlVideo.current) {
        this.htmlVideo.current.pause()
        this.htmlVideo.current.srcObject = null
      }
    } catch (e) {
      console.log(e);
    }

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

  onResult = json => {

    const {displayId} = this.props.QRScanner.model

    console.log('decoded qr code:', json)

    if (!json) return

    try {

      const data = JSON.parse(json)

      if (!data || !data.user || data.user === displayId) return

      this.change('displayId', data.user)

      this.props.dispatch(FetchUser(data.user))

    } catch (e) {
      console.log(e);
    }

  }

  purchase = () => {
    const {model} = this.props.QRScanner

    this.props.dispatch(Purchase({
      userId: model.userId,
      storeId: model.storeId,
      companyId: model.companyId,
    }))
  }

  stopScanner() {
    if (this.scanner) {
      try {
        this.scanner.destroy()
      } catch (e) {
        console.log(e);
      }
    }
  }

  isValid = () => {
    const {model} = this.props.QRScanner

    return model.userId && model.storeId && model.match && model.match.isEnabled
  }

  renderSuccess() {

    const {purchase} = this.props.QRScanner

    if (!purchase) return null

    if (purchase.isBonus) {
      return <div className="container-fluid fixed-bottom qr-toolbar">
        <div className="row no-gutters">
          <div className="col-12 col-md-8 col-lg-6 mx-auto">
            <PurchaseBonus/>
          </div>
        </div>
      </div>
    }

    return <div className="container-fluid fixed-bottom qr-toolbar">
      <div className="row no-gutters">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <PurchaseSuccess/>
        </div>
      </div>
    </div>
  }

  renderPurchaseForm() {

    const {isLoading, serverErrors} = this.props.QRScanner

    const isValid = this.isValid()

    return <>
      <Errors errors={serverErrors}/>

      <Store/>

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

  renderStep2 = () => {

    return <div className="container-fluid fixed-bottom qr-toolbar">
      <div className="row no-gutters">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">

          <div className="card">
            <div className="card-body px-2">

              <h5 className="text-center">
                {i18n.t('qr_scanner.purchase_title_1')}
                &nbsp;{i18n.t('qr_scanner.purchase_title_2')}
              </h5>

              {this.renderPurchaseForm()}

            </div>
          </div>

        </div>
      </div>

    </div>

  }

  renderStep1 = () => {

    return <div className="container-fluid fixed-bottom qr-toolbar">
      <div className="row no-gutters">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">

          <div className="alert alert-warning">

            <h5 className="text-center">{i18n.t('qr_scanner.help')}</h5>

            <p className="m-0 text-center">{i18n.t('qr_scanner.help_subtitle')}</p>

            {!this.state.hasCamera
              ? <div className="text-danger mb-2">
                <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.no_camera')}
              </div>
              : null}

            {this.state.hasCameraPermission === null
              ? <div className="text-muted mb-2">
                <i className="fa fa-spin fa-circle-notch"/>&nbsp;{i18n.t('qr_scanner.checking_camera_permission')}
              </div>
              : null}

            {this.state.hasCameraPermission === false
              ? <div className="text-danger mb-2">
                <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.no_camera_permission')}
              </div>
              : null}

          </div>

        </div>
      </div>

    </div>
  }

  render() {

    const {purchase} = this.props.QRScanner
    const {userId} = this.props.QRScanner.model

    const isSuccess = purchase && purchase._id
    const hasUser = !!userId

    return <div className="w-100">

      <div className="qr-stack">
        <div className="qr-scanner-container text-center w-100">
          <video ref={this.htmlVideo} muted
                 className="img-fluid bg-secondary"/>
        </div>

        <div className="qr-scanner-overlay">

          <table className={"qr-area " + (hasUser ? "has-result" : "no-result")}>
            <tbody>
            <tr>
              <td className="has-border border-left border-top"/>
              <td/>
              <td className="has-border border-right border-top"/>
            </tr>
            <tr>
              <td/>
              <td/>
              <td/>
            </tr>
            <tr>
              <td className="has-border border-left border-bottom"/>
              <td/>
              <td className="has-border border-right border-bottom"/>
            </tr>
            </tbody>
          </table>

        </div>
      </div>

      {isSuccess
        ? this.renderSuccess()
        : null}

      {!isSuccess && !hasUser
        ? this.renderStep1()
        : null}

      {!isSuccess && hasUser
        ? this.renderStep2()
        : null}

    </div>
  }
}

const selectors = createStructuredSelector({
  defaultCompany: store => store.App.defaultCompany,
  QRScanner: store => store.QRScanner,
})

export default connect(selectors)(QRScanner)
