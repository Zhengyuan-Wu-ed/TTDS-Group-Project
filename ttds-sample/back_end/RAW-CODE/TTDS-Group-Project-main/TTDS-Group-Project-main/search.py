import json
import datetime
from spellchecker import SpellChecker
import pandas
import os
import pandas as pd
import csv
import re
from stemming.porter2 import stem

result_file = '../result.json'
inverted_index_file = '../inverted_index.json'
i = 0
test_dic = []
start_1 = datetime.datetime.now()


def stemming_algorithms(row_list):
    stem_list = [stem(word) for word in row_list]
    return stem_list


def preprocess(input):
    output = input.split()
    out_1 = []
    for word in output:
        strr = re.sub("[^\w]",' ', word).lower()
        # if len(strr.split()) == 1:
        out_1.append(strr.strip())
        # else:
        #     for s in strr.split():
        #         out_1.append(s.strip())
    final_output = stem(' '.join(out_1))
    return final_output


def generate_index(movie_list):
    inverted_index = {}
    for index, movie in enumerate(movie_list):
        words = movie.split()
        for word_position, word in enumerate(words):
            # print(word_position)
            # print(word)
            if word in inverted_index:
                if index in inverted_index[word][1]:
                    inverted_index[word][1][index].append(str(word_position+1))
                else:
                    inverted_index[word][1][index] = [str(word_position+1)]
            else:
                inverted_index[word] = []
                inverted_index[word].append(1)
                inverted_index[word].append({})
                inverted_index[word][1][index] = [str(word_position+1)]
            inverted_index[word][0] = len(inverted_index[word][1])
    return inverted_index


def get_inverted_index():
    with open(inverted_index_file) as f:
        inverted_index = json.load(f)

    return inverted_index


def best_suitable(input, result):
    input_len = input.split()
    result_len = result.split()

    return round((len(input_len) / len(result_len)),2)


# The default search which is a phrase search, return the movies' name
def normal_search(input, review_dic):
    input = input.lower()
    start = datetime.datetime.now()
    movie_list = list(review_dic)
    inverted_index = generate_index(movie_list)
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
    start_2 = datetime.datetime.now()
    print(start_2 - start_0)

    return result_dic


# Edit this function to get the users' input
def get_input_movie():
    input_movie = input("Please input the movie name: ")

    return input_movie


# How to use these functions
if __name__ == "__main__":

    # Read the big json file before users' input, ideally when users open the search page
    with open(result_file) as f:
        review_dic = json.load(f)

    # A while loop in order to save time of reading json file
    ifSearch = True
    while ifSearch:
        # input_movie = input("Please input the movie name: ")
        input_movie = get_input_movie()
        if input_movie == 'q':
            ifSearch = False
        else:
            spell = SpellChecker()
            # for word in input.split():
            #     word = spell.correction(word)
            correct_input = ' '.join([spell.correction(word) for word in input_movie.split()])
            # print(correct_input)
            result_dic = normal_search(correct_input, review_dic)



# input_movie = input("Please input the movie name: ")
# result_dic = search_movie()
