import React from 'react'
import i18n from '../../../i18n'

const Status = ({value}) => {
  switch (value) {
    case 'DRAFT':
      return <div className="badge badge-secondary">
        {i18n.t('company_website.status_draft')}
      </div>
    case 'IN_REVIEW':
      return <div className="badge badge-warning">
        {i18n.t('company_website.status_in_review')}
      </div>
    case 'PUBLISHED':
      return <div className="badge badge-success">
        {i18n.t('company_website.status_published')}
      </div>
    default:
      return null
  }
}

export default Status