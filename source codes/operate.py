import json
import datetime
import calendar
from spellchecker import SpellChecker
import pandas
import os
import pandas as pd
import csv
import re
from stemming.porter2 import stem

inverted_index_file = '../inverted_index.json'
result_file = '../result.json'


# 简单处理了一下当天日期，并作为新的影评的名称和发表日期
def get_time():
    time = datetime.date.today()
    en_time = str(time).split('-')
    day = en_time[2]
    month = calendar.month_name[int(en_time[1])]
    year = en_time[0]
    current_date = day+" "+month+" "+year

    new_json = '../'+''.join(en_time)+"-reviews.json"

    return new_json, current_date


# review_content is a list
def add_review(review_content):

    new_json, current_date = get_time()

    new_review_dic = {}
    reviewer = review_content[0]
    review_movie = review_content[1]
    rating = review_content[2]
    spoiler = review_content[3]
    review_summary = review_content[4]
    review_detail = review_content[5]
    now = datetime.datetime.now()

    review_id = 'nrw' + str(now.year) + str(now.month) + str(now.day) + str(now.hour) + str(now.minute) + str(
        now.second) + str(now.microsecond)

    new_review_dic["review_id"] = review_id
    new_review_dic["reviewer"] = reviewer
    new_review_dic["movie"] = review_movie
    new_review_dic["rating"] = str(rating)
    new_review_dic['review_summary'] = review_summary
    new_review_dic['review_date'] = current_date
    new_review_dic["spoiler_tag"] = spoiler
    new_review_dic["review_detail"] = review_detail
    new_review_dic["helpful"] = ["0", "0"]

    # print(new_review_dic)

    # 判断当天的影评json文件是否存在，存在则读取后更新，不存在则创建新的
    exist_reviews = []
    if os.path.exists(new_json):
        with open(new_json) as f:
            previous_json = json.load(f)
            exist_reviews = previous_json
            # print(exist_reviews)
    exist_reviews.append(new_review_dic)
    with open(new_json, 'w') as f:
        json.dump(exist_reviews, f, indent=4)


def read_write_reviews(movie_dic, review_list):
    for review in review_list:
        name = review['movie'][0].lower()
        year = review['movie'][1]
        if movie_dic.get(name) is not None:
            if year in movie_dic[name]:
                movie_dic[name][year][2].append(review)
    return movie_dic


# 按当天的日期进行更新，建议每天更新一次，大概也就十几秒结束了
def update_overall():
    new_json, _ = get_time()

    print(new_json)
    if os.path.exists(new_json):
        with open(new_json) as f:
            review_list = json.load(f)
            # print(review_list)
        with open(result_file) as f:
            movie_dic = json.load(f)
        movie_dic = read_write_reviews(movie_dic, review_list)

        # 这个会修改result.json文件，测试的时候我没有使用，应该是正常运行的
        # with open(result_file, 'w') as f:
        #     json.dump(movie_dic, f, indent=4)

        # 如果之前用add_review了，可以用这个测试一下
        # result = movie_dic['the matrix']["1999"][2]
        # for item in result:
        #     if item["reviewer"] == "Yukino1234":
        #         print(item)

    else:
        print('Free day!')


if __name__ == "__main__":
    # 一个自定义的新的影评，最好按这个让用户输入数据
    # example = ['Yukino1234', ["The Matrix", "1999"], "8", 0, "Cool", "I really like it"]
    # add_review(example)
    update_overall()