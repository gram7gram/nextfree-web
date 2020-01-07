import request from 'axios'
import parameters from '../../../parameters'
import {SAVE_FAILURE, SAVE_BEFORE} from '../actions'
import Save from './Save'

export default (id, file) => (dispatch) => {

  const data = new FormData()
  data.append('file', file)

  dispatch({
    type: SAVE_BEFORE,
  })

  request.post(parameters.storageHost + `/api/v1/media`, data)
    .then(({data}) => {

      dispatch(Save({
        id,
        user: {
          avatar: data.url
        }
      }))

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
