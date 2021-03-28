
import React, {Component} from 'react';
import {HashRouter, withRouter, Route, Redirect} from 'react-router-dom';
 
import MainPage from "./pages/MainPage";
import ReviewOverall from "./pages/ReviewOverall";
import MoviePage from "./pages/MoviePage"

export default class MyRouter extends Component {
    render(){
        return(
            <HashRouter>
                <div>
                    <Route exact path='/' component={MainPage}/>
                    {/* <Route path="/MainPage" component={MainPage}/> */}
                    <Route path="/ReviewOverall" component={ReviewOverall}/>
                    <Route path="/MoviePage" component={MoviePage}/>
                </div>
            </HashRouter>
        )
    }
}
