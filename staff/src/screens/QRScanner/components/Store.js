import React from 'react';
import {useSelector} from 'react-redux';
import i18n from '../../../i18n';

const Customer = () => {

  const store = useSelector(state => state.App.store)
  const model = useSelector(state => state.QRScanner.model)

  const stores = store ? [store] : []

  return <div className="row">
    <div className="col-12">
      <div className="form-group">
        <label className="m-0 required">{i18n.t('qr_scanner.store')}</label>
        <select
          name="storeId"
          value={model.storeId || ''}
          disabled={true}
          className="form-control">
          <option value="" disabled={true}>{i18n.t('placeholder.select')}</option>
          {stores
            .map(item => <option key={item._id} value={item._id}>{item.address || item._id}</option>)}
        </select>
      </div>
    </div>
  </div>
}

export default Customer
