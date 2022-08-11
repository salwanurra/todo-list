import { combineReducers } from "redux";
import activityReducer from "./activity";
import toDoReducer from "./todo"


const rootReducers = combineReducers({
    activityReducer,
    toDoReducer
})

export default rootReducers