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
    # print(inverted_index['matrix'])
    return inverted_index


def get_inverted_index():
    with open(inverted_index_file) as f:
        inverted_index = json.load(f)

    return inverted_index
