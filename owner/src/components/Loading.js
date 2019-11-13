import React from 'react';
import img from '../assets/img/loading.gif';

const Loading = () => {

  return <div className="text-center py-5">
    <img src={img} alt="Loading..." width={100}/>
  </div>
}

export default Loading