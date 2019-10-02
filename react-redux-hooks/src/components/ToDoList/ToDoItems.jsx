import React from "react";

import Todo from "./Todo";
import { useTodos } from "../../redux/toDos/hooks";

const TodoItems = () => {
  const { todos, toggleTodo } = useTodos();
  return (
    <ul style={{ minHeight: "20vh" }}>
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
      ))}
    </ul>
  );
};
export default TodoItems;
