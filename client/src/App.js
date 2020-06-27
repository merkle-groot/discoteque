import React from 'react';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import AppNavbar from "./components/Navbar";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import IndividualArtist from './pages/IndividualArtist';

// import './App.css';

function App() {
    return (
      <Router>
        <div className="App">
          <AppNavbar/>
          {/* <Nav/> */}
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/dashboard" exact component={Dashboard}/>
              <Route path="/about" exact component={About} />
              <Route path="/artist/:id" component={IndividualArtist}/>
            </Switch>  
        </div>  
      </Router>
      
    // <div className="App">
    //   {/* <AppNavbar/> */}
    //   {/* <ShoppingList/> */}
    //   {/* <Login/> */}
    // </div>
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
