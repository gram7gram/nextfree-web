import request from 'axios'
import parameters from '../../../parameters'
import {FETCH_BEFORE, FETCH_FAILURE, FETCH_SUCCESS} from '../actions'

export default () => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  dispatch({
    type: FETCH_BEFORE
  })

  request.get(parameters.apiHost + '/api/v1/owner/profile', {
    headers: {
      Authorization: token
    }
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: data
      })
    })
    .catch(e => {
      if (!e.response) return

      dispatch({
        type: FETCH_FAILURE,
        payload: {
          status: e.response.status,
          data: e.response.data
        }
      })
    })
}
