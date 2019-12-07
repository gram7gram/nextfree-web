import React from 'react'
import Props from 'prop-types'
import fallback from '../assets/img/avatar-unknown.png'

const Avatar = ({src}) => {

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

Avatar.propTypes = {
  src: Props.string
}

export default Avatar