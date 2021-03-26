
import { Button, message } from 'antd';
import Item from 'antd/lib/list/Item';
import React, { Component } from 'react';
import HttpUtil from './HttpUtil';
// import { Layout, Button} from 'antd';
 
import './ReviewOverall.css';


var allReviewData = [];
// import myIcon from '../images/logo.png';
// function SingleReview(props) {
//     return <h3>Hello, {props.name}</h3>; <h3>Hellp, {props.age}</h3>
// }
class ReviewOverall extends React.Component{

        state = {
            reviewInfo: [],
            searchMovie: '',
        };

    constructor(props) {
        super(props);
        this.state={
            reviewInfo: [],

        }
        this.handleClickBtn = this.handleClickBtn.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount () {
        HttpUtil.get('/ReviewOverall',this.props.location.state.name)
            .then(
                reviewDic =>{

                    allReviewData = reviewDic
                    this.setState({
                        reviewInfo: reviewDic
                    });
                    console.log(this.state.reviewInfo.index1.movieName)
                }
            ).catch(error=>{
                message.error(error.message)
            })
        console.log(this.state.reviewInfo)
                
    }
    handleClickBtn(event) {
        this.props.history.push("/");
    }
    getData(){
        // console.log(this.state.reviewInfo)
        HttpUtil.get('/ReviewOverall',this.props.location.state.name)
            .then(
                reviewDic =>{
                    // this.allReviewData = reviewDic;
                    // console.log(reviewDic)
                    this.allReviewData = reviewDic
                    this.setState({
                        reviewInfo: reviewDic
                    });
                    console.log(this.state.reviewInfo.index1)
                    // console.log(this.allReviewData)
                }
            ).catch(error=>{
                message.error(error.message)
            })
        
            console.log(this.state.reviewInfo)
                    
    }
    

    render(){
        return (
            <div>
            <title>search_content</title>
            <link rel="stylesheet" href="/static/style_review.css" />
            <header className="main_header">
            <figure>
                <img src="/static/logo.png" alt="logo" />
            </figure>
            </header>
            <section className="review">
            <Button style={{margin:"20px"}} type="primary" onClick={this.getData}>Get Data</Button>
            <Button style={{margin:"20px"}} type="primary" onClick={this.handleClickBtn}>Main Page</Button>
            <div id="search" style={{backgroundColor: 'red', width: '100%', float: 'left'}} />
            <input type="text" className="search_content" placeholder={this.props.location.state.name}/>
            <button>Search</button>
            <input type="radio" className="selector" name="choice" defaultValue="movies name" />
            <input type="radio" className="selector" name="choice" defaultValue="review" />review<br />
            <div id="menu" style={{backgroundColor: '#9191a5', height: '100%', width: '15%', float: 'left'}}>
                <ul className="filters">
                <li className="section expanded">
                    <div className="title">
                    <div className="expand">
                        {/* ::before */}
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
                        {/* ::before */}
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
                    </ul>
                </li>
                </ul>
            </div>
            {/* <div>
                {
                    (allReviewData.length ==0)
                    ?null 
                    :allReviewData.map((item,index)=>{
                        return (
                            <div>
                                <span>{Item.movieName}</span>
                            </div>
                        
                        )
                        },this)   
                    }
            </div> */}
            {/* <div className="b_one_one">
                        {  
                            (dataArr.length==0)
                            ?null
                            :dataArr.map((item,index)=>{
                                return (
                                    <div>
                                        <div className='b_o_t_one_2'>
                                            <span>手机号码:</span>
                                            <span>{item.memberNum}</span>
                                            <span>短号:</span>
                                            <span>{item.memberShortNo}</span>
                                        </div>
                                    
                                    </div> 
                                )
                            },this)
                        }
                        
                    </div> */}

            
            <ReviewDetail movie="a" average="80" genre = "Sci-fi" number="09"/>
            <ReviewDetail />
            <ReviewDetail />
            <div className="first_review" style={{backgroundColor: '#EEEEEE'}}>
            <h1>{this.props.location.state.name == "The Matrix" ? 'b': 'a'}</h1>
            </div>
            {/* <div id="content" style={{backgroundColor: '#EEEEEE', height: '100%', width: '85%', float: 'left'}}>
                <div className="first_review">
                    <h3>Movie Name: {this.props.location.state.reviewInfo.index1} </h3>
                    <h3>Average rating: {this.state.reviewInfo}</h3>
                    <h3>Genre: {this.state.reviewInfo.genere}</h3>
                    <h3>Review number: {this.state.reviewInfo.reviewNumber}</h3>
                </div>
            </div> */}
            </section>  
            <footer>
            
            <p>
                TTDS CW3
            </p>
            </footer>
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
                    <h3>Movie Name: {this.props.movie}</h3>
                    <h3>Average rating: {this.props.average}</h3>
                    <h3>Genre: {this.props.genre}</h3>
                    <h3>Review number: {this.props.number}</h3>
                {/* </header> */}
                {/* </div> */}
            </div>
        );
    }
}


export default ReviewOverall;