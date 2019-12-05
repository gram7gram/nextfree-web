import request from 'axios'
import parameters from '../../../parameters'
import {FETCH_BONUS_CONDITIONS_FAILURE, FETCH_BONUS_CONDITIONS_SUCCESS} from '../actions'

export default () => (dispatch, getState) => {

  const state = getState()
  const token = state.App.token

  request.get(parameters.apiHost + `/api/v1/bonus-conditions`, {
    headers: {
      Authorization: token
    }
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_BONUS_CONDITIONS_SUCCESS,
        payload: data
      })
    })
    .catch(e => {
      console.log(e);

      dispatch({
        type: FETCH_BONUS_CONDITIONS_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      })
    })
}
