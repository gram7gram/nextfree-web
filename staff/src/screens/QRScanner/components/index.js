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

  isMounted = false

  state = {
    hasCamera: true,
    hasCameraPermission: null
  }

  constructor(props) {
    super(props);
    this.htmlVideo = React.createRef();
  }

  componentDidMount() {

    this.isMounted = true

    try {
      Scanner.hasCamera().then(result => {

        this.setState({
          hasCamera: result
        })

        if (result) {
          this.scanner = new Scanner(this.htmlVideo.current, this.onResult)

          try {
            if (this.isMounted)
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

    this.setDefaults()
  }

  componentWillUnmount() {

    this.isMounted = false

    this.stopScanner()

    try {
      if (this.htmlVideo.current)
        this.htmlVideo.current.pause()
    } catch (e) {
      console.log(e);
    }

    this.props.dispatch({
      type: RESET,
    })
  }

  setDefaults = () => {

    const {store, company} = this.props

    this.props.dispatch({
      type: MODEL_CHANGED,
      payload: {
        companyId: company ? company._id : null,
        storeId: store ? store._id : null,
        userId: null,
      }
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

      this.stopScanner()

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

      return <div className="alert alert-success text-center">
        <h4>{i18n.t('qr_scanner.purchase_bonus_title')}</h4>
        <p>{i18n.t('qr_scanner.purchase_bonus_subtitle').replace('__NAME__', buyer)}</p>

        <button className="btn btn-success" onClick={this.setDefaults}>
          {i18n.t('qr_scanner.again_action')}
        </button>
      </div>
    }

    return <div className="alert alert-light text-center">
      <h4>{i18n.t('qr_scanner.purchase_success_title')}</h4>
      <p>{i18n.t('qr_scanner.purchase_success_subtitle')}</p>

      <button className="btn btn-success" onClick={this.setDefaults}>
        {i18n.t('qr_scanner.again_action')}
      </button>
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

  renderCardContent() {

    const {isLoading, serverErrors, isSuccess} = this.props.QRScanner

    const isValid = this.isValid()

    if (isSuccess) {
      return this.renderSuccess()
    }

    return <>
      <p className="text-muted text-center">{i18n.t('qr_scanner.help')}</p>

      <div className="mb-4">
        {!this.state.hasCamera
          ? <div className="text-danger">
            <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.no_camera')}
          </div>
          : <div className="text-success">
            <i className="fa fa-check"/>&nbsp;{i18n.t('qr_scanner.has_camera')}
          </div>}

        {this.renderCameraPermission()}
      </div>

      <Errors errors={serverErrors}/>

      <div className="text-center">

        <button className="btn btn-outline-warning mr-1"
                onClick={this.setDefaults}>
          <i className="fa fa-times"/>&nbsp;{i18n.t('qr_scanner.discard')}
        </button>

        <button className={"btn " + (!isValid || isLoading ? "btn-outline-success" : "btn-success")}
                onClick={this.purchase}
                disabled={!isValid || isLoading}>
          <i className={"fa " + (isLoading ? "fa-spin fa-circle-notch" : "fa-check")}/>
          &nbsp;{i18n.t('qr_scanner.purchase_action')}
        </button>
      </div>
    </>
  }

  render() {

    const isValid = this.isValid()

    return <div className="w-100">

      <div className="qr-stack">
        <div className="qr-scanner-container text-center w-100">
          <video ref={this.htmlVideo}
                 className="img-fluid bg-secondary"/>
        </div>

        <div className="qr-scanner-overlay">

          <table className={"qr-area " + (isValid ? "has-result" : "no-result")}>
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

      <div className={"container-fluid fixed-bottom qr-toolbar " + (isValid ? "has-result" : "no-result")}>
        <div className="row mb-4">
          <div className="col-11 col-md-8 col-lg-6 mx-auto">

            <div className="card">
              <div className="card-body">

                {this.renderCardContent()}

              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  }
}

const selectors = createStructuredSelector({
  company: store => store.App.company,
  store: store => store.App.store,
  QRScanner: store => store.QRScanner,
})

export default connect(selectors)(QRScanner)
