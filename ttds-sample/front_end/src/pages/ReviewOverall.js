
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
    constructor(props) {
        super(props);
        this.state={
            reviewInfo: [],
            searchMovie: '',
            loading: false,
        }
        this.handleClickBtn = this.handleClickBtn.bind(this);
        this.getData = this.getData.bind(this);
    }
    componentDidMount () {
        var data = this.props.location.state;
        if (data){
            console.log(data.name)
            var {name} = data
            this.setState({
                searchMovie: data.name,
            })
        }
        if (this.props.location.state){
            HttpUtil.get('/ReviewOverall/'+this.props.location.state.name)
            .then(
                reviewDic =>{

                    // allReviewData = reviewDic
                    this.setState({
                        // reviewInfo: reviewDic
                        reviewInfo: reviewDic
                    });
                    console.log(this.state.searchMovie)
                    console.log(this.state.reviewInfo)
                }
            ).catch(error=>{
                message.error(error.message)
            })
        }
        
    }
    handleClickBtn(event) {
        this.props.history.push("/");
    }
    getData(){
        if (this.props.location.state){
            HttpUtil.get('/ReviewOverall/'+this.props.location.state.name)
            .then(
                reviewDic =>{

                    // allReviewData = reviewDic
                    this.setState({
                        // reviewInfo: reviewDic
                        reviewInfo: reviewDic
                    });
                    console.log(this.state.searchMovie)
                    console.log(this.state.reviewInfo)
                }
            ).catch(error=>{
                message.error(error.message)
            })
        }
        // console.log(this.state.reviewInfo)
        // HttpUtil.get('/ReviewOverall',this.props.location.state.name)
        //     .then(
        //         reviewDic =>{
        //             // this.allReviewData = reviewDic;
        //             // console.log(reviewDic)
        //             this.allReviewData = reviewDic
        //             this.setState({
        //                 reviewInfo: reviewDic
        //             });
        //             console.log(this.state.reviewInfo.index1)
        //             // console.log(this.allReviewData)
        //         }
        //     ).catch(error=>{
        //         message.error(error.message)
        //     })
        
        //     console.log(this.state.reviewInfo)
                    
    }
    

    render(){

            return (
                <div>
                <title>search_content</title>
                <section className="review">
                <Button style={{margin:"20px"}} type="primary" onClick={this.getData}>Get Data</Button>
                <Button style={{margin:"20px"}} type="primary" onClick={this.handleClickBtn}>Main Page</Button>
                <input type="text" className="search_content" placeholder={this.state.searchMovie ? this.state.searchMovie: ''}/>
                <div>
                    <ReviewDetail movie="a" average="80" genre = "Sci-fi" number="09"/>
                    <ReviewDetail />
                    <ReviewDetail />
                </div>
                <div className="first_review" style={{backgroundColor: '#EEEEEE'}}>
                {/* <h1>{this.props.location.state.name == "The Matrix" ? 'b': 'a'}</h1> */}
                </div>
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