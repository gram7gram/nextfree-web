import React from 'react';
import {Link} from 'react-router-dom';
import i18n from "../../../i18n";
import * as Pages from "../../../router/Pages";
import {AvatarBody} from "../../../components/Avatar";
import {createStructuredSelector} from "reselect";
import {connect, useDispatch} from "react-redux";
import Upload from "../actions/Upload";

const ProfileSidebar = (props) => {

  const dispatch = useDispatch()

  const {isLoading, model} = props.Profile

  const setAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size / 1024 > 1000) {
      e.target.value = null
      return;
    }

    dispatch(Upload(model.id, file))

    e.target.value = null
  }

  return <>

    <div className="card mb-4">
      <div className="card-body">
        <AvatarBody src={model.user.avatar}/>
      </div>

      <div className="card-footer p-1">
        <div className="form-group text-center">
          <label className="btn btn-secondary btn-sm m-0">
            <i className="fa fa-upload"/>&nbsp;{i18n.t('profile.upload_action')}
            <input type="file" className="d-none"
                   accept="image/*" max={1} min={1}
                   onChange={setAvatar}
                   disabled={isLoading}/>
          </label>
        </div>

        <div className="text-muted">
          <i className="fa fa-info-circle"/>&nbsp;{i18n.t('validation.avatar_rule_size')}
        </div>
        <div className="text-muted">
          <i className="fa fa-info-circle"/>&nbsp;{i18n.t('validation.avatar_rule_aspect')}
        </div>
      </div>
    </div>

    <nav className="bg-dark-gray mb-4">

      <Link to={Pages.PROFILE}
            className="btn btn-link btn-block text-left">
        {i18n.t('navigation.profile')}
      </Link>

      <Link to={Pages.PROFILE_SECURITY}
            className="btn btn-link btn-block text-left">
        {i18n.t('navigation.profile_security')}
      </Link>

    </nav>
  </>
}

const selectors = createStructuredSelector({
  Profile: store => store.Profile,
})

export default connect(selectors)(ProfileSidebar)