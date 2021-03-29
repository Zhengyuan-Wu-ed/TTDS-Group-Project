
import React,{ Component } from 'react';
import { Layout, Button} from 'antd';
 

import myIcon from '../images/logo.png';
import HttpUtil from './HttpUtil';
import ApiUtil from './ApiUtil';


import './all_in_one.css';

class MainPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          inputValue:'',
          reviewInfo: {},
          foo:1,
          isReceive: false

        }
        this.handleClickBtn = this.handleClickBtn.bind(this);
    }

    handleChange(e){
      this.setState({
        inputValue:e.target.value
      })
    }

    handleClickBtn(event) {
      var movieName = this.state.inputValue
      HttpUtil.post('/ReviewOverall', movieName)
        .then(
          reviewDic =>{
              // this.allReviewData = reviewDic;
              // console.log(reviewDic)
              // this.allReviewData = reviewDic
              this.setState({
                  reviewInfo: reviewDic,
                  isReceive: true
              });
          }
      );
    }

    componentDidUpdate() {
      // console.log('a')
      var path = {
        pathname:'/ReviewOverall',
        state: {name:this.state.inputValue, review:this.state.reviewInfo},
      }
      if(this.state.isReceive){

        console.log(this.state.reviewInfo)
        this.props.history.push(path);
      }
    }

    render(){
        return (
            <div>
            <title>main</title>
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
                        }} type="text" className="search_content" placeholder="Please input movie name" onChange={this.handleChange.bind(this)} value={this.state.inputValue}/>
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

export default MainPage;