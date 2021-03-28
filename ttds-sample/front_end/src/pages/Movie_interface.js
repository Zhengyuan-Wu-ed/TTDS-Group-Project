import { Button, message } from 'antd';
import Item from 'antd/lib/list/Item';
import React, { Component } from 'react';
import HttpUtil from './HttpUtil';
// import { Layout, Button} from 'antd';

// import './old_style.css';
import MainPage from "./MainPage";
class Movie_interface extends React.Component{
    render() {
      return (
        <div>
          <title>movie</title>
          <link rel="stylesheet" href="style_review.css" />
          <header className="main_header">
            <figure>
              <img src="images/logo.png" alt="logo" />
            </figure>
          </header>
          <section className="review">
            <div id="search" style={{backgroundColor: 'black', width: '100%', float: 'left'}}>
              <div className="icon" />
              <input type="text" className="search_content" /><input type="radio" className="selector" name="choice" defaultValue="movies name" />movie<input type="radio" className="selector" name="choice" defaultValue="review" />review<br />
            </div>
            <div id="menu" style={{backgroundColor: '#9191a5', height: '100%', width: '15%', float: 'left'}}>
              <ul className="filters">
                <li className="section expanded">
                  <div className="title">
                    <div className="expand">
                    </div>
                    <h2>Sort by</h2>
                  </div>
                  <ul>
                    <li>
                      <input type="radio" name="sort" defaultValue="popular" data-default defaultChecked />
                      <span>Popular</span>
                    </li>
                    <li>
                      <input type="radio" name="sort" defaultValue="newest" />
                      <span>New Releases</span>
                    </li>
                    <li>
                      <input type="radio" name="sort" defaultValue="Rating" />
                      <span>Rating</span>
                    </li>
                  </ul>
                </li>
                <li className="section expanded">
                  <div className="title">
                    <div className="expand">
                    </div>
                    <h2>GENRE</h2>
                  </div>
                  <ul>
                    <li>
                      <input type="radio" name="genere" defaultValue="popular" data-default defaultChecked />
                      <span>Action</span>
                    </li>
                    <li>
                      <input type="radio" name="genere" defaultValue="newest" />
                      <span>Thriller</span>
                    </li>
                    <li>
                      <input type="radio" name="genere" defaultValue="Rating" />
                      <span>Romance</span>
                    </li>
                    <li>
                      <input type="radio" name="genere" defaultValue="Rating" />
                      <span>Adventure</span>
                    </li>
                    <li>
                      <input type="radio" name="genere" defaultValue="Rating" />
                      <span>Fantasy</span>
                    </li>
                    <li>
                      <input type="radio" name="genere" defaultValue="Rating" />
                      <span>Drama</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div id="content" style={{backgroundColor: '#EEEEEE', height: '100%', width: '85%', float: 'left'}}>
              <div className="first_review">
                {/*<header className="first_reviewer">*/}
                  <h3>Movie Name: </h3>
                  <h3>Average rating: </h3>
                  <h3>Genere: </h3>
                  <h3>Review number: </h3>

                  <Button style={{margin: "20px"}} type="primary">Search</Button>

                {/*</header>*/}
              </div>
              <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9" size={3} />
              <div className="first_review">
                {/*<header className="first_reviewer">*/}
                  <h3>Movie Name: </h3>
                  <h3>Average rating: </h3>
                  <h3>Genere: </h3>
                  <h3>Review number: </h3>
                {/*</header>*/}
              </div>
              <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9" size={3} />
              <div className="first_review">
                {/*<header className="first_reviewer">*/}
                  <h3>Movie Name: </h3>

                  <h3>Average rating: </h3>
                  <h3>Genere: </h3>
                  <h3>Review number: </h3>
                {/*</header>*/}
                <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9" size={3} />
                <div className="first_review">
                  {/*<header className="first_reviewer">*/}
                    <h3>Movie Name: </h3>
                    <h3>Average rating: </h3>
                    <h3>Genere: </h3>
                    <h3>Review number: </h3>
                  {/*</header>*/}
                </div>
              </div>
              <hr style={{border: '1 dashed #987cb9'}} width="100%" color="#987cb9" size={1} />
              <div className="page">
                {/*<a href="#" className="first">首页</a>*/}
                {/*<a href="#" className="prev">&lt;pre</a>*/}
                {/*<a href="#">1</a>*/}
                {/*<a href="#">2</a>*/}
                {/*<a href="#">3</a>*/}
                {/*<a href="#">4</a>*/}
                {/*<a href="#">5</a>*/}
                {/*<a href="#" className="next">&gt;next</a>*/}
                {/*<a href="#" className="last">last page</a>*/}
              </div>
            </div>
          </section>  
          {/*<footer>*/}
          {/*  <p>*/}
          {/*    TTDS CW3*/}
          {/*  </p>*/}
          {/*</footer>*/}
        </div>
      );
    }
  }
export default Movie_interface;
