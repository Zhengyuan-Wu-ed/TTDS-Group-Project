
import { Button, message } from 'antd';
import React, { Component } from 'react';
import HttpUtil from './HttpUtil';
import { useHistory, withRouter } from "react-router-dom";
class ReviewOverall extends React.Component{

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state={
            reviewInfo: [],
            searchMovie: '',
            loading: true,
            isReceive: false,
            reviewMovieDetail: [],
            moviePageInfo: [],
            currentPage:1,
            sort_type: "",
            isSort: false
        }
        this.handleClickBtn = this.handleClickBtn.bind(this);
        // this.getData = this.getData.bind(this);
        this.handleClickBtn2 = this.handleClickBtn2.bind(this);
        this.changeState = this.changeState.bind(this)
    }
    handleClickBtn2(event) {
        console.log(this.state.currentPage)
        this.setState({
            currentPage: this.state.currentPage+1
        })
    }
    changeSort(type){
        // console.log(type)
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
    changeState = (name) => {
        console.log(name)
        // var movieName = this.state.searchMovie
        this.setState({
            reviewMovieDetail:name
        })
        const nameYear = name.movieName+"'"+name.year
        console.log(nameYear)
        HttpUtil.post('/Reviews', nameYear)
          .then(
            reviewDic =>{
                // this.allReviewData = reviewDic;
                console.log(reviewDic)
                // this.allReviewData = reviewDic
                this.setState({
                    moviePageInfo: reviewDic,
                    isReceive: true
                });
            }
        );
    };
    
  
    componentDidUpdate() {
    // console.log('a')
        if(this.state.isReceive){

            var path = {
                pathname:'/MoviePage',
                state: {reviewMovieDetail: this.state.reviewMovieDetail, moviePageInfo: this.state.moviePageInfo, review:this.state.reviewInfo},
            }
            // console.log(this.props.location.state.review)
            console.log(path)
            // console.log(this.state.moviePageInfo)
            // console.log(this.state.reviewMovie)
            this.props.history.push(path);
        }
        if(this.state.isSort){
            // /ReviewsSort
            console.log(this.state.searchMovie)
            console.log(this.state.sort_type)
            const nameType = this.state.searchMovie+"'"+this.state.sort_type
            console.log(nameType)
            HttpUtil.post('/ReviewsSort', nameType)
            .then(
                reviewDic =>{
                    // this.allReviewData = reviewDic;
                    console.log(reviewDic)
                    // this.allReviewData = reviewDic
                    this.setState({
                        reviewInfo: reviewDic,
                        // isReceive: true
                        
                        isSort:false
                    });
                }
            );
        }
    }
    componentDidMount () {
        this._isMounted = true;
        var data = this.props.location.state;
        if (data){
            // console.log(data.name)
            // console.log(data)
            var {name} = data
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
    handleClickBtn(event) {
        this.props.history.push("/");
    }
    
    render(){
        if (this.state.loading) {
            return(
                    <div>
                        <img src="../images/error.png" alt="error"/>
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
                {/* <Button style={{margin:"20px"}} type="primary" onClick={this.handleClickBtn2}>Review Details</Button> */}
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
                        }} type="text" className="search_content" placeholder={this.state.searchMovie ? this.state.searchMovie: ''}/>
                        <Button style={{margin: "20px", textAlign: "center",}} type="primary"
                                onClick={this.handleClickBtn}>Search</Button>
                        <input style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                               name="choice"
                               defaultValue="movies name" />movie
                        <input
                            style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                            name="choice"
                            defaultValue="review" />review
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
            {/* <div style={{backgroundColor: '#EEEEEE'}}> */}
            
            <Reviews data={this.state.reviewInfo} func={this.changeState} currentPage ={this.state.currentPage}/>


            <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9"
                size={3}/>

            <div className="page">
                {/*页码*/}
                <a className="first" onClick={this.changeResultPage.bind(this,0)}>First Result Page</a>
                <a className="prev" onClick={this.changeResultPage.bind(this,-4)}>&lt;=</a>
                <a className="next" onClick={this.changeResultPage.bind(this,4)}>=&gt;</a>
            </div>
            {/* <reviewDetail func={this.changeState}/> */}
            </section>
        </div>
        );
    }
        

}

function reviewDetail(props){

    function handleClickBtn3() {
        // props.func;
        // console.log("a")
        props.func({movieName:props.name, year:props.year, averageRating:props.averageRating})
      }
    // console.log(props.func)
    // if (props.year == 0){
    //     this.isShow = false;
    // }
    return (
    <div className="first_review" style={{backgroundColor: '#EEEEEE'}}>
    {/* <header className="first_reviewer"> */}
        {/* <h1 style={{backgroundColor: '#EEEEEE'}}>Hello, {props.name}</h1> */}
        <h3>Movie Name: {props.name}</h3>
        <h3>Year: {props.year}</h3>
        <h3>Average rating: {props.averageRating}</h3>
        <h3>Genre: {props.genre}</h3>
        <h3>Review number: {props.number}</h3>
        
        {props.year != '0' && props.number != '0' ? <Button style={{margin: "20px"}} type="primary" onClick={handleClickBtn3}>More Details</Button> : ""}
    {/* </header> */}
    {/* </div> */}
    <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9" size={3} />
    </div>);
  }
  
  
  function reviewList(nameList, a, currentPage) {
    var nameDOM = [];
    console.log(currentPage)
    for(var i = currentPage; i<currentPage+4;i++){
        // console.log(nameList[i])
        if (i<nameList.length){
            nameDOM.push(reviewDetail({name: nameList[i].movieName, year: nameList[i].year, averageRating: nameList[i].averageRating, genre: nameList[i].genre, number: nameList[i].number, func:a}))
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
        {reviewList(nameList, reviewInfo.func, reviewInfo.currentPage)}
      </div>
    )
  }

export default ReviewOverall;