import React from 'react';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import QrCode from "../../../components/QrCode";

const QR = (props) => {

  const {_id, user} = props.admin

  const data = JSON.stringify({owner: _id, user: user._id})

  return <div className="container py-5">
    <div className="row">
      <div className="col-10 mx-auto mb-4">

        <QrCode data={data}/>

      </div>

      <div className="col-12 text-center">

        <p className="text-muted">{i18n.t('qr.help')}</p>

      </div>
    </div>
  </div>

}

const selectors = createStructuredSelector({
  admin: store => store.App.admin
})

export default connect(selectors)(QR)
