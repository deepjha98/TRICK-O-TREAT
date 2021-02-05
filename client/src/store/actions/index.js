import registerApi from "../../apis/registerApi";
import { REGISTER_ERRORS, SET_LOADER, CLOSE_LOADER, SET_TOKEN } from "../type";
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
      console.log("LET'S CHECK");
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: REGISTER_ERRORS,
        payload: error.response.data.errors,
      });
      console.log(error.response.data.errors);
    }
  };
};
