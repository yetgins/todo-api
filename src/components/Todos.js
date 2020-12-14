import React, { useState, useEffect } from "react";
import TodoDataService from "../services/TodoService";

const Todos = (props) => {
  const initialTodoState = {
    id: null,
    title: "",
    isDone: false,
    user: "",
  };
  const [currentTodo, setCurrentTodo] = useState(initialTodoState);
  const [message, setMessage] = useState("");

  const getTodo = (id) => {
    TodoDataService.get(id)
      .then((response) => {
        setCurrentTodo(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTodo(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updateisDone = (status) => {
    var data = {
      id: currentTodo.id,
      title: currentTodo.title,
      isDone: status,
      user: currentTodo.user,
    };

    TodoDataService.update(currentTodo.id, data)
      .then((response) => {
        setCurrentTodo({ ...currentTodo, isDone: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTodo = () => {
    TodoDataService.update(currentTodo.id, currentTodo)
      .then((response) => {
        console.log(response.data);
        setMessage("The task was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    TodoDataService.remove(currentTodo.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/todos");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTodo ? (
        <div className="edit-form">
          <h4>Todo</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTodo.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="user">User</label>
              <input
                type="text"
                className="form-control"
                id="user"
                name="user"
                value={currentTodo.user}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTodo.isDone ? "Done" : "isNotDone"}
            </div>
          </form>

          {currentTodo.isDone ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateisDone(false)}
            >
              IsNotDone
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateisDone(true)}
            >
              Done
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTodo}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTodo}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Task...</p>
        </div>
      )}
    </div>
  );
};

export default Todos;
