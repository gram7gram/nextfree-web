import React from 'react';
import {Link} from 'react-router-dom';
import i18n from "../i18n";
import * as Pages from "../router/Pages";

const ProfileSidebar = () => {

  return <nav className="bg-primary mb-4">

    <Link to={Pages.PROFILE}
          className="btn btn-link btn-block text-left">
      {i18n.t('navigation.profile')}
    </Link>

    <Link to={Pages.PROFILE_SECURITY}
          className="btn btn-link btn-block text-left">
      {i18n.t('navigation.profile_security')}
    </Link>

  </nav>
}

export default ProfileSidebar
