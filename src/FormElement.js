import React from "react";
//import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";

export default class FormElement extends React.Component {
  /*constructor(props)
    {
      super(props);
      this.state={
        label: null,
        type: text,
      };
    }*/

  render() {
    return (
      <div className="form-group row" id={this.props.id + "div"}>
        <label
          className="control-label col-sm-4"
          align="right"
          htmlFor={this.props.id}
        >
          {this.props.label + " : "}
        </label>
        <input
          className="form-control col-sm-4"
          type={this.props.type}
          id={this.props.id}
          name={this.props.id}
          defaultValue={this.props.value ? this.props.value : ""}
          maxLength={this.props.maxLength ? this.props.maxLength : ""}
          minLength={this.props.minLength ? this.props.minLength : ""}
          min={this.props.min ? this.props.min : ""}
          max={this.props.max ? this.props.max : ""}
          required
          onChange={this.props.onChange}
        />
        <div id={this.props.id + "err"} style={{ padding: 2 }} />
      </div>
    );
  }
}
