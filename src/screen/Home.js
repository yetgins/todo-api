import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTodos from "../components/AddTodos";
import Todos from "../components/Todos";
import TodoList from "../components/TodoList";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  return (
    <>
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/todos" className="navbar-brand">
              yetgins
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/todos"} className="nav-link">
                  Todos
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/todos"]} component={TodoList} />
              <Route exact path="/add" component={AddTodos} />
              <Route path="/todos/:id" component={Todos} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

export default Home;
