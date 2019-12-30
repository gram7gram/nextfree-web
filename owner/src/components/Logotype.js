import React from 'react'
import Props from 'prop-types'
import fallback from '../assets/img/company-placeholder.png'

const Logotype = ({src}) =>
  <div className="avatar-container">
    <LogotypeBody src={src}/>
  </div>

export const LogotypeBody = ({src}) => {

  const [img, setImg] = React.useState(src)

  React.useEffect(() => {

    setImg(src || fallback)

  }, [src])

  return <img
    src={img}
    onError={() => setImg(fallback)}
    alt=""
    className="img-fluid"/>

}

Logotype.propTypes = {
  src: Props.string
}

LogotypeBody.propTypes = {
  src: Props.string
}

export default Logotype