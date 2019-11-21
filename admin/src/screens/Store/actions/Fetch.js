import request from 'axios'
import parameters from '../../../parameters'
import {FETCH_BEFORE, FETCH_FAILURE, FETCH_SUCCESS} from '../actions'

export default (page = 0, limit = 0) => (dispatch, getState) => {

  const state = getState()
  const token = state.App.token

  const query = [
    'page=' + page,
    'limit=' + limit,
  ]

  dispatch({
    type: FETCH_BEFORE
  })

  request.get(parameters.apiHost + `/api/v1/admin/stores?`+ query.join('&'), {
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
