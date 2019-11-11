import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import * as Pages from '../../../router/Pages';
import {createStructuredSelector} from "reselect";
import QrCode from "../../../components/QrCode";

const QR = (props) => {

  const {_id} = props.owner

  const data = _id

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
  owner: store => store.App.owner
})

export default connect(selectors)(QR)
