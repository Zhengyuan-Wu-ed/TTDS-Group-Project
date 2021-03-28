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


# def stemming_algorithms(row_list):
#     stem_list = [stem(word) for word in row_list]
#     return stem_list


# def preprocess(input):
#     output = input.split()
#     out_1 = []
#     for word in output:
#         strr = re.sub("[^\w]",' ', word).lower()
#         # if len(strr.split()) == 1:
#         out_1.append(strr.strip())
#         # else:
#         #     for s in strr.split():
#         #         out_1.append(s.strip())
#     final_output = stem(' '.join(out_1))
#     return final_output


# def generate_index(movie_list):
#     inverted_index = {}
#     for index, movie in enumerate(movie_list):
#         words = movie.split()
#         for word_position, word in enumerate(words):
#             # print(word_position)
#             # print(word)
#             if word in inverted_index:
#                 if index in inverted_index[word][1]:
#                     inverted_index[word][1][index].append(str(word_position+1))
#                 else:
#                     inverted_index[word][1][index] = [str(word_position+1)]
#             else:
#                 inverted_index[word] = []
#                 inverted_index[word].append(1)
#                 inverted_index[word].append({})
#                 inverted_index[word][1][index] = [str(word_position+1)]
#             inverted_index[word][0] = len(inverted_index[word][1])
#     return inverted_index


# def get_inverted_index():
#     with open(inverted_index_file) as f:
#         inverted_index = json.load(f)

#     return inverted_index


def best_suitable(input, result):
    input_len = input.split()
    result_len = result.split()

    return round((len(input_len) / len(result_len)),2)


# The default search which is a phrase search, return the movies' name
def normal_search(input, review_dic, inverted_index):
    input = input.lower()
    start = datetime.datetime.now()
    movie_list = list(review_dic)
    # inverted_index = generate_index(movie_list)
    start_0 = datetime.datetime.now()
    print(start_0 - start)
    result_list = {}
    words = input.split()
    for word in words:
        for movie in inverted_index.keys():
            if movie == word:
                # print(movie)
                # print(inverted_index[movie][1])
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
            # print(tuple[1])
            # print(movie_list[tuple[0]])
            suitable_movies.append(movie_list[int(tuple[0])])
    result_dic = {}
    for movie in suitable_movies:
        result_dic[movie] = review_dic[movie]
        # print(result_dic[movie])
    start_2 = datetime.datetime.now()
    print(start_2 - start_0)

    return result_dic


def review_result(result_dic, movieName, given_year=0):
    print(len(result_dic))
    all_review_result = {}
    index = 0
    index_string = 'index'
    # print(movieName)
    # print(given_year)
    # year
    # given_year = '1999'
    # print(result_dic)
    for k, v in result_dic.items():
        # print(k)
        if k == movieName.lower():
            # print("SSSSSSSS")
            # print(v)
            requestMovie = v[str(given_year)]
            # print(len(requestMovie[2]))
            if len(requestMovie[2]) != 0:
                # print(type(detail[2]))
                # print(detail[2])
                for review in requestMovie[2]:
                    single_review_result = {}
                    # print(review['reviewer'])
                    # print(review['review_id'])
                    # print(review['review_date'])
                    # print(review['rating'])
                    # print(review['review_detail'])
                    single_review_result['reviewer'] = review['reviewer']
                    single_review_result['reviewer_id'] = review['review_id']
                    single_review_result['review_time'] = review['review_date']
                    single_review_result['rating'] = review['rating']
                    single_review_result['review_content'] = review['review_detail']
                    # all_review_result[index_string+str(index)] = single_review_result
                    index += 1
                    # if(index <= 5):
                    all_review_result[index_string+str(index)] = single_review_result
        # for year, detail in v.items():
        #     # print(type(year))
        #     # print(type(given_year))
        #     if (given_year ==0):
        #         given_year = year
        #     # if str(year) == str(given_year):
        #     #     print("ssssssssss")
        #     # else:
        #     #     print(given_year)
        #     #     print(year)
        #     # print(given_year)
        #     if (str(given_year) == str(year)) & (len(detail[2]) != 0):
        #         # print(type(detail[2]))
        #         # print(detail[2])
        #         for review in detail[2]:
        #             single_review_result = {}
        #             # print(review['reviewer'])
        #             # print(review['review_id'])
        #             # print(review['review_date'])
        #             # print(review['rating'])
        #             # print(review['review_detail'])
        #             single_review_result['reviewer'] = review['reviewer']
        #             single_review_result['reviewer_id'] = review['review_id']
        #             single_review_result['review_time'] = review['review_date']
        #             single_review_result['rating'] = review['rating']
        #             single_review_result['review_content'] = review['review_detail']
        #             # all_review_result[index_string+str(index)] = single_review_result
        #             index += 1
        #             # if(index <= 5):
        #             all_review_result[index_string+str(index)] = single_review_result
                    # print(single_review_result)
    
    # print(all_review_result)
    return all_review_result
            
                    
def movie_result(result_dic, type='popularity'):
    all_movie_result = {}
    index = 1
    index_string = "index"
    for movie, review in result_dic.items():
        # if len(review) == 1:
        for year, review_info in review.items():
            single_movie_result = {}
            single_movie_result['movieName'] = movie
            # single_movie_result.append(movie)
            if year == '\\N':
                year = '0'
            # single_movie_result.append(int(year))
            single_movie_result['year'] = int(year)
            valid_rating = []
            for single_review in review_info[2]:
                rating = single_review['rating']
                # print(rating)
                if rating is not None:
                    valid_rating.append(int(rating))
            if len(valid_rating) == 0:
                average_rating = 0
            else:
                average_rating = round(sum(valid_rating)/len(valid_rating),2)
                # print(valid_rating)
                # print(len(valid_rating))
            # print(round(average_rating,2))
            single_movie_result['averageRating'] = average_rating
            single_movie_result['genre'] = review_info[1]
            single_movie_result['number'] = len(review_info[2])
            # single_movie_result.append(average_rating)
            # single_movie_result.append(review_info[1])
            # single_movie_result.append(len(review_info[2]))

            # print(single_movie_result)
            # all_movie_result.append(single_movie_result)
            all_movie_result[index_string+str(index)] = single_movie_result
            index +=1
    # print(all_movie_result)
    # print(all_movie_result[1])
    all_movie_result = sort_result(all_movie_result, type)
    return all_movie_result


# 根据type进行排序
def sort_result(result_list, type):
    # print(type)
    index_string = "index"
    temp_dic = {}
    sorted_list = {}
    for i in range(len(result_list)):
        temp_dic[index_string+str(i+1)] = result_list[index_string+str(i+1)]
    # print(temp_dic)
    if type == "popularity":
        temp_dic = sorted(temp_dic.items(), key = lambda d: d[1]['number'], reverse=True)
    elif type == 'year':
        temp_dic = sorted(temp_dic.items(), key = lambda d: d[1]['year'], reverse=True)
    elif type == 'rating':
        temp_dic = sorted(temp_dic.items(), key = lambda d: d[1]['averageRating'], reverse=True)

    # print(temp_dic)
    # sorted_list = dict(temp_dic)
    final_index = 1
    for key, value in dict(temp_dic).items():
        # print(key)
        # print(value)
        sorted_list[index_string+str(final_index)] = value
        final_index += 1
        
    # print(dict(temp_dic))
    # print(sorted_list)
    return sorted_list


# Edit this function to get the users' input
def get_input_movie():
    input_movie = input("Please input the movie name: ")

    return input_movie


def getResult(movie, review_dic, inverted_index):
    print(movie)
    # with open(result_file) as f:
    #     review_dic = json.load(f)
    result_dic = normal_search(movie, review_dic, inverted_index)
    all_movie_result = movie_result(result_dic)
    # print(np.array(all_movie_result))
    # print(type(all_movie_result))
    # print(len(all_movie_result))
    # print(all_movie_result)

    return all_movie_result

# How to use these functions
if __name__ == "__main__":

    # Read the big json file before users' input, ideally when users open the search page
    # with open(result_file) as f:
    #     review_dic = json.load(f)

    # 影评分类的测试
    with open(result_file) as f:
        review_dic = json.load(f)
    movie = 'The Matrix'
    # year = '1999'
    # print(movie)
    inverted_index = gii.generate_index(review_dic)
    result_dic = normal_search(movie, review_dic, inverted_index)
    # for item, v in review_result(result_dic).items():
    #     print(item)
    #     print(v)
    print(review_result(result_dic, movie, 1999))

    # all_movie_result = movie_result(result_dic)
    # print(all_movie_result)
    # get_movie = "hollywood"
    # getResult(get_movie)

    # mylist = [[1, 2, 3], [4, 5, 6]] 


    # result_dic = normal_search(get_movie, review_dic)

    # all_movie_result = movie_result(result_dic)
    # print(all_movie_result)
    # example = ['popularity', 'year', 'rating']
    # for a in example:
    #     print(a)
    #     all_movie_result = movie_result(result_dic, a)
    #     print(all_movie_result)

    # # A while loop in order to save time of reading json file
    # ifSearch = True
    # while ifSearch:
    #     # input_movie = input("Please input the movie name: ")
    #     input_movie = get_input_movie()
    #     print(input_movie)
    #     if input_movie == 'q':
    #         ifSearch = False
    #     else:
    #         spell = SpellChecker()
    #         # for word in input.split():
    #         #     word = spell.correction(word)
    #         correct_input = ' '.join([spell.correction(word) for word in input_movie.split()])
    #         print(correct_input)
    #         # print(correct_input)
    #         result_dic = normal_search(correct_input, review_dic)
    #         all_movie_result = movie_result(result_dic)



# input_movie = input("Please input the movie name: ")
# result_dic = search_movie()
