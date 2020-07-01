import React from 'react';
import {BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';
import AboutArtist from "./BottomRoutes/AboutArtist";
import Engage from "./BottomRoutes/Engage";
import Tokens from ".//BottomRoutes/Tokens";
import LeaderBoard from "./BottomRoutes/LeaderBoard";
import "./IndividualRouter.css";
// import IndividualRouter from "./pages/IndividualRouter";



function IndividualRouter({match}){
    return(
            <Router>
                <div className="ind-router">
                    <nav className="left-bar">
                        <div className="nav-links">
                            <ul>
                                <Link to={`/artist/${match.params.id}/info`} className="nav-ind">
                                    <li>ArtistInfo</li>
                                </Link>
                                
                                <Link to={`/artist/${match.params.id}/engage`} className="nav-ind">
                                    <li>Engage</li>
                                </Link>  

                                <Link to={`/artist/${match.params.id}/tokens`} className="nav-ind"> 
                                    <li>Tokens</li>
                                </Link> 

                                <Link to={`/artist/${match.params.id}/leaderboard`} className="nav-ind"> 
                                    <li>Leaderboard</li>
                                </Link> 

                                
                            </ul>
                        </div>
                    </nav>
                    
                    <div className="right-bar">
                            <Switch>
                                <Route path="/artist/:id/info" component={AboutArtist}/>
                                <Route path="/artist/:id/engage" component={Engage}/>
                                <Route path="/artist/:id/tokens" component={Tokens}/>
                                <Route path="/artist/:id/leaderboard" component={LeaderBoard}/>
                            </Switch>
                    </div>
                
            </div>    
        </Router>
        
    )

}




export default IndividualRouter;