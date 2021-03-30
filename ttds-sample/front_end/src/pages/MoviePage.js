import { Button, message } from 'antd';
import React, { Component } from 'react';
import HttpUtil from './HttpUtil';
import ApiUtil from './ApiUtil'
import imgURL from "../images/err.png"


import './all_in_one.css';

class MoviePage extends React.Component {

  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      searchMovie: '',
      reviewInfo: [],
      reviewMovieDetail: [],
      moviePageInfo: [],
      year: '',
      rating: '',
      loading: true,
      isReceiveReview: false,
      currentPage: 1,
      isSort: false,
      sort_type: '',
      show_spoil: 0,
      isReceive: false,
      url: ApiUtil.URL_movie
    }
    this.handleClickBtn = this.handleClickBtn.bind(this);
    // this.getData = this.getData.bind(this);
    this.handleClickBtn2 = this.handleClickBtn2.bind(this);
    this.handleClickBtn3 = this.handleClickBtn3.bind(this);
    this.handleClickBtn4 = this.handleClickBtn4.bind(this);
    this.showSpoiler = this.showSpoiler.bind(this)
  }
  handleChange(e){
    this.setState({
      inputValue:e.target.value
    })
}
  handleClickBtn(event) {
    this.props.history.push("/");
  }
  handleClickBtn2(event) {
    this.setState({
      isReceiveReview: true
    })
  }
  handleClickBtn3(event) {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }
  handleClickBtn4 () {
    var movieName = this.state.inputValue
    HttpUtil.post(this.state.url, movieName)
        .then(
        reviewDic =>{
            // this.allReviewData = reviewDic;
            console.log(reviewDic)
            // this.allReviewData = reviewDic
            this.setState({
                reviewInfo: reviewDic,
                searchMovie: movieName,
                isReceive: true
            });
        }
    );
}
  changeResultPage(data) {
    // console.log(data)
    if (data == 0) {
      this.setState({
        currentPage: 1
      })
    } else {
      if (this.state.currentPage + data > 1) {
        this.setState({
          currentPage: this.state.currentPage + data
        })
      } else {
        this.setState({
          currentPage: 1
        })
      }
    }
  }
  changeSort(type) {
    // console.log(type)
    this.setState({
      sort_type: type,
      currentPage: 1,
      isSort: true
    })
  }
  showSpoiler() {
    if (this.state.show_spoil == 0) {
      this.setState({
        show_spoil: 1
      })
    } else {
      this.setState({
        show_spoil: 0
      })
    }
  }
  componentDidMount() {
    this._isMounted = true;
    if (this.props.location.state) {
      this.setState({
        reviewInfo: this.props.location.state.review,
        reviewMovieDetail: this.props.location.state.reviewMovieDetail,
        moviePageInfo: this.props.location.state.moviePageInfo,
        loading: false
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate() {
    // console.log('a')
    if (this.state.isReceiveReview) {
      var path = {
        pathname: ApiUtil.URL_movie,
        state: { review: this.props.location.state.review, name:this.props.location.state.reviewMovieDetail.movieName},
      }
      console.log(this.props.location.state)
      this.props.history.push(path);
    }
    if(this.state.isReceive){
        var path = {
            pathname:this.state.url,
            state: {name:this.state.inputValue, review:this.state.reviewInfo},
        }
        console.log(this.state.reviewInfo)
        this.props.history.push(path);
    }
    if (this.state.isSort) {
      console.log(this.state.sort_type)
      // this.state.reviewMovieDetail.year
      const nameType = this.state.reviewMovieDetail.movieName + "'" + this.state.reviewMovieDetail.year + "'" + this.state.sort_type
      console.log(nameType)
      HttpUtil.post('/ReviewsContentSort', nameType)
        .then(
          reviewDic => {
            // this.allReviewData = reviewDic;
            console.log(reviewDic)
            // this.allReviewData = reviewDic
            this.setState({
              moviePageInfo: reviewDic,
              // isReceiveReview: true

              isSort: false
            });
          }
        );
      // console.log(this.state.reviewMovieDetail.movieName)
      // console.log(this.state.moviePageInfo)
    }
  }
  render() {
    if (this.state.loading) {
      return(
          <div>
          <figure>
          <img src={imgURL} alt="error"/>
          </figure>
          <button onClick={this.handleClickBtn} style={{
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
        <title>Review Details</title>
        {/* <link rel="stylesheet" href="old_style.css" /> */}
        <link rel="stylesheet" href="all_in_one.css" />
        <header className="main_header" />
        {/* <figure>
          <img src="images/logo.png" alt="logo" />
        </figure> */}
        {/* </header> */}
        <section className="review">
          <div id="search" style={{
            backgroundColor: 'black',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white"
          }}>
            {/* <Button style={{margin:"20px"}} type="primary" onClick={this.handleClickBtn3}>Next Page</Button> */}
            <Button style={{ margin: "20px" }} type="primary" onClick={this.handleClickBtn2}>All Review Results</Button>
            <Button style={{ margin: "20px" }} type="primary" onClick={this.handleClickBtn}>Main Page</Button>
            <input style={{
                width: "400px",
                height: "50px",
                borderRadius: "10px",
                color: "black"
            }} type="text" className="search_content" placeholder={this.state.reviewMovieDetail.movieName ? this.state.reviewMovieDetail.movieName: ''} onChange={this.handleChange.bind(this)} value={this.state.inputValue}/>
            <Button style={{ margin: "20px", textAlign: "center", }} type="primary"
              onClick={this.handleClickBtn4}>Search</Button>
            <input style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                    name="choice"
                    defaultValue="movies name" data-default defaultChecked onClick={() => this.setState({url: ApiUtil.URL_movie})}/>movie
            <input
                style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                name="choice"
                defaultValue="review" onClick={() => this.setState({url: ApiUtil.URL_review})}/>review
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
                    <input type="radio" name="sort" data-default defaultChecked defaultValue="newest" onClick={this.changeSort.bind(this, "rating")} />
                    <span>Rating</span>
                  </li>
                  <li>
                    <input type="radio" name="sort" defaultValue="Rating" onClick={this.changeSort.bind(this, "year")} />
                    <span>Time</span>
                  </li>
                </ul>
              </li>

              <form style={{ display: "flex", flexDirection: "row"}} action="/exampleml/form_action.asp" method="get">
              
                <input type="checkbox" name="vehicle"
                  defaultValue="Bike" onClick={this.showSpoiler} /> <p style={{ color: 'white' }}>Does it contains spoiler ?</p>
              </form>
            </ul>
          </div>
          <div style={{ backgroundColor: 'white', height: '150px', textAlign: "center", marginTop: "10px" }}>
            <h2 style={{ color: 'black' }}>Movie name: {this.state.reviewMovieDetail.movieName}</h2>
            <h2 style={{ color: 'black' }}>Year: {this.state.reviewMovieDetail.year}</h2>
            <h2 style={{ color: 'black' }}>Score: {this.state.reviewMovieDetail.averageRating}</h2>
          </div>
          <div>
            <Reviews data={this.state.moviePageInfo} currentPage={this.state.currentPage} spoil={this.state.show_spoil} />
          </div>
          <div className="page">
            {/*页码*/}
            <a className="first" onClick={this.changeResultPage.bind(this, 0)}>First Result Page</a>
            <a className="prev" onClick={this.changeResultPage.bind(this, -4)}>&lt;=</a>
            <a className="next" onClick={this.changeResultPage.bind(this, 4)}>=&gt;</a>
          </div>
          <hr style={{ filter: 'alpha(opacity=100,finishopacity=0,style=3)' }} width="100%" color="#987cb9"
            size={3} />
          <div style={{ height: '200px', backgroundColor: 'white', color: 'black', marginLeft: "230px" }}>
            <h1>User name</h1><input type="text" name="name" />
            <h1 style={{ marginTop: "5px" }}>Rating</h1> <input type="text" name="rating" />
            <form action="/exampleml/form_action.asp" method="get" style={{
              margin: "10px"
            }}>
              <p><input type="checkbox" name="vehicle" defaultValue="Bike" /> Does it contains spoiler
                    ?</p>
            </form>
            <textarea
              style={{ minHeight: '100px', minWidth: '800px', maxHeight: '100px', maxWidth: '800px' }}
              cols={80} rows={5} defaultValue={""} /><br />
            <Button style={{ margin: "20px", textAlign: "center", marginLeft: "0px" }} type="primary"
              onClick={this.handleClickBtn}>Submit</Button>
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

function reviewDetail(props) {
  // console.log("State spoil: ")
  // console.log(props.spoil)
  // console.log("Attribute spoil: ")
  // console.log(props.spoiler_tag)
  if (props.spoil == 0) {
    if (props.spoiler_tag == 0) {
      // console.log("aaaaaaaaaaaaa")
      return (
        <div>
          <link rel="stylesheet" href="all_in_one.css" />
          <div className="first_review" style={{ backgroundColor: '#EEEEEE' }}>

            <div style={{marginLeft:"250px"}}>

              <h3 >Reviewer: {props.reviewer}</h3>
              <h3>Reviewer ID: {props.reviewer_id}</h3>
              <h3>Review Time: {props.review_time}</h3>
              <h3>Rating: {props.rating}</h3>
              <h3>Review Content:<br></br> <h4 style={{color:"grey"}}>{props.review_content}</h4></h3><br></br>

            </div>
            <hr style={{ filter: 'alpha(opacity=100,finishopacity=0,style=3)' }} width="100%" color="#987cb9" size={3} />
          </div>
        </div>
      );


    }
  } else {
    if (props.spoiler_tag == 1) {
      return (
        <div className="first_review" style={{ backgroundColor: '#EEEEEE' }}>

          <div style={{marginLeft:"250px"}}>
          <h3>Reviewer: {props.reviewer}</h3>
          <h3>Reviewer ID: {props.reviewer_id}</h3>
          <h3>Review Time: {props.review_time}</h3>
          <h3>Rating: {props.rating}</h3>
          <h3>Review Content: <br></br> <h4 style={{color:"red"}}>{props.review_content}</h4></h3>
          </div>
          <hr style={{ filter: 'alpha(opacity=100,finishopacity=0,style=3)' }} width="100%" color="#987cb9" size={3} />
        </div>);
    } else {

      return (
        <div className="first_review" style={{ backgroundColor: '#EEEEEE' }}>
          <div style={{marginLeft:"250px"}}>
          <h3>Reviewer: {props.reviewer}</h3>
          <h3>Reviewer ID: {props.reviewer_id}</h3>
          <h3>Review Time: {props.review_time}</h3>
          <h3>Rating: {props.rating}</h3>
          <h3>Review Content: <br></br> <h4 style={{color:"grey"}}>{props.review_content}</h4></h3>
          </div>
          <hr style={{ filter: 'alpha(opacity=100,finishopacity=0,style=3)' }} width="100%" color="#987cb9" size={3} />
        </div>);
    }
  }

}

function reviewList(nameList, currentPage, spoil) {
  var nameDOM = [];
  // console.log(currentPage)
  for (var i = currentPage; i < currentPage + 4; i++) {
    if (i < nameList.length) {
      nameDOM.push(reviewDetail({ reviewer: nameList[i].reviewer, reviewer_id: nameList[i].reviewer_id, review_time: nameList[i].review_time, rating: nameList[i].rating, review_content: nameList[i].review_content, spoiler_tag: nameList[i].spoiler_tag, spoil: spoil }))
    }
  }
  return nameDOM;
}

function Reviews(reviewInfo) {
  // const a = this.state.reviewInfo
  // console.log(reviewInfo.func)
  console.log(reviewInfo.spoil)
  // 将字典转换为列表
  var nameList = Object.values(reviewInfo.data)
  // console.log(nameList)
  // var nameList = ["Lingyun", "Yukino", "Nanami"];
  return (
    <div>
      {reviewList(nameList, reviewInfo.currentPage, reviewInfo.spoil)}
    </div>
  )
}

export default MoviePage;