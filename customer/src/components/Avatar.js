import React from 'react'
import Props from 'prop-types'
import fallback from "../assets/img/avatar-unknown.png";

const Avatar = ({src}) => {

  return <div className="avatar-container">
    <AvatarBody src={src}/>
  </div>

}

export const AvatarBody = ({src}) => {

  const [img, setImg] = React.useState(src)

  React.useEffect(() => {

    setImg(src || fallback)

  }, [src])

  return <img
    src={img}
    onError={() => setImg(fallback)}
    alt=""
    className="img-fluid d-block mx-auto avatar"/>

}

Avatar.propTypes = {
  src: Props.string
}

AvatarBody.propTypes = {
  src: Props.string
}

export default Avatar