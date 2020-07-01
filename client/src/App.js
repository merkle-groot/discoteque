import React from 'react';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navy from "./pages/Nav";
import About from "./pages/About";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import IndividualRouter from "./pages/IndividualRouter";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
      <Router>
        <div className="App">
          <Navy/>
            <div >
              <Switch>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/login" exact component={Login} />
                <Route path="/about" exact component={About} />
                <Route path="/artist/:id" component={IndividualRouter}/>
              </Switch>  
            </div>
        </div>  
      </Router>
  );
}

export default App;
