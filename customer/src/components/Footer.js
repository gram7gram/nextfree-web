import React from 'react';
import i18n from '../i18n';

const Footer = () => {

  return <footer className="position-absolute w-100 border-top">

    <div className="container">

      <div className="row my-3">
        <div className="col-12 col-md-6 col-lg-4">
          <h4>{i18n.t('footer.resources')}</h4>

          <ul className="m-0">
            <li>
              <a href="/privacy">{i18n.t('footer.privacy')}</a>
            </li>
            <li>
              <a href="/terms">{i18n.t('footer.terms')}</a>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <div className="container text-center">
      <p className="small text-muted">{i18n.t('footer.copyright')}</p>
    </div>
  </footer>
}

export default Footer