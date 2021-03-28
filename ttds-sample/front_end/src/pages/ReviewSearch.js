import {Button, message} from 'antd';
import Item from 'antd/lib/list/Item';
import React, {Component} from 'react';
import HttpUtil from './HttpUtil';
import MovieReviews from "./MovieReviews";

class ReviewSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <img src="images/err.png" alt="error" />
            <button style={{borderRadius: '10%', backgroundColor: 'blue', width: '80px', height: '60px', color: 'darkorange', position: 'absolute', left: '200px'}}>Go back</button>
                </div>
            )
        }
        return (
            <div>
                <title>movie</title>
                <link rel="stylesheet" href="../ttds-sample/front_end/src/pages/ReviewSearch.css"/>
                <header className="main_header">
                    <figure>
                        <img src="images/logo.png" alt="logo"/>
                    </figure>
                </header>
                <section className="review">
                    <div id="search" style={{backgroundColor: 'black', width: '100%', float: 'left'}}>
                        {/* <div class='icon'></div> */}
                        <input type="text" className="search_content"/><input type="radio" className="selector"
                                                                              name="choice" defaultValue="movies name"/>movie<input
                        type="radio" className="selector" name="choice" defaultValue="review"/>review<br/>
                    </div>
                    <div id="content"
                         style={{backgroundColor: '#EEEEEE', height: '100%', width: '100%', float: 'left'}}>
                        <div className="first_review">
                            <div className="first_reviewer">
                                <h3>Movie Name: </h3>
                                <h3>Rating: </h3>
                                <h3>Review content: </h3>
                            </div>
                        </div>
                        <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9"
                            size={3}/>
                        <div className="page">
                            <a href="#" className="first">首页</a>
                            <a href="#" className="prev">&lt;pre</a>
                            <a href="#">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <a href="#">4</a>
                            <a href="#">5</a>
                            <a href="#" className="next">&gt;next</a>
                            <a href="#" className="last">last page</a>
                        </div>
                    </div>
                </section>
                {/* <footer>
    <p>
        TTDS CW3
    </p>
</footer> */}
            </div>
        )
    }
}

export default ReviewSearch;