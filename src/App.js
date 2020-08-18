import React from 'react';
import './App.css';
import Sidebar from "./container/Sidebar";
import Chat from "./container/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./container/Login";
import {useStateValue} from "./redux/StateProvider";

function App() {
    const [ {user }, dispatch] = useStateValue();

  return (
    <div className="app">
        {!user ? (
            <Login />
        ) : (
        <div className="app__body">
          <Router>
              <Sidebar/>
              <Switch>
                  <Route path="/rooms/:roomId">
                      <Chat />
                  </Route>
                  <Route path="/">
                      <Chat />
                  </Route>
              </Switch>
          </Router>
        </div>
        )}
    </div>
  );
}

export default App;
