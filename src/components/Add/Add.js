import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../../contexts/TodoContext";

function Add() {
  const { addTodo } = useTodo();
  const [addTitle, setAddTitle] = useState("");
  const [addNotes, setAddNotes] = useState("");
  const [addPriority, setAddPriority] = useState(1);
  const [addDueDate, setAddDueDate] = useState("");

  const handleChange = (e, element) => {
    element(e.target.value);
  };

  const navigate = useNavigate();

  const handleTitle = (e) => handleChange(e, setAddTitle);
  const handleNotes = (e) => handleChange(e, setAddNotes);
  const handlePriority = (e) => handleChange(e, setAddPriority);
  const handleDueDate = (e) => handleChange(e, setAddDueDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo({
      title: addTitle,
      priority: addPriority,
      notes: addNotes,
      dueDate: addDueDate,
    });
    navigate("/");
  };

  return (
    <div className="add_container text-center">
      <h1>Add a new To-Do</h1>
      <div className="w-100">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleTitle}
        ></input>
      </div>
      <div className="w-100">
        <label htmlFor="notes">Notes: </label>
        <input
          type="text"
          id="notes"
          name="notes"
          onChange={handleNotes}
        ></input>
      </div>
      <div className="w-100">
        <label htmlFor="priority">Priority: </label>
        <input
          type="number"
          id="priority"
          name="priority"
          min="1"
          max="5"
          onChange={handlePriority}
        ></input>
      </div>
      <div className="w-100">
        <label htmlFor="date">Due: </label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={handleDueDate}
        ></input>
      </div>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default Add;
