import React from 'react';
import i18n from "../../../i18n";
import {useDispatch, useSelector} from "react-redux";
import {FILTER_CHANGED} from "../actions";

let intervalId
const Filter = () => {

  const isLoading = useSelector(state => state.Purchases.isLoading)
  const search = useSelector(state => state.Purchases.search)
  const dispatch = useDispatch()

  const [tmpSearch, setTmpSearch] = React.useState(search)

  const setSearch = e => {

    const search = e.target.value

    setTmpSearch(search)

    clearTimeout(intervalId)
    intervalId = setTimeout(() => {
      dispatch({
        type: FILTER_CHANGED,
        payload: {
          search
        }
      })
    }, 400)
  }

  const searchIfEnter = e => {
    if (e.keyCode === 27) {
      setTmpSearch('')
      dispatch({
        type: FILTER_CHANGED,
        payload: {
          search: ''
        }
      })
    }
  }

  return <div className="input-group input-group-sm">

    <div className="input-group-prepend">
      <div className="input-group-text">
        <i className={"fa " + (isLoading ? "fa-spin fa-circle-notch" : "fa-search")}/>
      </div>
    </div>

    <input type="text"
           className="form-control"
           placeholder={i18n.t('placeholder.search')}
           value={tmpSearch || ''}
           onKeyDown={searchIfEnter}
           onChange={setSearch}/>

  </div>
}

export default Filter
