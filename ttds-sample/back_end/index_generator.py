import json
import datetime
# from spellchecker import SpellChecker
import pandas
import os
import pandas as pd
import csv
import re
from stemming.porter2 import stem
import numpy as np

import get_inverted_index as gii;

result_file = 'result.json'
inverted_index_file = 'inverted_index.json'
i = 0
test_dic = []
start_1 = datetime.datetime.now()

# Process the data and return different data to front end

def date_transform(date):
    date = "".join(date.split(" "))
    time = datetime.datetime.strptime(date,'%d%B%Y')
    return time

# The default search which is a phrase search, return the movies' name
def normal_search(input, review_dic, inverted_index):
    input = input.lower()
    start = datetime.datetime.now()
    movie_list = list(review_dic)
    start_0 = datetime.datetime.now()
    result_list = {}
    words = input.split()
    for word in words:
        for movie in inverted_index.keys():
            if movie == word:
                for indecies in inverted_index[movie][1]:
                    if indecies not in result_list:
                        result_list[indecies] = 1
                    else:
                        result_list[indecies] += 1
    for key, value in result_list.items():
        movie_len = len(movie_list[int(key)].split())
        input_len = len(input.split())
        if movie_len >= input_len:
            result_list[key] = round((value / movie_len)*(value / input_len),2)
            
        else:
            result_list[key] = 0
    result_list = sorted(result_list.items(), key=lambda item:item[1], reverse=True)
    suitable_movies = []
    for tuple in result_list:
        if tuple[1] > 0.3:
            suitable_movies.append(movie_list[int(tuple[0])])
    result_dic = {}
    for movie in suitable_movies:
        result_dic[movie] = review_dic[movie]
    start_2 = datetime.datetime.now()

    return result_dic


def review_result(result_dic, movieName, given_year=0):
    all_review_result = {}
    index = 0
    index_string = 'index'
    for k, v in result_dic.items():
        if k == movieName.lower():
            if given_year == '0':
                given_year = '\\N'
            requestMovie = v[str(given_year)]
            if len(requestMovie[2]) != 0:
                for review in requestMovie[2]:
                    single_review_result = {}
                    single_review_result['reviewer'] = review['reviewer']
                    single_review_result['reviewer_id'] = review['review_id']
                    single_review_result['review_time'] = review['review_date']
                    date = date_transform(review['review_date'])
                    single_review_result['date'] = date
                    if review['rating'] is None:
                        single_review_result['rating'] = 0
                    else:
                        single_review_result['rating'] = int(review['rating'])
                    single_review_result['review_content'] = review['review_detail']
                    single_review_result['spoiler_tag'] = review['spoiler_tag']
                    index += 1
                    all_review_result[index_string+str(index)] = single_review_result
    return all_review_result
            
                    
def movie_result(result_dic, type='relevance'):
    all_movie_result = {}
    index = 1
    index_string = "index"
    for movie, review in result_dic.items():
        for year, review_info in review.items():
            single_movie_result = {}
            single_movie_result['movieName'] = movie
            if year == '\\N':
                year = '0'
            single_movie_result['year'] = int(year)
            valid_rating = []
            for single_review in review_info[2]:
                rating = single_review['rating']
                if rating is not None:
                    valid_rating.append(int(rating))
            if len(valid_rating) == 0:
                average_rating = 0
            else:
                average_rating = round(sum(valid_rating)/len(valid_rating),2)
            single_movie_result['averageRating'] = average_rating
            single_movie_result['genre'] = review_info[1]
            single_movie_result['number'] = len(review_info[2])
            all_movie_result[index_string+str(index)] = single_movie_result
            index +=1
    all_movie_result = sort_result(all_movie_result, type)
    return all_movie_result


# 根据type进行排序
def sort_result(result_list, type):
    index_string = "index"
    temp_dic = {}
    sorted_list = {}
    for i in range(len(result_list)):
        temp_dic[index_string+str(i+1)] = result_list[index_string+str(i+1)]
    if type == "popularity":
        temp_dic = sorted(temp_dic.items(), key = lambda d: d[1]['number'], reverse=True)
    elif type == 'year':
        temp_dic = sorted(temp_dic.items(), key = lambda d: d[1]['year'], reverse=True)
    elif type == 'rating':
        temp_dic = sorted(temp_dic.items(), key = lambda d: d[1]['averageRating'], reverse=True)
    elif type == 'relevance':
        temp_dic = temp_dic


    final_index = 1
    for key, value in dict(temp_dic).items():
        sorted_list[final_index] = value
        final_index += 1
    return sorted_list

def sort_review_result(result_list, type='year'):
    index_string = "index"
    temp_dic = {}
    sorted_list = {}
    for i in range(len(result_list)):
        temp_dic[index_string+str(i+1)] = result_list[index_string+str(i+1)]
    if type == 'year':
        temp_dic = sorted(temp_dic.items(), key = lambda d: d[1]['date'], reverse=True)
    elif type == 'rating':
        temp_dic = sorted(temp_dic.items(), key = lambda d: d[1]['rating'], reverse=True)

    final_index = 1
    for key, value in dict(temp_dic).items():
        sorted_list[final_index] = value
        final_index += 1
        
    return sorted_list


# Edit this function to get the users' input
def get_input_movie():
    input_movie = input("Please input the movie name: ")

    return input_movie


def getResult(movie, review_dic, inverted_index):
    result_dic = normal_search(movie, review_dic, inverted_index)
    all_movie_result = movie_result(result_dic)

    return all_movie_result

# How to use these functions
if __name__ == "__main__":

    with open(result_file) as f:
        review_dic = json.load(f)
    movie = 'The Matrix'
    inverted_index = gii.generate_index(review_dic)
    result_dic = normal_search(movie, review_dic, inverted_index)
    sort_result = review_result(result_dic, movie, 1999)
    sort_review_result(sort_result, 'rating')

