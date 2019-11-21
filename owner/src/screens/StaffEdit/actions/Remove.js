import request from 'axios'
import parameters from '../../../parameters'
import {REMOVE_BEFORE, REMOVE_FAILURE, REMOVE_SUCCESS} from '../actions'

export default (id) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token
  const company = state.App.defaultCompany

  if (!company) return

  dispatch({
    type: REMOVE_BEFORE
  })

  request.delete(parameters.apiHost + `/api/v1/owner/companies/${company._id}/staff/${id}`, {
    headers: {
      Authorization: token
    }
  })
    .then(() => {
      dispatch({
        type: REMOVE_SUCCESS,
      })
    })
    .catch(e => {


      dispatch({
        type: REMOVE_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      })
    })
}
