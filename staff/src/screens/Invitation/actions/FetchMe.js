import request from 'axios'
import parameters from '../../../parameters'
import {FETCH_BEFORE, FETCH_FAILURE, FETCH_SUCCESS} from '../actions'
import flatten from "../../../utils/flatten";

export default (id) => (dispatch) => {

  dispatch({
    type: FETCH_BEFORE
  })

  request.get(parameters.apiHost + `/api/v1/invitation/${id}`)
    .then(({data}) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: data,
        flatten: flatten(data)
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
