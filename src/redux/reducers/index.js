import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";
import profile from "./profile";

export default combineReducers({ auth, error, profile });
