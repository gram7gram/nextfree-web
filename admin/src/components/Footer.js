import React from 'react';
import i18n from '../i18n';

const Footer = () => {

  return <footer className="position-absolute w-100 border-top py-5">

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
        <div className="col-12 col-md-6 col-lg-4">
          <h4>{i18n.t('footer.hosts')}</h4>

          <ul className="m-0">
            <li><a href={'https://owner.nextfree.com.ua'}>{i18n.t('footer.ownerHost')}</a></li>
            <li><a href={'https://staff.nextfree.com.ua'}>{i18n.t('footer.staffHost')}</a></li>
            <li><a href={'https://customer.nextfree.com.ua'}>{i18n.t('footer.customerHost')}</a></li>
          </ul>
        </div>
      </div>

    </div>
  </footer>
}

export default Footer