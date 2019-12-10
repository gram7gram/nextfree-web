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

    const {userId} = this.props.QRScanner.model

    console.log('decoded qr code:', json)

    if (!json) return

    try {

      const data = JSON.parse(json)

      if (!data || !data.user || data.user === userId) return

      this.change('userId', data.user)

      this.props.dispatch(FetchUser(data.user))

    } catch (e) {
      console.log(e);
    }

  }

  purchase = () => {
    const {model} = this.props.QRScanner

    this.props.dispatch(Purchase(model))
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

    return model.userId && model.storeId && model.companyId
  }

  renderSuccess() {

    const {purchase} = this.props.QRScanner

    if (!purchase) return null

    if (purchase.isBonus) {

      const buyer = purchase.buyer.user.lastName + ' ' + purchase.buyer.user.firstName

      return <div className="container-fluid fixed-bottom qr-toolbar">
        <div className="row mb-4 no-gutters">
          <div className="col-12 col-md-8 col-lg-6 mx-auto">
            <div className="alert alert-success text-center">
              <h4>{i18n.t('qr_scanner.purchase_bonus_title')}</h4>
              <p>{i18n.t('qr_scanner.purchase_bonus_subtitle').replace('__NAME__', buyer)}</p>

              <button className="btn btn-success" onClick={this.setDefaults}>
                {i18n.t('qr_scanner.again_action')}
              </button>
            </div>
          </div>
        </div>
      </div>
    }

    return <div className="container-fluid fixed-bottom qr-toolbar">
      <div className="row mb-4 no-gutters">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <div className="alert alert-light text-center">
            <h4>{i18n.t('qr_scanner.purchase_success_title')}</h4>
            <p>{i18n.t('qr_scanner.purchase_success_subtitle')}</p>

            <button className="btn btn-success" onClick={this.setDefaults}>
              {i18n.t('qr_scanner.again_action')}
            </button>
          </div>
        </div>
      </div>
    </div>
  }

  renderPurchaseForm() {

    const {isLoading, serverErrors} = this.props.QRScanner

    const isValid = this.isValid()

    return <>
      <Errors errors={serverErrors}/>

      <div className="row text-center no-gutters">

        <div className="col-5 col-md-6 text-center text-md-left">
          <button className="btn btn-outline-warning mr-1 mb-1"
                  onClick={this.setDefaults}>
            <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.discard')}
          </button>
        </div>

        <div className="col-7 col-md-6 text-center text-md-right">
          <button className={"btn " + (!isValid || isLoading ? "btn-outline-success" : "btn-success")}
                  onClick={this.purchase}
                  disabled={!isValid || isLoading}>
            <i className={"fa " + (isLoading ? "fa-spin fa-circle-notch" : "fa-check")}/>
            &nbsp;{i18n.t('qr_scanner.purchase_action')}
          </button>
        </div>
      </div>
    </>
  }

  renderStep3 = () => {

    const {user} = this.props.QRScanner.model

    return <div className="container-fluid fixed-bottom qr-toolbar">
      <div className="row mb-4 no-gutters">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">

          <div className="card">
            <div className="card-body px-2">

              <h4 className="text-center">
                {i18n.t('qr_scanner.purchase_title_1')}
                &nbsp;<span className="text-success">{user.lastName + ' ' + user.firstName}</span>
                &nbsp;{i18n.t('qr_scanner.purchase_title_2')}
              </h4>

              {this.renderPurchaseForm()}

            </div>
          </div>

        </div>
      </div>

    </div>

  }

  renderStep2 = () => {

    const {isLoadingUser, serverErrors} = this.props.QRScanner
    const {user} = this.props.QRScanner.model

    if (!user) {

      if (isLoadingUser) {
        return <div className="container-fluid fixed-bottom qr-toolbar">
          <div className="row mb-4 no-gutters">
            <div className="col-12 col-md-8 col-lg-6 mx-auto">

              <div className="alert alert-secondary">
                <h4 className="m-0">{i18n.t('qr_scanner.searching')}</h4>
              </div>
            </div>
          </div>
        </div>
      }

      return <div className="container-fluid fixed-bottom qr-toolbar">
        <div className="row mb-4 no-gutters">
          <div className="col-12 col-md-8 col-lg-6 mx-auto text-center">

            <div className="alert alert-danger">
              <h4 className="m-0">{serverErrors[0]}</h4>
            </div>

            <button className="btn btn-warning mr-1 mb-1"
                    onClick={this.setDefaults}>
              <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.discard')}
            </button>
          </div>
        </div>
      </div>
    }

    return this.renderStep3()
  }

  renderStep1 = () => {

    return <div className="container-fluid fixed-bottom qr-toolbar">
      <div className="row mb-4 no-gutters">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">

          <div className="alert alert-warning">

            <h4 className="text-center">{i18n.t('qr_scanner.help')}</h4>

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

    const {isSuccess} = this.props.QRScanner
    const {userId} = this.props.QRScanner.model

    const hasUser = !!userId

    return <div className="w-100">

      <div className="qr-stack">
        <div className="qr-scanner-container text-center w-100">
          <video ref={this.htmlVideo}  muted
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
  QRScanner: store => store.QRScanner,
})

export default connect(selectors)(QRScanner)
