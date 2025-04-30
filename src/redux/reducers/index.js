import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import filterReducer from "./filterReducer";
import eventReducer from "./EventReducer";

const rootReducer = combineReducers({
    login:loginReducer,
    register:registerReducer,
    filter:filterReducer,
    event:eventReducer
})

export default rootReducer