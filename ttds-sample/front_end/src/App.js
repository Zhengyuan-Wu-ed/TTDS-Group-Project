
import React, {Component} from 'react';
import MainPage from './pages/MainPage';
import ReviewOverall from './pages/ReviewOverall';
import Router from "./MyRouter";
 
 
import 'antd/dist/antd.css';
import './App.css';
 
class App extends Component{
  render() {
    return (
      // <MainPage />
      // <ReviewOverall />
      <Router />
    );
  }
}
 
export default App;