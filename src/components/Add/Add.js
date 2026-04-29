import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodo } from "../../contexts/TodoContext";

function Add() {
  const { addTodo } = useTodo();

  return (
      <div className="edit_container">
      <form></form>
    </div>
  );
}

export default Add;
