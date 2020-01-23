import React from 'react';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import QrCode from "../../../components/QrCode";

const QR = (props) => {

  const {_id, user} = props.owner

  const data = JSON.stringify({owner: _id, user: user.displayId})

  return <div className="container py-5">
    <div className="row">
      <div className="col-11 col-md-8 col-lg-6 cpl-xl-5 mx-auto text-center">

        <div className="alert alert-secondary">
          <h4 className="m-0">{i18n.t('qr.your_id')}: {user.displayId || '-'}</h4>
        </div>

        <div className="mb-4">
          <QrCode data={data}/>
        </div>

        <p className="text-secondary">{i18n.t('qr.help')}</p>

      </div>
    </div>
  </div>

}

const selectors = createStructuredSelector({
  owner: store => store.App.owner
})

export default connect(selectors)(QR)
