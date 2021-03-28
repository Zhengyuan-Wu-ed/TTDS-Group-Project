from flask import  Flask, session;
from flask import render_template;
from flask import request;
import json
import spellchecker

# import search as sc;
import index_generator as ig;
import get_inverted_index as gii;
import Review_Content_Search as rcs
import Review_Sorter as rs

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
# result = review_Content_Searcher.search("feel emotionally connected")
# print(result)
# result_dic = ig.normal_search(movie, review_dic, inverted_index)
# all_movie_result = ig.movie_result(result_dic)
# print(all_movie_result)

@app.route('/')
def home_page():
    return render_template('/build/index.html',name='home_page')

# @app.route('/yukino')
# def test():
#     return "YUKINO !"


# @app.route('/XX')
# def new_test():
#     return "XXXXXXX"

# @app.route('/s?wd=123')
# def answer_test():
#     return "123123";

# @app.route('/s')
# def search():
#     keyword = request.args.get('wd');
#     return ig.normal_search(keyword);
#在搜索界面可以自定义要替换的字符 然后再之后用 .replace("图片地址1",“图片地址2”) 类似的想法
@app.route('/ReviewsContent', methods=['POST'])
def getReviewsContent():
    
    # 从前端传过来的数据（phrase）
    data = request.get_data(as_text=True)
    data = data.replace('"',"")
    print(data)
    print(type(data))

    # 从后端传回前端的数据（dic）
    reviewContent_dic = {}
    reviewContent_dic = review_Content_Searcher.search(data, review_dic)


    
    return reviewContent_dic


@app.route('/Reviews', methods=['POST'])
def getReviews():
    # re = {'a':'a'}
    # review_dic = []
    data = request.get_data(as_text=True)
    data = data.replace('"',"")
    print(data)
    print(type(data))
    movieName = data.split("'")[0].lower()
    year = data.split("'")[1]
    print(movieName)
    print(year)
    # data = data.split('"')[1].lower()
    # print(data)
    # name = data["movie"]
    if movieName != "":
        result_dic = ig.normal_search(movieName, review_dic, inverted_index)
        all_reviews = ig.review_result(result_dic,movieName,year)
        # session["review_"+data] = ig.review_result(result_dic)
    print("Back-end data: "+data)
    # return json.dumps(re)
    # print(session.get(("review_"+data).lower()))
    # print(len(session.get(("review_"+data))))
    # return session.get(("review_"+data))
    return all_reviews

@app.route('/ReviewOverall'+'/<name>', methods=['GET'])
def getMoiveReview(name):
    print("Movie name: "+ name)
    # print(session)
    return session.get(name.lower())

@app.route('/ReviewOverall', methods=['GET','POST'])
def getReview():
    # re = {'a':'a'}
    # review_dic = []
    print("START")
    if request.method == 'POST':
        data = request.get_data(as_text=True)
        # print(data)
        data = data.split('"')[1].lower()
        # print(type(data))
        # name = data["movie"]
        if data != "":
            session[data] = ig.getResult(data, review_dic, inverted_index)

        # re = {
        #     'movieName': "The Matrix",
        #     'averageRating': "8",
        #     'genere': "Sci-fi",
        #     'reviewNumber': len(review_dic)
        # }
        
        # re = {'a':'b'}
        # print(re)
        # print(session.get('review_dic'))
        print("Back-end data: "+data)
    # return json.dumps(re)
    
    return session.get(data.lower())

if __name__ =="__main__":
    
    # print(movie)
    app.run(debug=True,port=5000)
