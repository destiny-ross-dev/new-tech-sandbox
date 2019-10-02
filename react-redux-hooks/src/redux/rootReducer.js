import { combineReducers } from "redux";
import { todos, visibilityFilter } from "./toDos/toDoListReducer";

export default combineReducers({
  todos,
  visibilityFilter
});
