import validate from './Action'
import {VALIDATE_SUCCESS, VALIDATE_FAILURE} from '../../actions'

export default (model, changes) => {
    const validator = validate(model, changes)

    if (validator.total === 0) {
        return {
            type: VALIDATE_SUCCESS
        }
    } else {
        return {
            type: VALIDATE_FAILURE,
            payload: validator
        }
    }
}