import {Button, message} from 'antd';
import Item from 'antd/lib/list/Item';
import React, {Component} from 'react';
import HttpUtil from './HttpUtil';
// import { Layout, Button} from 'antd';

// import './all_in_one.css';
import MainPage from "./MainPage";
import MovieSearch from "./MovieSearch";

class MovieReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <img src="images/err.png" alt="error"/>
                    <button style={{
                        borderRadius: '10%',
                        backgroundColor: 'blue',
                        width: '80px',
                        height: '60px',
                        color: 'darkorange',
                        position: 'absolute',
                        left: '200px'
                    }}>Go back
                    </button>
                </div>
            )
        }
        return (
            <div>
                <title>MovieReview</title>
                <link rel="stylesheet" href="all_in_one.css"/>
                <header className="main_header"/>
                <section className="review">
                    <div id="search" style={{
                        backgroundColor: 'black',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <input style={{
                            width: "400px",
                            height: "50px",
                            borderRadius: "10px",
                            color: "black"
                        }} type="text" className="search_content"/>
                        <Button style={{margin: "20px", textAlign: "center",}} type="primary"
                                onClick={this.handleClickBtn}>Search</Button>
                        <input style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                               name="choice"
                               defaultValue="movies name"/>movie
                        <input
                            style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                            name="choice"
                            defaultValue="review"/>review
                    </div>
                    <div id="menu" style={{
                        // background: "repeat",
                        backgroundColor: '#9191a5',
                        // minHeight: "2000px",
                        height: "100%",
                        width: '15%',
                        float: 'left',
                        padding: "2px",
                    }}>
                        <ul className="filters">
                            <li className="section expanded">
                                <div className="title">
                                    <div className="expand">
                                    </div>
                                    <h2>Sort by</h2>
                                </div>
                                <ul>
                                    <li>
                                        <input type="radio" name="sort" defaultValue="popular" data-default
                                               defaultChecked/>
                                        <span>helpful</span>
                                    </li>
                                    <li>
                                        <input type="radio" name="sort" defaultValue="newest"/>
                                        <span>Rating</span>
                                    </li>
                                    <li>
                                        <input type="radio" name="sort" defaultValue="Rating"/>
                                        <span>Time</span>
                                    </li>
                                </ul>
                            </li>
                            <form style={{display: "flex", flexDirection: "row"}} action="/exampleml/form_action.asp"
                                  method="get">
                                <input type="checkbox" name="vehicle"
                                       defaultValue="Bike"/> <p style={{color: 'white'}}>Does it contains spoiler ?</p>
                            </form>
                        </ul>
                    </div>
                    <div style={{backgroundColor: 'white', height: '150px', textAlign: "center", marginTop: "10px"}}>
                        <h2 style={{color: 'black'}}>Movie name: </h2>
                        <h2 style={{color: 'black'}}>Year: </h2>
                        <h2 style={{color: 'black'}}>Score: </h2>
                    </div>
                    <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9"
                        size={3}/>
                    <div id="content" style={{width: '85%', float: 'left'}}>
                        {/*component*/}
                        <div style={{margin: "15px"}}>
                            <h3>Reviewer: {this.props.reviwer}</h3>
                            <h3>Reviewer ID:{this.props.reviewer_id} </h3>
                            <h3>Review time: {this.props.review_time}</h3>
                            <h3>Rating: {this.props.rating}</h3>
                            <h3>Review content :{this.props.review_con}</h3>
                            {/*<MovieReviewDetail reviwer={} reviewer_id={} review_time={} rating={} review_con/>*/}
                            {/*<MovieReviewDetail/>*/}
                            {/*<MovieReviewDetail/>*/}
                            {/*<MovieReviewDetail/>*/}

                        </div>
                        <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9"
                            size={3}/>

                        <div className="page">
                            {/*页码*/}
                            <a href="#" className="first">FirstPage</a>
                            <a href="#" className="prev">&lt;=</a>
                            <a href="#" className="next">=&gt;</a>
                        </div>
                        <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9"
                            size={3}/>
                        <div style={{height: '200px', backgroundColor: 'white', color: 'black', margin: "15px"}}>
                            <h1>User name</h1><input type="text" name="name"/>
                            <h1 style={{marginTop: "5px"}}>Rating</h1> <input type="text" name="rating"/>
                            <form action="/exampleml/form_action.asp" method="get" style={{
                                margin: "10px"
                            }}>
                                <p><input type="checkbox" name="vehicle" defaultValue="Bike"/> Does it contains spoiler
                                    ?</p>
                            </form>
                            <textarea
                                style={{minHeight: '100px', minWidth: '800px', maxHeight: '100px', maxWidth: '800px'}}
                                cols={80} rows={5} defaultValue={""}/><br/>
                            <Button style={{margin: "20px", textAlign: "center",marginLeft:"0px"}} type="primary"
                                    onClick={this.handleClickBtn}>Submit</Button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

class MovieReviewDetail extends React.Component {
    render() {
        return (
            <div className="reviewers">
                <h3>Reviewer: {this.props.reviwer}</h3>
                <h3>Reviewer ID:{this.props.reviewer_id} </h3>
                <h3>Review time: {this.props.review_time}</h3>
                <h3>Rating: {this.props.rating}</h3>
                <h3>Review content :{this.props.review_con}</h3>
            </div>
        );
    }

}

export default MovieReviews;