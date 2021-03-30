from flask import  Flask, session;
from flask import render_template;
from flask import request;
# import search as sc;
import index_generator as ig;
import get_inverted_index as gii;
import Review_Content_Search as rcs
import Review_Sorter as rs
import json
# import spellchecker
# app = Flask(__name__);
app = Flask(__name__, template_folder='../front_end', static_folder='../front_end/build/static')
app.config['SECRET_KEY'] = "42930583205720"

result_file = 'result.json'
inverted_index_file = 'inverted_index.json'

with open(result_file) as f:
    review_dic = json.load(f)
# movie = 'hollywood'
inverted_index = gii.generate_index(review_dic)
review_Content_Searcher = rcs.Review_Content_Searcher()

# review_Content_Searcher = rcs.Review_Content_Searcher()
# result = review_Content_Searcher.search("feel emotionally connected")
# print(result)
# result_dic = ig.normal_search(movie, review_dic, inverted_index)
# all_movie_result = ig.movie_result(result_dic)
# print(all_movie_result)

@app.route('/')
def home_page():
    return render_template('/build/index.html',name='home_page')


@app.route('/MovieReviews', methods=['POST'])
def getReviewsContent():

    data = request.get_data(as_text=True)
    data = data.replace('"',"")
    data = data.split("'")
    sort_type = ''
    reviewContent_dic = {"a":"b"}
    input_data = data[0]
    if len(data) > 1:
        sort_type = data[1]
    reviewContent_dic = review_Content_Searcher.search(data[0], review_dic)
    if sort_type == 'rating':
        reviewContent_dic = rs.sort_by_rating(reviewContent_dic)
    elif sort_type == 'time':
        reviewContent_dic = rs.sort_by_time(reviewContent_dic)

    return reviewContent_dic


@app.route('/ReviewsSort', methods=['POST'])
def getSortedReviews():
    all_reviews = {}
    data = request.get_data(as_text=True)
    data = data.replace('"',"")
    genre = {}
    movieName = data.split("'")[0].lower()
    sort_type = data.split("'")[1]


    if movieName != "":
        result_dic = ig.normal_search(movieName, review_dic, inverted_index)
        all_reviews = ig.movie_result(result_dic, sort_type)
    
    index = 1
    for k, v in all_reviews.items():
        for category in v['genre'].split(","):
            if category not in genre.values():
                if category != '\\N':
                    # print(category)
                    genre[index]=category
                    index += 1
    session["genre"+movieName] = genre
    return all_reviews

@app.route('/ReviewGenre'+'/<name>', methods=['GET'])
def getMoiveGenre(name):
    return session.get("genre"+name)


@app.route('/ReviewsContentSort', methods=['POST'])
def getSortedReviewsContent():
    all_reviews = {}
    data = request.get_data(as_text=True)
    data = data.replace('"',"")
    movieName = data.split("'")[0].lower()
    year = data.split("'")[1]
    sort_type = data.split("'")[2]
    if movieName != "":
        result_dic = ig.normal_search(movieName, review_dic, inverted_index)
        all_reviews = ig.review_result(result_dic,movieName,year)
        all_reviews = ig.sort_review_result(all_reviews,sort_type)
    return all_reviews


@app.route('/Reviews', methods=['POST'])
def getReviews():
    
    data = request.get_data(as_text=True)
    data = data.replace('"',"")
    movieName = data.split("'")[0].lower()
    year = data.split("'")[1]
    if movieName != "":
        result_dic = ig.normal_search(movieName, review_dic, inverted_index)
        all_reviews = ig.review_result(result_dic,movieName,year)
    return all_reviews

@app.route('/ReviewOverall'+'/<name>', methods=['GET'])
def getMoiveReview(name):
    # print("Movie name: "+ name)
    # print(session)
    return session.get(name.lower())

@app.route('/ReviewOverall', methods=['GET','POST'])
def getReview():
    movies = ""
    genre = {}
    if request.method == 'POST':
        data = request.get_data(as_text=True)
        data = data.split('"')[1].lower()
        if data != "":
            movies = ig.getResult(data, review_dic, inverted_index)
    
        index = 1
    for k, v in movies.items():
        for category in v['genre'].split(","):
            if category not in genre.values():
                genre[index]=category
                index += 1
    session["genre"+data] = genre
    return movies

if __name__ =="__main__":
    
    app.run(debug=False,host='0.0.0.0',port=6001)
