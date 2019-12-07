import React from 'react'
import Props from 'prop-types'
import fallback from '../assets/img/company-placeholder.png'

const Logotype = ({src}) => {

  const [img, setImg] = React.useState(fallback)

  React.useEffect(() => {

    if (src)
      setImg(src)

  }, [src])

  return <div className="avatar-container">
    <img src={img}
         onError={() => setImg(fallback)}
         alt=""
         className="img-fluid"/>
  </div>

}

Logotype.propTypes = {
  src: Props.string
}

export default Logotype