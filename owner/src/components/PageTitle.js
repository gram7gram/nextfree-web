import React from "react";
import PropTypes from "prop-types";
import Errors from "./Errors";

const PageTitle = props => {

  return <>

    <div className="card mb-4">
      <div className="card-header">
        <div className="row">
          <div className="col">
            <h4 className="m-0">{props.title}</h4>
          </div>
          <div className="col-auto text-right d-none d-md-block">
            {props.buttons.map((button, i) =>
              button.onClick
                ? <button key={i}
                          className={`btn ${button.mainClass} btn-sm mx-1`}
                          onClick={button.onClick}
                          disabled={!!button.disabled}>
                  <i className={button.isLoading ? "fa fa-spin fa-circle-notch" : `fa ${button.icon}`}/>
                  &nbsp;{button.text}
                </button>
                : <a key={i}
                     className={`btn ${button.mainClass} btn-sm mx-1`}
                     href={button.href}
                     target="_blank">
                  <i className={button.isLoading ? "fa fa-spin fa-circle-notch" : `fa ${button.icon}`}/>
                  &nbsp;{button.text}
                </a>)}

          </div>
        </div>
      </div>
    </div>

    <Errors errors={props.serverErrors}/>

    <div className="d-block d-md-none mb-4">
      {props.buttons.map((button, i) =>
        <button key={i}
                className={`btn ${button.mainClass} btn-block mb-2`}
                onClick={button.onClick}
                disabled={!!button.disabled}>
          <i className={button.isLoading ? "fa fa-spin fa-circle-notch" : `fa ${button.icon}`}/>
          &nbsp;{button.text}
        </button>)}
    </div>

  </>
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.array.isRequired,
  serverErrors: PropTypes.array.isRequired,
}

export default PageTitle