//--THIS IS FOR THE VARIOUS FIELDS OF REGISTER
import React from "react";
import { Field } from "redux-form";
////////////////////////////////////////////////

class RegisterForm extends React.Component {
  //Error under the input
  renderError(meta) {
    console.log(meta);
    if (meta.touched && meta.error) {
      return <>{meta.error}</>;
    }
  }
  //Component for inputs
  nameInputField = ({ input, label, placeholder, meta, type, maxLength }) => {
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
  //RENDER FUNCTION
  render() {
    return (
      <>
        {/* NAME INPUT FIELD */}
        <Field
          type="text"
          placeholder="Enter Name"
          label="Name:"
          name="name"
          component={this.nameInputField}
        />
        <Field
          type="email"
          placeholder="name@example.com"
          label="Email:"
          name="email"
          component={this.nameInputField}
        />
        <Field
          maxLength="10"
          type="phone"
          placeholder="987-654-3210"
          label="Phone Number:"
          name="phone"
          component={this.nameInputField}
        />
        <Field
          type="password"
          placeholder="Enter Your Password"
          label="Password:"
          name="password"
          component={this.nameInputField}
        />
        <Field
          type="password"
          placeholder="Enter Password Again"
          label="Re-Enter Password:"
          name="passwordA"
          component={this.nameInputField}
        />
      </>
    );
  }
}

///////////////////////////////////////////
export default RegisterForm;
