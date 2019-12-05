import React from 'react';
import i18n from '../i18n';

const Footer = () => {

  return <footer className="position-absolute w-100 border-top py-5 mt-5">

    <div className="container">

      <div className="row text-center">
        <div className="col-12 col-md-6 col-lg-4">
          <a href="https://nextfree.com.ua/privacy"
             className="btn btn-link">{i18n.t('footer.privacy')}</a>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <a href="mailto:nextfree.adm@gmail.com"
             className="btn btn-link">{i18n.t('footer.contact')}</a>
        </div>
      </div>

    </div>
  </footer>
}

export default Footer