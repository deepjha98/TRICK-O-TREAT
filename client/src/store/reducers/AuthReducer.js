//TYPE GET FROM THE FILE
import {
  SET_TOKEN,
  REGISTER_ERRORS,
  SET_LOADER,
  CLOSE_LOADER,
  USER_LOGOUT,
  LOGIN_ERORRS,
} from "../type";
import jwt_decode from "jwt-decode";
//DEFINING AN INITIAL STATE
const initState = {
  loading: false,
  registerError: [],
  loginError: [],
  token: "",
  user: "",
};
//LOCALE STORAGE
//EXTRA FUNCTIONS
const verifyToken = (token) => {
  const decodeToken = jwt_decode(token);
  const expiresIN = new Date(decodeToken.exp * 1000);
  if (new Date() > expiresIN) {
    localStorage.removeItem("MyToken");
  } else {
    return decodeToken;
  }
  // else {
  //   initState.token = token;
  //   const { user } = decodeToken;
  //   initState.user = user;
  // }
};

const token = localStorage.getItem("MyToken");
if (token) {
  const decoded = verifyToken(token);
  initState.token = token;
  initState.user = decoded.user;
}
//REDUCER FOR AUTh
const AuthReducer = (state = initState, action) => {
  if (action.type === SET_LOADER) {
    return { ...state, loading: true };
  } else if (action.type === CLOSE_LOADER) {
    return { ...state, loading: false };
  } else if (action.type === REGISTER_ERRORS) {
    return { ...state, registerError: action.payload };
  } else if (action.type === SET_TOKEN) {
    const decoded = verifyToken(action.payload);
    const { user } = decoded;
    return {
      ...state,
      token: action.payload,
      user: user,
      loginError: [],
      registerError: [],
    };
  } else if (action.type === USER_LOGOUT) {
    return { ...state, user: "", token: "" };
  } else if (action.type === LOGIN_ERORRS) {
    return { ...state, loginError: action.payload };
  } else {
    return state;
  }
};
//////////////////////////////////////////////
export default AuthReducer;
