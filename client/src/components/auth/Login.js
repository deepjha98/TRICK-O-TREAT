import { reduxForm } from "redux-form";
import { Helmet } from "react-helmet";
import BgImage from "./bgImage";
import LoginForm from "./LoginForm";
/////////////////////////////////////////////

const Login = () => {
  return (
    <>
      <Helmet>
        <title>User Login</title>
        <meta name="description" content="User Login page" />
      </Helmet>
      <div className="row mt-80">
        <div className="col-8">
          <BgImage />
        </div>
        <div className="col-4">
          <div className="account">
            <div className="account__section">
              <div className="account__section__label">LOGIN</div>
              {/* FORM FOR LOGIN */}
              <form>
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
export default reduxForm({
  form: "LoginForm",
  validate: validate,
})(Login);
