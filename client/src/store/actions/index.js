import registerApi from "../../apis/registerApi";
import {
  REGISTER_ERRORS,
  SET_LOADER,
  CLOSE_LOADER,
  SET_TOKEN,
  USER_LOGOUT,
  LOGIN_ERORRS,
} from "../type";
/////////////////////////////////////////
//ACTIONS USING DISPATCH FROM THUNK
export const postRegister = (formValues) => {
  return async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    dispatch({ type: SET_LOADER });

    try {
      const { data } = await registerApi.post("/register", formValues, config);
      dispatch({ type: CLOSE_LOADER });

      //  STORING THE TOKEN AFTER CREATION OF USER
      localStorage.setItem("MyToken", data.token);

      //  DISPATCH THE LOCAL TOKEN
      dispatch({
        type: SET_TOKEN,
        payload: data.token,
      });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: REGISTER_ERRORS,
        payload: error.response.data.errors,
      });
    }
  };
};
//  POST TO LOGOUT USER
export const postLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("MyToken");
    window.history.pushState("/");
    dispatch({ type: USER_LOGOUT });
  };
};

//POST TO LOGIN USER
export const postLogin = (formValues) => {
  return async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await registerApi.post("/login", formValues, config);
      dispatch({ type: CLOSE_LOADER });
      localStorage.setItem("MyToken", data.token);
      dispatch({
        type: SET_TOKEN,
        payload: data.token,
      });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: LOGIN_ERORRS, payload: error.response.data.errors });
    }
  };
};
