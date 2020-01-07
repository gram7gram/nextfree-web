import request from 'axios'
import parameters from '../../../parameters'
import flatten from '../../../utils/flatten'
import {FETCH_WEBSITE_BEFORE, FETCH_WEBSITE_FAILURE, FETCH_WEBSITE_SUCCESS} from '../actions'

export default (id) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  dispatch({
    type: FETCH_WEBSITE_BEFORE
  })

  request.get(parameters.apiHost + `/api/v1/owner/companies/${id}/website`, {
    headers: {
      Authorization: token
    }
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_WEBSITE_SUCCESS,
        payload: data,
        flatten: flatten(data),
      })
    })
    .catch(e => {


      dispatch({
        type: FETCH_WEBSITE_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      })
    })
}
