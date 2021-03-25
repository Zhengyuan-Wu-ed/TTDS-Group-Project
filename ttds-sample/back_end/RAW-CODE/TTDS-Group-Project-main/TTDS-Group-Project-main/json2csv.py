import json
import datetime

import pandas
import os
import pandas as pd
import csv
import re

review_file = '../part-01.json'
test_file = '../test_review.json'
result_file = '../result.json'
file = open(review_file, 'r')
i = 0
test_dic = []
start_1 = datetime.datetime.now()
# Extract json attributes
# with open(review_file) as f:
#     # print(len(json.load(f)))
#     review_dic = json.load(f)
#     # print(review_dic[0])
#     for dic in review_dic:
#         # if i < 10000:
#         test_dic.append(dic)
#             # i += 1
# # print(test_dic[0])
#
# with open(test_file, 'w') as f:
#     json.dump(test_dic, f)

def get_name_year(name_year):
    movie_list = []
    name_year = re.sub("[–)]", '', name_year).lower().strip()
    if len(name_year.split("(")) == 2:
        name = name_year.split("(")[0]
        year = name_year.split("(")[1]
    else:
        name = name_year.split("(")[0]
        year = '0'
    movie_list.append(name.strip())
    movie_list.append(year)

    return movie_list


def if_movie(year):
    is_movie = True
    if bool(re.search(r"[a-zA-z]", year)):
        # print(year)
        is_movie = False
    elif len(year) > 4:
        # print(year)
        is_movie = False
    return is_movie


start = datetime.datetime.now()
print(start-start_1)
with open(test_file) as f:
    review_dic = json.load(f)
print(review_dic[0])
# single_review = review_dic['1']
review_list = []
for single_review in review_dic:

    movie_name = single_review['movie']
    name_year = get_name_year(movie_name)
    single_review['movie'] = name_year
    # print(single_review)
    if if_movie(name_year[1]):
        review_list.append(single_review)
print(review_list[0])


movie_file = '../movies.csv'


with open(movie_file, 'r') as f:
    movie_cont = csv.reader(f)
    movie_list = [row for row in movie_cont]
# print(movie_list[1])
movie_list.pop(0)

no_year = []
for movie in movie_list:
    # print(len(movie))

    name_year = get_name_year(movie[1])
    # print(movie_list)
    genre = re.sub("[^\w]",' ', movie[2]).lower().strip()
    movie[0] = name_year[0]
    movie[1] = name_year[1]
    movie[2] = genre

print(len(movie_list))

# review_list movie_list
movie_dic = {}
# for movies in review_list:

start = datetime.datetime.now()
for movie in movie_list:
    movie_detail = {}
    # movie = movies['movie']
    movie_name = movie[0]
    movie_year = movie[1]
    movie_genre = movie[2]
    if movie_name in movie_dic:
        # movie_detail[movie_year] = movie_genre
        movie_dic[movie_name][movie_year] = []
        movie_dic[movie_name][movie_year].append(movie_genre)

    else:
        # movie_dic[movie_name] = []
        movie_detail[movie_year] = []
        movie_detail[movie_year].append(movie_genre)
        movie_dic[movie_name] = movie_detail
        # movie_dic[movie_name][0][movie_year] = []
        # movie_dic[movie_name][0][movie_year].append(movie_genre)
print(len(movie_dic))
for review in review_list:
    name = review['movie'][0]
    year = review['movie'][1]
    reviews = []
    # print(movie_dic.get(name))
    if movie_dic.get(name) is not None:
        reviews.append(review)
        # print(review)
        # movie_dic[name][year].append(reviews)
        if year in movie_dic[name]:
            movie_dic[name][year].append(reviews)
            
with open(result_file, 'w') as f:
    json.dump(movie_dic, f)

end_1 = datetime.datetime.now()
print(end_1 - start)

