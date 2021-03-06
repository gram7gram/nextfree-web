import request from 'axios'
import parameters from '../../../parameters'
import flatten from '../../../utils/flatten'
import {FETCH_BEFORE, FETCH_FAILURE, FETCH_SUCCESS} from '../actions'

export default (id) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token
  const company = state.App.defaultCompany

  if (!company) return

  dispatch({
    type: FETCH_BEFORE
  })

  request.get(parameters.apiHost + `/api/v1/owner/companies/${company._id}/staff/${id}`, {
    headers: {
      Authorization: token
    }
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: data,
        flatten: flatten(data),
      })
    })
    .catch(e => {


      dispatch({
        type: FETCH_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      })
    })
}
