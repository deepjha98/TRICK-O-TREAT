import React from "react";
import { Field } from "redux-form";
/////////////////////////////////////////////
class LoginForm extends React.Component {
  //Error under the input
  renderError(meta) {
    if (meta.touched && meta.error) {
      return <>{meta.error}</>;
    }
  }
  //Component for inputs
  inputRender = ({ input, label, placeholder, meta, type, maxLength }) => {
    return (
      <div className="group">
        <label htmlFor={input.name} className="form-label form-label--required">
          {label}
        </label>

        <div className="form-addon" data-states-for={input.name}>
          <div className="form-addon__addon">
            <span className="icon-name"></span>
          </div>

          <input
            maxLength={maxLength}
            type={type}
            {...input}
            id={input.name}
            name={input.name}
            className="group__control"
            placeholder={placeholder}
            required
          />

          <span className="form-addon__icon icon-valid"></span>
          <span className="form-addon__icon icon-invalid"></span>
        </div>

        <div data-errors-for={input.name}>
          <small className="form-error" data-errors-when="valueMissing">
            {this.renderError(meta)}
          </small>
        </div>
      </div>
    );
  };
  //Login Render
  render() {
    return (
      <>
        <Field
          label="Email:"
          type="email"
          name="email"
          placeholder="name@example.com"
          component={this.inputRender}
        />
        <Field
          label="Password:"
          type="password"
          name="password"
          placeholder="XXXXXXXX"
          component={this.inputRender}
        />
      </>
    );
  }
}
/////////////////////////////////////////////
export default LoginForm;
