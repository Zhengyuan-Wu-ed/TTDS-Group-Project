
import React from 'react';
import { Layout, Button} from 'antd';
 
import './MainPage.css';
import myIcon from '../images/logo.png';
import { Link} from "react-router-dom";
import HttpUtil from './HttpUtil';
import ApiUtil from './ApiUtil';
const { Header, Content } = Layout;
 
class MainPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          inputValue:'',
          reviewInfo: [],

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
              this.allReviewData = reviewDic
              this.setState({
                  reviewInfo: reviewDic
              });
              // console.log(this.state.reviewInfo)
              // console.log(this.allReviewData)
          }
      );
      // var path = `/ReviewOverall/${movieName}`
      var path = {
        pathname:'/ReviewOverall',
        state: {name:movieName},
        
      }
      this.props.history.push(path);
    }

    render(){
        return (
            <div>
            <title>main</title>
            <link rel="stylesheet" href="MainPage.css" />
            <header>
              <figure>
                <img src={myIcon} alt="logo" />
              </figure>
            </header>
            <section>
              <input type="text" className="search_content" placeholder="Please input movie name"
              onChange={this.handleChange.bind(this)} value={this.state.inputValue} color=""/>
              <Button style={{margin:"20px"}} type="primary" onClick={this.handleClickBtn}>Search</Button>
              <input type="radio" className="selector" name="choice" defaultValue="movies name" />movie
              <input type="radio" className="selector" name="choice" defaultValue="review" />review
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