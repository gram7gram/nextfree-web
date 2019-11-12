import React from 'react'
import PropTypes from 'prop-types'
import qrcode from 'qrcode'

class QrCode extends React.PureComponent {

  state = {
    img: null
  }

  componentDidMount() {

    const {data} = this.props

    qrcode.toDataURL(data)
      .then(img => {

        this.setState({
          img
        })

      })
  }

  render() {

    const {img} = this.state

    return <div className="qr-container text-center w-100">
      {img ? <img src={img} className="img-fluid" alt=""/> : null}
    </div>
  }
}

QrCode.propTypes = {
  data: PropTypes.any.isRequired
}

export default QrCode