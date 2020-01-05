import request from 'axios'
import flatten from '../../../utils/flatten'
import parameters from '../../../parameters'
import {SAVE_WEBSITE_BEFORE, SAVE_WEBSITE_FAILURE, SAVE_WEBSITE_SUCCESS} from '../actions'

const parseBeforeSubmit = model => {
  const data = JSON.parse(JSON.stringify(model))

  delete data.id

  return data
}

export default (companyId, model) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  const data = parseBeforeSubmit(model)

  dispatch({
    type: SAVE_WEBSITE_BEFORE
  })

  request.post(parameters.apiHost + `/api/v1/owner/companies/${companyId}/website`, data, {
    headers: {
      Authorization: token
    }
  }).then(({data}) => {
    dispatch({
      type: SAVE_WEBSITE_SUCCESS,
      payload: data,
      flatten: flatten(data),
    })
  }).catch(e => {
    console.log(e);

    dispatch({
      type: SAVE_WEBSITE_FAILURE,
      payload: {
        status: e.response ? e.response.status : 0,
        data: e.response ? e.response.data : null
      }
    })
  })
}
