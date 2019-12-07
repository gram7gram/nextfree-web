import request from 'axios'
import parameters from '../../../parameters'
import {MODEL_CHANGED} from '../actions'

export default (file) => (dispatch) => {

  const data = new FormData()
  data.append('file', file)

  request.post(parameters.storageHost + `/api/v1/media`, data)
    .then(({data}) => {
      dispatch({
        type: MODEL_CHANGED,
        payload: {
          "logo": data.url
        },
      })
    })
    .catch(e => {
      console.log(e);
    })
}
