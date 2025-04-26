import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
    login:loginReducer,
    register:registerReducer,
    filter:filterReducer
})

export default rootReducer