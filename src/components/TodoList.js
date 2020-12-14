import React, { useState, useEffect } from "react";
import TodoDataService from "../services/TodoService";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTodos();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTodos = () => {
    TodoDataService.getAll()
      .then((response) => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTodos();
    setCurrentTodo(null);
    setCurrentIndex(-1);
  };

  const setActiveTodo = (todo, index) => {
    setCurrentTodo(todo);
    setCurrentIndex(index);
  };

  const removeAllTodo = () => {
    TodoDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TodoDataService.findByTitle(searchTitle)
      .then((response) => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Router>
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Todo List</h4>

            <ul className="list-group">
              {todos &&
                todos.map((todo, index) => (
                  <li
                    className={
                      "list-group-item list-group-item-action " +
                      (index === currentIndex && !todo.isDone
                        ? "list-group-item-danger"
                        : "")
                    }
                    onClick={() => setActiveTodo(todo, index)}
                    key={index}
                  >
                    {todo.title}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={removeAllTodo}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentTodo ? (
              <div>
                <h4>Task</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentTodo.title}
                </div>
                <div>
                  <label>
                    <strong>User:</strong>
                  </label>{" "}
                  {currentTodo.user}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentTodo.isDone ? "Done" : "isNotDone"}
                </div>

                <a
                  href={"/todos/" + currentTodo.id}
                  className="badge badge-warning"
                >
                  Edit
                </a>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Task...</p>
              </div>
            )}
          </div>
        </div>
      </Router>
    </>
  );
};

export default TodoList;
