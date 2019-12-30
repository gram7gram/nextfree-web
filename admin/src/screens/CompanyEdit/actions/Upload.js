import request from 'axios'
import parameters from '../../../parameters'
import {MODEL_CHANGED, SAVE_FAILURE} from '../actions'

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

      dispatch({
        type: SAVE_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        },
      })
    })
}
