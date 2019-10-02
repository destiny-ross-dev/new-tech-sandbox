import React from "react";

import FilterRow from "./FilterRow";
import AddTodo from "./AddTodo";
import TodoItems from "./TodoItems";

const TodoList = () => (
  <div>
    <FilterRow />
    <AddTodo />
    <TodoItems />
  </div>
);

export default TodoList;
