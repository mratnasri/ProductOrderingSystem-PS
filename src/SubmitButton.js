import React from "react";
//import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";

export default function SubmitButton(props) {
  return (
    <div className="form-group row">
      <div className="control-label col-sm-4"> </div>
      <button className="btn btn-primary" id={props.id} type="submit">
        {props.value}
      </button>
    </div>
  );
}
