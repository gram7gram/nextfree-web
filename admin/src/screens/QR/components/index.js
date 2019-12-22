import React from 'react';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import QrCode from "../../../components/QrCode";

const QR = (props) => {

  const {_id, user} = props.admin

  const data = JSON.stringify({owner: _id, user: user.displayId})

  return <div className="container py-5">
    <div className="row">
      <div className="col-11 col-md-8 col-lg-6 cpl-xl-5 mx-auto text-center">

        <div className="mb-4">
          <QrCode data={data}/>
        </div>

        <p className="text-muted">{i18n.t('qr.help')}</p>
        <p className="text-muted">{i18n.t('qr.help_alt')}</p>

        <div className="alert alert-secondary">
          <h2 className="m-0">ID: {user.displayId || '-'}</h2>
        </div>

      </div>
    </div>
  </div>

}

const selectors = createStructuredSelector({
  admin: store => store.App.admin
})

export default connect(selectors)(QR)
