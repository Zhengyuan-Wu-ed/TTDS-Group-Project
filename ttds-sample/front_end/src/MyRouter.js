
import React, {Component} from 'react';
import {HashRouter, withRouter, Route, Redirect} from 'react-router-dom';
 
import MainPage from "./pages/MainPage";
import ReviewOverall from "./pages/ReviewOverall";
import MoviePage from "./pages/MoviePage"
import MovieReviews from "./pages/MovieReviews"

export default class MyRouter extends Component {
    render(){
        return(
            <HashRouter>
                <div>
                    <Route exact path='/' component={MainPage}/>
                    <Route path="/ReviewOverall" component={ReviewOverall}/>
                    <Route path="/MoviePage" component={MoviePage}/>
                    <Route path='/MovieReviews' component={MovieReviews}/>
                </div>
            </HashRouter>
        )
    }
}
