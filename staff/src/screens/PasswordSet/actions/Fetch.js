import request from 'axios'
import parameters from '../../../parameters'
import {FETCH_BEFORE, FETCH_FAILURE, FETCH_SUCCESS} from '../actions'

export default (id) => (dispatch) => {

  if (!id) {
    dispatch({
      type: FETCH_FAILURE,
      payload: {}
    })
    return;
  }

  dispatch({
    type: FETCH_BEFORE
  })

  request.get(parameters.apiHost + `/api/v1/staff-password-set/${id}`)
    .then(({data}) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: data,
      })
    })
    .catch(e => {
      console.log(e);

      dispatch({
        type: FETCH_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      })
    })
}
