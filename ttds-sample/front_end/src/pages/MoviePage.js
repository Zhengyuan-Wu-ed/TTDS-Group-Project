import { Button, message } from 'antd';
import Item from 'antd/lib/list/Item';
import React, { Component } from 'react';
import HttpUtil from './HttpUtil';
// import { Layout, Button} from 'antd';

// import './old_style.css';

class MoviePage extends React.Component{

  _isMounted = false;
  constructor(props) {
      super(props);
      this.state={
          reviewInfo: [],
          searchMovie: '',
          loading: true,
          isReceive: false,
      }
      this.handleClickBtn = this.handleClickBtn.bind(this);
      // this.getData = this.getData.bind(this);
      this.handleClickBtn2 = this.handleClickBtn2.bind(this)
  }
  handleClickBtn(event) {
    this.props.history.push("/");
  }
  handleClickBtn2(event) {
    this.setState({
        isReceive: true
    })
  }
  componentDidMount () {
    this._isMounted = true;
    var data = this.props.location.state;
    if (data){
        // console.log(data.name)
        // console.log(data)
        // var {name} = data
        this.setState({
            searchMovie: data.name,
        })
    }
    if (this.props.location.state){
        this.setState({
            reviewInfo:this.props.location.state.review,
            loading: false
        });
    }
  }

  componentWillUnmount() {
      this._isMounted = false;
  }
  componentDidUpdate() {
    console.log('a')
    var path = {
      pathname:'/ReviewOverall',
      state: {review: this.props.location.state.review},
    }
    if(this.state.isReceive){
      console.log(this.props.location.state.review)
      this.props.history.push(path);
    }
  }
  render() {
    return (
      <div>
        <title>movie</title>
        <link rel="stylesheet" href="old_style.css" />
        <header className="main_header">
          <figure>
            <img src="images/logo.png" alt="logo" />
          </figure>
        </header>
        <section className="review">
          <div id="search" style={{backgroundColor: 'black', width: '100%', float: 'left'}}>
            
            <Button style={{margin:"20px"}} type="primary" onClick={this.handleClickBtn2}>All Review Results</Button>
            <Button style={{margin:"20px"}} type="primary" onClick={this.handleClickBtn}>Main Page</Button>
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
                    <span>helpful</span>
                  </li>
                  <li>
                    <input type="radio" name="sort" defaultValue="newest" />
                    <span>Rating</span>
                  </li>
                  <li>
                    <input type="radio" name="sort" defaultValue="Rating" />
                    <span>Time</span>
                  </li>
                </ul>
              </li>
              <form action="/exampleml/form_action.asp" method="get">
                <p style={{color: 'white'}}><input type="checkbox" name="vehicle" defaultValue="Bike" /> Does it contains spoiler ?</p>
              </form>
            </ul>
          </div>
          <div style={{backgroundColor: 'white', height: '200px'}}>
            <h2 style={{color: 'coral'}}>movie name:{this.props.location.state.review.index1.movieName} </h2>
            <h2 style={{color: 'crimson'}}>year: {this.props.location.state.review.index1.year}</h2>
            <h2 style={{color: 'crimson'}}>score: {this.props.location.state.review.index1.averageRating}</h2>
          </div>
          {/* <div id="content" style={{backgroundColor: '#7c1d5c', width: '85%', float: 'left'}}> */}
            {/*component*/}
            <div>
              <ReviewDetail />
              <ReviewDetail />
              <ReviewDetail />
              </div>
              {/* <header className="first_reviewer">
                <h3>Reviewer: </h3>
                <h3>Reviewer ID: </h3>
                <h3>review time: </h3>
                <h3>rating: </h3>
                <h3>review content :</h3>
              </header> */}
            {/* </div> */}
            {/* <HR style="FILTER: alpha(opacity=100,finishopacity=0,style=3)" width="100%" color=#987cb9 SIZE=3>
                <div class='first_review'>
                    <header class='first_reviewer'>
                        <h3>Reviewer: </h3>
                        <h3>Reviewer ID: </h3>
                        <h3>review time: </h3>
                        <h3>rating: </h3>
                    </header>
    
    
                </div> */}
            {/* <hr style={{border: '1 dashed #987cb9'}} width="100%" color="#987cb9" size={1} /> */}
            {/*<div className="page">*/}
            {/*  <a href="#" className="first">首页</a>*/}
            {/*  <a href="#" className="prev">&lt;pre</a>*/}
            {/*  <a href="#">1</a>*/}
            {/*  <a href="#">2</a>*/}
            {/*  <a href="#">3</a>*/}
            {/*  <a href="#">4</a>*/}
            {/*  <a href="#">5</a>*/}
            {/*  <a href="#" className="next">&gt;next</a>*/}
            {/*  <a href="#" className="last">last page</a>*/}
            {/*</div>*/}
            <div style={{height: '200px', backgroundColor: 'white', color: 'black'}}>
              <h1>user name</h1>
              <h1>rating</h1>
              <form action="/exampleml/form_action.asp" method="get">
                <p><input type="checkbox" name="vehicle" defaultValue="Bike" /> Does it contains spoiler ?</p>
              </form>
              <textarea style={{minHeight: '100px', minWidth: '800px', maxHeight: '100px', maxWidth: '800px'}} cols={80} rows={5} defaultValue={""} />
              <button>submit</button>
            </div>   
            {/* </div> */}
          {/* </div> */}
          </section>
        {/* <footer>
        <p>
            TTDS CW3
        </p>
    </footer> */}
      </div>
    );
  }
}

class ReviewDetail extends Component {

  render() {
      return (
          // <div id="content" style = {{backgroundColor: '#EEEEE', height: '100%', width: '85%', float: 'left'}}>

          // </div>
          // <div id="content" style={{backgroundColor: '#EEEEEE', height: '100%', width: '85%', float: 'left'}}>
              <div className="first_review" style={{backgroundColor: '#EEEEEE'}}>
              {/* <header className="first_reviewer"> */}
              
              {/* <header className="first_reviewer"> */}
                  <h3>Reviewer: </h3>
                  <h3>Reviewer ID: </h3>
                  <h3>review time: </h3>
                  <h3>rating: </h3>
                  <h3>review content :</h3>
              {/* </header> */}
                  {/* <h3>Movie Name: {this.props.movie}</h3> */}
                  {/* <h3>Year: {this.props.year}</h3> */}
                  {/* <h3>Average rating: {this.props.average}</h3> */}
                  {/* <h3>Genre: {this.props.genre}</h3> */}
                  {/* <h3>Review number: {this.props.number}</h3> */}
              {/* </header> */}
              {/* </div> */}
              
            <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9" size={3} />
          </div>
      );
  }
}
export default MoviePage;