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
          reviewMovieDetail: [],
          moviePageInfo: [],
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
    // if (data){
    //     // console.log(data.name)
    //     // console.log(data)
    //     // var {name} = data
    //     this.setState({
    //         searchMovie: data.name,
    //     })
    // }
    if (this.props.location.state){
        this.setState({
            reviewInfo:this.props.location.state.review,
            reviewMovieDetail:this.props.location.state.reviewMovieDetail,
            moviePageInfo: this.props.location.state.moviePageInfo,
            
            loading: false
        });
    }
    console.log(this.props.location.state.moviePageInfo)
    console.log(this.props.location.state.reviewMovieDetail)
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
            <h2 style={{color: 'coral'}}>movie name:{this.state.reviewMovieDetail.movieName} </h2>
            <h2 style={{color: 'crimson'}}>year: {this.state.reviewMovieDetail.year}</h2>
            <h2 style={{color: 'crimson'}}>score: {this.state.reviewMovieDetail.averageRating}</h2>
          </div>
          {/* <div id="content" style={{backgroundColor: '#7c1d5c', width: '85%', float: 'left'}}> */}
            {/*component*/}
            <div>
              <Reviews data={this.state.moviePageInfo} />
            </div>

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

function reviewDetail(props){
  // props.name = 'a';
  // console.log(props)

  // function handleClickBtn3() {
  //     // props.func;
  //     console.log("a")
  //     props.func({movieName:props.name, year:props.year, averageRating:props.averageRating})
  //   }
  // console.log(props.func)
  return (
  <div className="first_review" style={{backgroundColor: '#EEEEEE'}}>
  {/* <header className="first_reviewer"> */}
      {/* <h1 style={{backgroundColor: '#EEEEEE'}}>Hello, {props.name}</h1> */}
      <h3>Reviewer: {props.reviewer}</h3>
      <h3>Reviewer ID: {props.reviewer_id}</h3>
      <h3>Review Time: {props.review_time}</h3>
      <h3>Rating: {props.rating}</h3>
      <h3>Review Content: {props.review_content}</h3>
      {/* <Button style={{margin: "20px"}} type="primary" onClick={handleClickBtn3}>More Details</Button> */}
  {/* </header> */}
  {/* </div> */}
  <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9" size={3} />
  </div>);
}


function reviewList(nameList) {
  var nameDOM = [];
  for(var i = 0; i<nameList.length;i++){
      // console.log(nameList[i])
    nameDOM.push(reviewDetail({reviewer: nameList[i].reviewer, reviewer_id:nameList[i].reviewer_id, review_time:nameList[i].review_time, rating: nameList[i].rating, review_content:nameList[i].review_content}))
    // nameDOM.push(reviewDetail({name: nameList[i].movieName, year: nameList[i].year, averageRating: nameList[i].averageRating, genre: nameList[i].genre, number: nameList[i].number, func:a}))

    // nameDOM
  }
  return nameDOM;
}

function Reviews(reviewInfo) {
  // const a = this.state.reviewInfo
  // console.log(reviewInfo.func)
  // 将字典转换为列表
  var nameList = Object.values(reviewInfo.data)
  // console.log(nameList)
  // var nameList = ["Lingyun", "Yukino", "Nanami"];
  return (
    <div>
      {reviewList(nameList)}
    </div>
  )
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