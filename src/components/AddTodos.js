import React, { useState } from "react";
import TodoDataService from "../services/TodoService";

const AddTodos = () => {
  const initialTodoState = {
    id: null,
    title: "",
    isDone: false,
    user: "",
  };

  const [todo, setTodo] = useState(initialTodoState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const saveTodo = () => {
    var data = {
      title: todo.title,
      isDone: todo.isDone,
      user: todo.user,
    };
    console.log(data);

    TodoDataService.create(data)
      .then((response) => {
        setTodo({
          id: response.data.id,
          title: response.data.title,
          isDone: response.data.isDone,
          user: response.data.user,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTodo = () => {
    setTodo(initialTodoState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTodo}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={todo.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="user">User</label>
            <input
              type="text"
              className="form-control"
              id="user"
              required
              value={todo.user}
              onChange={handleInputChange}
              name="user"
            />
          </div>

          <button onClick={saveTodo} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTodos;
