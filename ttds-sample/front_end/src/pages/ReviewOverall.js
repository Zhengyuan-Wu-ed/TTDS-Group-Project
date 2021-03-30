import { Button, message } from 'antd';
import React, { Component } from 'react';
import HttpUtil from './HttpUtil';
import ApiUtil from './ApiUtil'
import imgURL from "../images/err.png"
import { useHistory, withRouter } from "react-router-dom";
class ReviewOverall extends React.Component{

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state={
            inputValue: '',
            reviewInfo: '',
            detailReviewInfo: "",
            searchMovie: '',
            loading: true,
            isReceiveReview: false,
            reviewMovieDetail: [],
            moviePageInfo: [],
            currentPage:1,
            sort_type: "",
            isSort: false,
            isReceive: false,
            url: ApiUtil.URL_movie,
            movieGenre: "",
            showGenre: "",
        }
        this.handleClickBtn = this.handleClickBtn.bind(this);
        this.handleClickBtn2 = this.handleClickBtn2.bind(this);
        this.changeState = this.changeState.bind(this);
        this.handleClickBtn4 = this.handleClickBtn4.bind(this);
    }

    handleChange(e){
        this.setState({
          inputValue:e.target.value
        })
    }
    handleClickBtn(event) {
        this.props.history.push("/");
    }
    handleClickBtn4 () {
        var movieName = this.state.inputValue
        if (this.state.inputValue == ''){
            movieName = this.state.searchMovie
        }
        console.log(this.state.url)
        if (this.state.url == ApiUtil.URL_review){
            console.log(movieName)
            HttpUtil.post(this.state.url, movieName)
            .then(
            reviewDic =>{
                this.setState({
                    reviewInfo: reviewDic,
                    searchMovie: movieName,
                    inputValue: '',
                    isReceive: true
                });
            }
        );
        }else{
            this.getGenre(movieName)
            const nameType = movieName+"'"+this.state.sort_type
            HttpUtil.post('/ReviewsSort', nameType)
            .then(
                reviewDic =>{
                    this.setState({
                        reviewInfo: reviewDic,
                        searchMovie: movieName,
                        inputValue: '',
                        isSort:false,
                        showGenre: ""
                    });
                }
            );
        }
    }
    handleClickBtn2(event) {
        this.setState({
            currentPage: this.state.currentPage+1
        })
    }
    changeSort(type){
        this.setState({
            sort_type:type,
            currentPage: 1,
            isSort: true
        })
    }
    changeResultPage(data) {
        if (data == 0){
            this.setState({
                currentPage:1
            })
        }else{
        if (this.state.currentPage+data > 1){
            if (this.state.currentPage+data < Object.values(this.state.reviewInfo).length){
                this.setState({
                    currentPage: this.state.currentPage+data
                    })
            }
        }else{
            this.setState({
            currentPage: 1
            })
        }
        }
    }
    changeState = (name) => {
        this.setState({
            reviewMovieDetail:name
        })
        const nameYear = name.movieName+"'"+name.year
        HttpUtil.post('/Reviews', nameYear)
          .then(
            reviewDic =>{
                this.setState({
                    moviePageInfo: reviewDic,
                    isReceiveReview: true
                });
            }
        );
    };

    changeShowGenre = (genre) => {
        this.setState({
            showGenre: genre.showGenre
        })
    }
    
  
    componentDidUpdate() {
        if(this.state.isReceiveReview){

            var path = {
                pathname:'/MoviePage',
                state: {reviewMovieDetail: this.state.reviewMovieDetail, moviePageInfo: this.state.moviePageInfo, review:this.state.reviewInfo, previousSearch:this.state.searchMovie},
            }
            this.props.history.push(path);
        }
        if(this.state.isReceive && this.state.url == ApiUtil.URL_review){
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
            const nameType = this.state.searchMovie+"'"+this.state.sort_type
            HttpUtil.post('/ReviewsSort', nameType)
            .then(
                reviewDic =>{
                    this.setState({
                        reviewInfo: reviewDic,
                        isSort:false
                    });
                }
            );
        }
    }
    getGenre(movieName) {
        HttpUtil.get("/ReviewGenre/"+movieName)
        .then(
            genreList => {
                this.setState({
                    movieGenre: genreList
                })
            }
        ).catch(error => {
            message.error(error.message);
            this.setState({loading:false})
        });
    }
    componentDidMount () {
        this._isMounted = true;
        if (this.props.location.state){
            this.setState({
                searchMovie: this.props.location.state.name,
                reviewInfo:this.props.location.state.review,
                loading: false
            });
            this.getGenre(this.props.location.state.name)
        }
        
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render(){
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
                        color:"white"
                    }}>

                    <Button style={{margin:"20px"}} type="primary" onClick={this.handleClickBtn}>Main Page</Button>
                        <input style={{
                            width: "400px",
                            height: "50px",
                            borderRadius: "10px",
                            color: "black"
                        }} type="text" className="search_content" placeholder={this.state.searchMovie ? this.state.searchMovie: ''} onChange={this.handleChange.bind(this)} value={this.state.inputValue}/>
                        <Button style={{margin: "20px", textAlign: "center",}} type="primary"
                                onClick={this.handleClickBtn4}>Search</Button>
                        <input style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                               name="choice"
                               defaultValue="movies name" data-default defaultChecked onClick={() => this.setState({url: ApiUtil.URL_movie})}/>movie
                        <input
                            style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                            name="choice"
                            defaultValue="review" onClick={() => this.setState({url: ApiUtil.URL_review,isReceive: false})}/>review
                    </div>
                    <div id="menu" style={{
                        backgroundColor: '#9191a5',
                        height: "100%",
                        width: '15%',
                        float: 'left',
                        padding: "2px",
                    }}>
``                      <ul className="filters">
                            <li className="section expanded">
                                <div className="title">
                                    <div className="expand">
                                    </div>
                                    <h2>Sort by</h2>
                                </div>
                                <ul>
                                    <li>
                                        <input type="radio" name="sort" data-default defaultChecked onClick={this.changeSort.bind(this,"relevance")}/>
                                    <span>Relevance</span>
                                    </li>
                                    <li>
                                        <input type="radio" name="sort" defaultValue="popular" onClick={this.changeSort.bind(this,"popularity")}/>
                                    <span>Popular</span>
                                    </li>
                                    <li>
                                        <input type="radio" name="sort" defaultValue="newest" onClick={this.changeSort.bind(this,"year")}/>
                                    <span>New Releases</span>
                                    </li>
                                    <li>
                                        <input type="radio" name="sort" defaultValue="Rating" onClick={this.changeSort.bind(this,"rating")}/>
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
                                <input type="radio" name="genre" defaultChecked onClick={this.changeShowGenre.bind(this,{showGenre:""})}/><span>Show All</span>
                            </li>
                            <GenerateGenre data={this.state.movieGenre} func={this.changeShowGenre}/></ul>
                            </li>
                        </ul>
            </div>
            
            <Reviews data={this.state.reviewInfo} func={this.changeState} currentPage ={this.state.currentPage} showGenre = {this.state.showGenre}/>


            <div className="page">
                {/*页码*/}
                <a className="first" onClick={this.changeResultPage.bind(this,0)}>First Result Page</a>
                <a className="prev" onClick={this.changeResultPage.bind(this,-4)}>&lt;=</a>
                <a className="next" onClick={this.changeResultPage.bind(this,4)}>=&gt;</a>
            </div>

             <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9"
                size={3}/>
            </section>
        </div>
        );
    }

}

function reviewDetail(props){

    function handleClickBtn3() {
        props.func({movieName:props.name, year:props.year, averageRating:props.averageRating})
      }
    const showGenre = props.showGenre
        return (
        <div className="first_review" style={{backgroundColor: '#EEEEEE'}}>
            <div style={{marginLeft:"250px"}}>
            <h2>Movie Name: {props.name}</h2>
            <h2>Year: {props.year}</h2>
            <h2>Average rating: {props.averageRating}{props.year != '0' && props.number != '0' ? <Button style={{marginLeft: "800px"}} type="primary" onClick={handleClickBtn3}>More Details</Button> : ""}</h2>
            <h2>Genre: {props.genre}</h2>
            <h2>Review number: {props.number}</h2>
            </div>   

        <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9" size={3} />
        </div>);
    }
    // }
  
  function reviewList(nameList, a, currentPage, showGenre) {
    var nameDOM = [];
    for(var i = currentPage-1; i<currentPage+3;i++){
        if (i<nameList.length){
            nameDOM.push(reviewDetail({name: nameList[i].movieName, year: nameList[i].year, averageRating: nameList[i].averageRating, genre: nameList[i].genre, number: nameList[i].number, func:a, showGenre: showGenre}))
        }

    }
    return nameDOM;
  }
  
  function Reviews(reviewInfo) {
    // 将字典转换为列表)
    var nameList = Object.values(reviewInfo.data)

    var reviewFilter = []

    for (var i = 0; i< nameList.length; i++){
        if(nameList[i].genre.indexOf(reviewInfo.showGenre)!= -1){
            reviewFilter.push(nameList[i])
        }
    }
    nameList = reviewFilter
    return (
      <div>
        {reviewList(nameList, reviewInfo.func, reviewInfo.currentPage, reviewInfo.showGenre)}
      </div>
    )
  }

  function GenreDetail(props) {

    function handleShowGenre() {
        props.func({showGenre:props.genre})
    }

      return(
          <li>
              <input type="radio" name="genre" onClick={handleShowGenre}/><span>{props.genre}</span>
          </li>

      )
  }

  function GenreList(genreList, func){
    var genreDOM = [];

    for(var i = 0; i<genreList.length;i++){
        genreDOM.push(GenreDetail({genre: genreList[i], func: func}))
      // nameDOM
    }
    return genreDOM;
  }

  function GenerateGenre(genres){
    //   console.log(genres)
      var genreList = Object.values(genres.data)
    //   console.log(genreList)
      return (
          <div>
            {GenreList(genreList, genres.func)}
          </div>
      )

  }

export default ReviewOverall;