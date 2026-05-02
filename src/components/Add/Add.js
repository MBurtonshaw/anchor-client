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
      <div className="card w-50 text-center m-auto">
                <div className="card-body"></div>
      <h1 className="card-title">Add a new To-Do</h1>
      <div className="w-50 m-auto mt-5">
        <label className='card-text mx-1' htmlFor="title">Title: </label>
        <input
          className='mx-1'
          type="text"
          id="title"
          name="title"
          onChange={handleTitle}
        ></input>
      </div>
      <div className="w-100 my-4">
        <label className='card-text mx-1' htmlFor="notes">Notes: </label>
        <input
          className='mx-1'
          type="text"
          id="notes"
          name="notes"
          onChange={handleNotes}
        ></input>
      </div>
      <div className="w-100">
        <label className='card-text mx-1' htmlFor="priority">Priority: </label>
        <input
          className='mx-1'
          type="number"
          id="priority"
          name="priority"
          min="1"
          max="5"
          onChange={handlePriority}
        ></input>
      </div>
      <div className="w-100 my-4">
        <label className='card-text mx-1' htmlFor="date">Due: </label>
        <input
          className='mx-1'
          type="date"
          id="date"
          name="date"
          onChange={handleDueDate}
        ></input>
      </div>
      <div className='w-50 m-auto p-3'>
      <button onClick={handleSubmit}>submit</button>
      </div>

      </div>
    </div>
  );
}

export default Add;





        // <div className="card-body">
        //   <h5 className="card-title">{todo.title}</h5>
        //   <p className="card-text w-50 m-auto p-5">{todo.notes}</p>

        //   <p className='mt-5'>Created: {createdAtHandler()}</p>

        //   <Link to={`/todos/${todo.id}/edit`}>
        //     <button>Update</button>
        //   </Link>

        //   <button onClick={handleFinished}>Mark Finished</button>

        //   <button onClick={handleDelete}>Delete</button>
        // </div>

