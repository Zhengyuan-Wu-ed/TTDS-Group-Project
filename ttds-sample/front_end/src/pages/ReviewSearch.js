import {Button, message} from 'antd';
import Item from 'antd/lib/list/Item';
import React, {Component} from 'react';
import HttpUtil from './HttpUtil';
import MovieReviews from "./MovieReviews";
import MainPage from "./MainPage";
// import { makeStyles } from '@material-ui/core/styles';
// import Pagination from '@material-ui/lab/Pagination';
// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             marginTop: theme.spacing(2),
//         },
//     },
// }));
//
// export default function BasicPagination() {
//     const classes = useStyles();
//     return (
//         <div className={classes.root}>
//             <Pagination count={10} />
//             <Pagination count={10} color="primary" />
//             <Pagination count={10} color="secondary" />
//             <Pagination count={10} disabled />
//         </div>
//     );
// }
import './all_in_one.css';

class ReviewSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <img src="images/err.png" alt="error"/>
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
                <title>ReviewSearch</title>
                {/* <link rel="stylesheet" href="all_in_one.css"/> */}
                <header className="main_header"/>
                <section className="review">
                    <div id="search"
                         style={{
                             backgroundColor: 'black',
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center",
                         }}>
                        {/* <div class='icon'></div> */}
                        <input style={{
                            width: "400px",
                            height: "50px",
                            borderRadius: "10px",
                            color: "black"
                        }} type="text" className="search_content"/>
                        {/*<Button style={{marginLeft: "8px",backgroundColor:"snow"}}>Search</Button>*/}
                        <Button style={{margin: "20px", textAlign: "center",}} type="primary"
                                onClick={this.handleClickBtn}>Search</Button>
                        <input style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                               name="choice"
                               defaultValue="movies name"/>movie
                        <input
                            style={{margin: "10px", textAlign: "center"}} type="radio" className="selector"
                            name="choice"
                            defaultValue="review"/>review
                    </div>
                    <div id="content"
                         style={{backgroundColor: '#EEEEEE', height: '100%', width: '100%', float: 'left'}}>
                        <div className="first_review">
                            <div className="first_reviewer">
                                <h3>Movie Name: </h3>
                                <h3>Rating: </h3>
                                <h3>Review content: </h3>
                            </div>
                            <ReviewSearchDetail movie_name={} rating={} review_con={}/>
                        </div>
                        <hr style={{filter: 'alpha(opacity=100,finishopacity=0,style=3)'}} width="100%" color="#987cb9"
                            size={3}/>
                        <div className="page">
                            {/*页码*/}
                            <a href="#" className="first">FirstPage</a>
                            <a href="#" className="prev">&lt;pre</a>
                            <a href="#" className="next">&gt;next</a>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
class ReviewSearchDetail extends React.Component {
    render() {
        return (
            <div className="reviewers">
                <h3>Movie Name: {this.props.movie_name}</h3>
                <h3>Rating: {this.props.rating}</h3>
                <h3>Review content: {this.props.review_con}</h3>
            </div>
        );
    }
}
export default ReviewSearch;