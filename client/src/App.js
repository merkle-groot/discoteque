import React from 'react';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navy from "./pages/Nav";
import About from "./pages/About";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import IndividualRouter from "./pages/IndividualRouter";

import 'bootstrap/dist/css/bootstrap.min.css';


// import './App.css';

function App() {
    return (
      <Router>
        <div className="App">
          <Navy/>
            <div >
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/about" exact component={About} />
                <Route path="/artist/:id" component={IndividualRouter}/>
              </Switch>  
            </div>
        </div>  
      </Router>
  );
}


// function PrivateRoute({ children, ...rest}) {
//   return (
//     <Route 
//       {...rest}
//       render={({location}) =>
//           IsLoggedIn ? (
//           children
//         ) : 
//           <Redirect
//             to={{
//               pathname:"/login",
//               state: { from:location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

function Home(){
  return(
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default App;
