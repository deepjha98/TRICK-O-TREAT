import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import BgImage from "./bgImage";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import RegisterForm from "./RegisterForm";
import { postRegister } from "../../store/actions";
////////////////////////////////////

const Register = (props) => {
  //------REGISTER BUTTON CLICK EVENT---------
  const userRegister = (formValues) => {
    props.postRegister(formValues);
  };
  //-----------------------------------------------
  //useEffect functiuon to flash message
  useEffect(() => {
    if (props.registerError.length > 0) {
      props.registerError.map((error) => {
        toast.error(error.msg);
      });
    }
    if (props.user) {
      props.history.push("/dashboard");
    }
  }, [props.registerError, props.user]);
  //RENDER FUNCTION
  return (
    <>
      <Helmet>
        <title>User Register</title>
        <meta name="description" content="User Register Page" />
      </Helmet>
      <div className="row mt-80">
        <Toaster
          toastOptions={{
            style: {
              fontSize: "10px",
            },
          }}
        ></Toaster>
        <div className="col-8">
          <BgImage />
        </div>
        <div className="col-4">
          <div className="account">
            <div className="account__section">
              <div className="account__section__label">SIGN UP</div>
              {/* FORM FOR REGISTRATION */}
              <form onSubmit={props.handleSubmit(userRegister)}>
                {/* THIS IS THE FORM COMPONENT THAT CONATINBS ALL THE REDUX FORM */}
                <RegisterForm />
                <div className="group">
                  <button className="btn btn-default btn-block" type="submit">
                    {props.loading ? "..." : "REGISTER"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//VALIDATE FORM
const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "YOU MUST ENTER YOUR NAME";
  }
  if (!formValues.email) {
    errors.email = "YOU NEED TO USE AN EMAIL ID";
  }
  const emailRegExp = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
  if (!emailRegExp.test(formValues.email)) {
    errors.email = "YOU NEED TO ENTER A VALID EMAIL ADDRESS";
  }
  if (formValues.password) {
    if (!(formValues.password.length >= 8)) {
      errors.password = "PASSSWORD SHOULS BE OF MINIMUM 8 DIGITS";
    }
  }
  if (formValues.passwordA !== formValues.password) {
    errors.passwordA = "PASSWORDS DO NOT MATCH";
  }
  if (formValues.phone) {
    if (!(formValues.phone.length === 10)) {
      errors.phone = "YOU NEED TO ENTER A VALID PHONE NUMBER";
    }
  }
  if (!formValues.phone) {
    errors.phone = "PLEASE INPUT PHONE NUMBER";
  }
  return errors;
};

//////////////////////////////////////////////
const mapStateToProps = (state) => {
  return {
    loading: state.AuthReducer.loading,
    registerError: state.AuthReducer.registerError,
    user: state.AuthReducer.user,
  };
};
export default connect(mapStateToProps, { postRegister })(
  reduxForm({
    form: "RegisterUser",
    validate: validate,
  })(Register)
);
