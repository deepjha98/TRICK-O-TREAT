import { useEffect } from "react";
import { reduxForm } from "redux-form";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";
import BgImage from "./bgImage";
import LoginForm from "./LoginForm";
import { postLogin } from "../../store/actions";
import { connect } from "react-redux";
/////////////////////////////////////////////

const Login = (props) => {
  const userLogin = (formValues) => {
    props.postLogin(formValues);
  };
  useEffect(() => {
    if (props.loginError.length > 0) {
      props.loginError.map((error) => {
        toast.error(error.msg);
      });
    }
    if (props.user) {
      props.history.push("/dashboard");
    }
  }, [props.loginError, props.user]);
  return (
    <>
      <Helmet>
        <title>User Login</title>
        <meta name="description" content="User Login page" />
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
              <div className="account__section__label">LOGIN</div>
              {/* FORM FOR LOGIN */}
              <form onSubmit={props.handleSubmit(userLogin)}>
                {/* THIS IS THE FORM COMPONENT THAT CONATINBS ALL THE REDUX FORM */}
                <LoginForm />
                <div className="group">
                  <button className="btn btn-default btn-block" type="submit">
                    Login
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
/////////////////////////////////////////////////
const validate = (formValues) => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "PLEASE ENTER YOUR REGISTERED EMAIL";
  }
  if (!formValues.password) {
    errors.password = "PLEASE ENTER YOUR PASSWORD TO CONTINUE";
  }
  return errors;
};

//MAP STATE TO PROPS
const mapStateToProps = (state) => {
  return {
    loginError: state.AuthReducer.loginError,
    user: state.AuthReducer.user,
  };
};
export default connect(mapStateToProps, { postLogin })(
  reduxForm({
    form: "LoginForm",
    validate: validate,
  })(Login)
);
