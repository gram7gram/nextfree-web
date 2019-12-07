import React from 'react';
import {Link} from 'react-router-dom';
import i18n from "../../../i18n";
import * as Pages from "../../../router/Pages";
import Avatar from "../../../components/Avatar";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import Upload from "../actions/Upload";

const ProfileSidebar = (props) => {
  
  const {isLoading, model} = props.Profile

  const setAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return

    props.dispatch(Upload(file))

    e.target.value = null
  }

  return <>

    <div className="card text-center mb-2">
      <div className="card-body">
        <Avatar src={model.user.avatar}/>
      </div>
      <div className="card-footer p-1">
        <label className="btn btn-secondary btn-sm m-0">
          <i className="fa fa-upload"/>&nbsp;{i18n.t('profile.upload_action')}
          <input type="file" className="d-none"
                 onChange={setAvatar}
                 disabled={isLoading}/>
        </label>
      </div>
    </div>

    <nav className="bg-primary mb-4">

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
