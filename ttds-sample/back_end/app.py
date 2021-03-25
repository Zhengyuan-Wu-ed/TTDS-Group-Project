from flask import  Flask, session;
from flask import render_template;
from flask import request;
# import search as sc;
import index_generator as ig;
import json
# app = Flask(__name__);
app = Flask(__name__, template_folder='../front_end', static_folder='../front_end/build/static')
app.config['SECRET_KEY'] = "42930583205720"

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
@app.route('/ReviewOverall'+'/<name>', methods=['GET'])
def getMoiveReview(name):
    print("Movie name: "+ name)
    # print(session)
    return session.get(name)

@app.route('/ReviewOverall', methods=['GET','POST'])
def getReview():
    # re = {'a':'a'}
    # review_dic = []
    print("START")
    if request.method == 'POST':
        data = request.get_data(as_text=True)
        # print(data)
        data = data.split('"')[1]
        # print(type(data))
        # name = data["movie"]
        if data != "":
            session[data] = ig.getResult(data)

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
    return session.get(data)

if __name__ =="__main__":
    app.run(debug=True,port=5000)
