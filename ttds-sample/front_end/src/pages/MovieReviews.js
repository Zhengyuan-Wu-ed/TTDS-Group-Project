import {Button, message} from 'antd';
import Item from 'antd/lib/list/Item';
import React, {Component} from 'react';
import HttpUtil from './HttpUtil';
import ApiUtil from './ApiUtil'
import imgURL from "../images/err.png"
// import { Layout, Button} from 'antd';

import './all_in_one.css';

class MovieReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            searchMovie: "",
            reviewInfo: [],
            currentPage: 1,
            inputValue: '',
            url: ApiUtil.URL_review,
            isReceive: false,
            show_spoil: 0,
            isSort: false,
            sort_type: "",

        }
        this.handleClickBtn = this.handleClickBtn.bind(this)
        this.handleClickBtn2 = this.handleClickBtn2.bind(this)
        this.showSpoiler = this.showSpoiler.bind(this)
    }
    
    showSpoiler() {
        console.log(this.state.show_spoil)
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
    handleChange(e){
        this.setState({
          inputValue:e.target.value
        })
    }
    handleClickBtn(event) {
        this.props.history.push("/");
    }
    handleClickBtn2(event) {
        var movieName = this.state.inputValue
        if (this.state.inputValue == ''){
            movieName = this.state.searchMovie
        }
        // console.log(this.state.url)
        if (this.state.sort_type == ""){
            HttpUtil.post(this.state.url, movieName)
            .then(
              reviewDic =>{
                  // this.allReviewData = reviewDic;
                  console.log(reviewDic)
                  // this.allReviewData = reviewDic
                  this.setState({
                      reviewInfo: reviewDic,
                      searchMovie: movieName,
                      inputValue: '',
                      isReceive: true
                  });
              }
          );
        }else{
            const nameType = movieName+"'"+this.state.sort_type
            console.log(nameType)
            HttpUtil.post('/MovieReviews', nameType)
            .then(
                reviewDic =>{
                    console.log(reviewDic)
                    this.setState({
                        reviewInfo: reviewDic,
                        searchMovie: movieName,
                        inputValue:"",
                        isSort:false
                    });
                }
            );
        }
       
      }
    componentDidUpdate() {
        if(this.state.isReceive && this.state.url == ApiUtil.URL_movie){
          console.log(this.state.reviewInfo)
          var path = {
            pathname:this.state.url,
            state: {name:this.state.searchMovie, review:this.state.reviewInfo},
          }
          this.props.history.push(path);

          this.setState({
              isReceive:false
          })

        }
        if(this.state.isSort){
            // /ReviewsSort
            // console.log(this.state.searchMovie)
            // console.log(this.state.sort_type)
            const nameType = this.state.searchMovie+"'"+this.state.sort_type
            console.log(nameType)
            HttpUtil.post('/MovieReviews', nameType)
            .then(
                reviewDic =>{
                    // this.allReviewData = reviewDic;
                    console.log(reviewDic)
                    // this.allReviewData = reviewDic
                    this.setState({
                        reviewInfo: reviewDic,
                        // isReceiveReview: true
                        
                        isSort:false
                    });
                }
            );
        }
      }
    componentDidMount () {
        this._isMounted = true;
        console.log(this.props.location.state)
        if (this.props.location.state){
            console.log(this.props.location.state.name)
            this.setState({
                searchMovie: this.props.location.state.name,
                reviewInfo:this.props.location.state.review,
                loading: false
            });
        }
        
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    changeSort(type){
        console.log(type)
        this.setState({
            sort_type:type,
            currentPage: 1,
            isSort: true
        })
    }

    changeResultPage(data) {
        // console.log(data)
        if (data == 0){
        this.setState({
            currentPage:1
        })
        }else{
        if (this.state.currentPage+data > 1){
            this.setState({
            currentPage: this.state.currentPage+data
            })
        }else{
            this.setState({
            currentPage: 1
            })
        }
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
                        <Button style={{margin:"20px"}} type="primary" onClick={this.handleClickBtn}>Main Page</Button>
                        <input style={{
                            width: "400px",
                            height: "50px",
                            borderRadius: "10px",
                            color: "black"
                        }} type="text" className="search_content"
                        placeholder={this.state.searchMovie ? this.state.searchMovie: ''} onChange={this.handleChange.bind(this)} value={this.state.inputValue}/>
                        <Button style={{margin: "20px", textAlign: "center",}} type="primary"
                                onClick={this.handleClickBtn2}>Search</Button>
                        <input style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                               name="choice"
                               defaultValue="movies name"  onClick={() => this.setState({url: ApiUtil.URL_movie, isReceive: false})}/>movie
                        <input
                            style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                            name="choice"
                            defaultValue="review" data-default defaultChecked onClick={() => this.setState({url: ApiUtil.URL_review})}/>review
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
                                               defaultChecked onClick={this.changeSort.bind(this, "tfidf")}/>
                                        <span>TFIDF Scores</span>
                                    </li>
                                    <li>
                                        <input type="radio" name="sort" defaultValue="newest" onClick={this.changeSort.bind(this, "rating")}/>
                                        <span>Rating</span>
                                    </li>
                                    <li>
                                        <input type="radio" name="sort" defaultValue="Rating" onClick={this.changeSort.bind(this, "time")}/>
                                        <span>Time</span>
                                    </li>
                                </ul>
                            </li>
                            <form style={{display: "flex", flexDirection: "row"}} action="/exampleml/form_action.asp"
                                  method="get">
                                <input type="checkbox" name="vehicle"
                                       defaultValue="Bike" onClick={this.showSpoiler}/> <p style={{color: 'white'}}>Does it contains spoiler ?</p>
                            </form>
                        </ul>
                    </div>
                    <div id="content" style={{width: '85%', float: 'left'}}>
                        {/*component*/}
                        <Reviews data={this.state.reviewInfo} currentPage={this.state.currentPage} show_spoil={this.state.show_spoil}/>
                        
                        <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9"
                            size={3}/>

                        <div className="page">
                            {/*页码*/}
                            <a className="first" onClick={this.changeResultPage.bind(this,0)}>First Result Page</a>
                            <a className="prev" onClick={this.changeResultPage.bind(this,-4)}>&lt;=</a>
                            <a className="next" onClick={this.changeResultPage.bind(this,4)}>=&gt;</a>
                        </div>
                        <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9"
                            size={3}/>
                        <div style={{height: '200px', backgroundColor: 'white', color: 'black', margin: "15px"}}>
                            <h1>User name</h1><input type="text" name="name"/>
                            <h1 style={{marginTop: "5px"}}>Rating</h1> <input type="text" name="rating"/>
                            <form style={{ display: "flex", flexDirection: "row"}} action="/exampleml/form_action.asp" method="get">
              
                            <input type="checkbox" name="vehicle"
                                defaultValue="Bike" /> <p style={{ color: 'white' }}>Does it contains spoiler ?</p>
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

function reviewDetail(props){
  if (props.spoil == 0) {
    if (props.spoiler_tag == 0) {
        return (
        <div className="first_review" style={{backgroundColor: '#EEEEEE'}}>
            <div style={{marginLeft:"250px"}}>
            <h3>Movie name: {props.movie}</h3>
            <h3>Year: {props.year}</h3>
            <h3>Category: {props.category}</h3>
            <h3>Reviewer: {props.reviewer}</h3>
            <h3>Reviewer ID:{props.review_id} </h3>
            <h3>Review time: {props.review_date}</h3>
            <h3>Rating: {props.rating}</h3>
            <h3>Review content :{props.review_detail}</h3>
            <h3>Review Summary: {props.review_summary}</h3>
            </div>
        <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9" size={3} />
        </div>);
    }
  }else {
    if (props.spoiler_tag == 1) {
      return (
          <div className="first_review" style={{backgroundColor: '#EEEEEE'}}>
            <div style={{marginLeft:"250px"}}>
            <h3>Movie name: {props.movie}</h3>
            <h3>Year: {props.year}</h3>
            <h3>Category: {props.category}</h3>
            <h3>Reviewer: {props.reviewer}</h3>
            <h3>Reviewer ID:{props.review_id} </h3>
            <h3>Review time: {props.review_date}</h3>
            <h3>Rating: {props.rating}</h3>
            <h3>Review content :<h4 style={{color:"red"}}>{props.review_detail}</h4></h3>
            <h3>Review Summary: {props.review_summary}</h3>
            </div>  
          <hr style={{ filter: 'alpha(opacity=100,finishopacity=0,style=3)' }} width="100%" color="#987cb9" size={3} />
        </div>);
    } else {

      return (
        <div className="first_review" style={{backgroundColor: '#EEEEEE'}}>
            <div style={{marginLeft:"250px"}}>
            <h3>Movie name: {props.movie}</h3>
            <h3>Year: {props.year}</h3>
            <h3>Category: {props.category}</h3>
            <h3>Reviewer: {props.reviewer}</h3>
            <h3>Reviewer ID:{props.review_id} </h3>
            <h3>Review time: {props.review_date}</h3>
            <h3>Rating: {props.rating}</h3>
            <h3>Review content :{props.review_detail}</h3>
            <h3>Review Summary: {props.review_summary}</h3>
            </div>   
            {/* {props.year != '0' && props.number != '0' ? <Button style={{marginLeft: "800px"}} type="primary" onClick={handleClickBtn3}>More Details</Button> : ""} */}
        {/* </header> */}
        {/* </div> */}
        <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9" size={3} />
        </div>);
    }
  }
}
  
  
  function reviewList(nameList, currentPage, spoil) {
    var nameDOM = [];
    // console.log(currentPage)
    for(var i = currentPage-1; i<currentPage+3;i++){
        // console.log(nameList[i])
        if (i<nameList.length){
            nameDOM.push(reviewDetail({movie: nameList[i].movie, year: nameList[i].year, rating: nameList[i].rating, category: nameList[i].category, reviewer: nameList[i].reviewer, review_id: nameList[i].review_id, review_summary: nameList[i].review_summary,review_detail: nameList[i].review_detail,review_date: nameList[i].review_date, spoiler_tag:nameList[i].spoiler_tag, spoil: spoil}))
        }

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
        {reviewList(nameList, reviewInfo.currentPage, reviewInfo.show_spoil)}
      </div>
    )
  }

export default MovieReviews;