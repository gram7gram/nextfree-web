import React from 'react';
import {useSelector} from 'react-redux';
import i18n from '../../../i18n';
import {AvatarBody} from "../../../components/Avatar";

const Customer = () => {

  const {isLoadingUser, model} = useSelector(state => state.QRScanner)

  const {match} = model

  if (isLoadingUser) {
    return <div className="row">
      <div className="col-12">
        <div className="card mb-4 bg-dark-gray">
          <div className="card-body p-4 text-center">
            <i className="fa fa-2x fa-spin fa-circle-notch"/>
          </div>
        </div>
      </div>
    </div>
  }

  if (!match) {
    if (!model.displayId) return null

    return <div className="row">
      <div className="col-12">
        <div className="card mb-4 bg-dark-gray">
          <div className="card-body p-4 text-center">
            <p>{i18n.t('qr_scanner.no_user_found')}</p>
            <i className="fa fa-2x fa-times"/>
          </div>
        </div>
      </div>
    </div>
  }

  return <div className="row">
    <div className="col-12">
      <div className="card mb-4 bg-dark-gray">
        <div className="card-body p-1">
          <div className="row">
            <div className="col-4 col-md-3">
              <AvatarBody src={match.user.avatar}/>
            </div>
            <div className="col-8 col-md-9">
              <h5 className="mb-1 text-truncate">{match.user.lastName} {match.user.firstName}</h5>

              {match.isEnabled
                ? <div className="badge badge-success">
                  <i className="fa fa-check"/>&nbsp;{i18n.t('profile.enabled_badge')}
                </div>
                : <div className="badge badge-danger">
                  <i className="fa fa-times"/>&nbsp;{i18n.t('profile.disabled_badge')}
                </div>}

              <p className="text-secondary m-0">ID: {match.user.displayId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Customer
