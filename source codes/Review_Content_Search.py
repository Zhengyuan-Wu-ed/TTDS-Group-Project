import os
import string
from stemming.porter2 import stem
import math
import string

class Review_Content_Searcher:
    words_dic = {}

    def __init__(self):# Constructor
        self.words_dic = read_words_indexing()
        print("Loading complete.")

    def search(self, phrase, Max_num=150):# Take a String like:"feel emotionally connected",
                        #  return search results as a dictionary
        TFIDF_results = TFIDF_search(phrase, words_dic = self.words_dic, max_result_num = Max_num)
        search_results=[]
        for review in TFIDF_results:
            movie_name, year, review_id = review[0].split("_")
            TFIDF_score = review[1]
            search_results.append([movie_name,year,review_id,TFIDF_score])

        return search_results


#从txt文件中读取并重新构建字典：words_dic
def read_words_indexing():
    data_path = os.path.join(os.getcwd(),'review_indexing.txt')
    # data_path = "C:\\Users\\WZY\\miniconda3\\envs\\TTDS\\TTDS\\review_indexing.txt"
    file_read = open(data_path,'r',encoding='utf-8')
    print("Loading from",data_path)
    
    words_dic={}# key is word, value is {doc_ID,[word_pos1,word_pos2,...]}
    word=''
    for line in file_read.readlines():
        if line[0] != '\t':
            word = line.split(':')[0]
            word_count = line.split(':')[1]
            
        elif line[0] == '\t':
            line = line.strip()
            doc_ID = line.split(" : ")[0]
            word_pos = line.split(" : ")[1].split(",")
            for i in range(0,len(word_pos)):
                word_pos[i] = int(word_pos[i])
            if word not in words_dic.keys():#如果这个单词不在字典里
                words_dic.update({word:{doc_ID : word_pos}})#一二级字典都添加
            elif word in words_dic.keys():#如果这个单词在字典里
                words_dic[word].update({doc_ID : word_pos})#只更新二级字典

    return words_dic

def load_English_stop_words():
    data_path = os.path.join(os.getcwd(),'','englishST.txt')
    ref_file = open(data_path, "r")
    English_stop_words = []#store English stop words
    for ref_line in ref_file.readlines():
        English_stop_words.append(ref_line.strip())
    return(English_stop_words)

def find_df(word, words_dic):
    if word in words_dic.keys():
        return len(words_dic[word])
    else:
        return None

def find_tf(word, doc_ID, words_dic):
    if word in words_dic.keys() and doc_ID in words_dic[word].keys():
        return len(words_dic[word][doc_ID])
    else:
        return None

def simple_search(searched_word, words_dic): #Return the doc_ID of reviews that the searched_word appears
#     print('simple search: \"', searched_word, "\"")
    doc_IDs = []
    searched_word = stem(searched_word.lower())
    if words_dic.get(searched_word) == None:
#         print('Cannot find the word: ', searched_word)
        return None
    for doc_ID,word_pos in words_dic[searched_word].items():
        doc_IDs.append(doc_ID)
#     print('result: doc_IDs = ', doc_IDs, '\n')
    return doc_IDs


#需要review的总数量，想个办法把review的总数弄成全局变量!!!
#line是用户输入的查询请求，
#total_DOC_num指review的总数量，
#max_result_num是返回结果数量的最大值（多余这个数字的结果部分不会返回）
def TFIDF_search(line, words_dic, total_DOC_num=430283, max_result_num=150):
    #Delete punctuations
    punctuations = list(string.punctuation)
    punctuations.append('—')
    punctuations.append('\n')
    for p in punctuations:
        line = line.replace(p, '').strip()

    #split review into words
    words = line.split(' ')

    # To low case
    for i in range(0,len(words)):
        words[i] = words[i].lower()

    #Remove English stop words
    English_stop_words = load_English_stop_words()# load English_stop_words
    words = [elem for elem in words if elem not in English_stop_words]

    #Stemming
    for i in range(0,len(words)):
        words[i]=stem(words[i].lower())

    print('Preprocessed words:',words)


    DOC_where_words_appears=[]
    for word in words:
        DOCs = simple_search(word, words_dic)#documents where this word appears
        DOC_where_words_appears.append(DOCs)
#     print(DOC_where_words_appears)

    union_set=[]#set of document.NO where at least one word appears in
    for DOCs in DOC_where_words_appears:#Find the union of these set
        union_set = list(set(union_set).union(set(DOCs)))
#     print('union_set=',union_set)
#     print('union_set size = ',len(union_set))


    #Find the score for each documnet basing on TFIDF term weighting
    DOC_scores=[]#([DOCNO-1,score],[DOCNO-2,score]...[DOCNO-n,score])
    for DOCNO in union_set:#For each document
        DOC_score=0
        for word in words:#For each word
            word_tf = find_tf(word,DOCNO, words_dic)
            word_df = find_df(word, words_dic)
#             print('word_tf=',word_tf)
#             print('word_df=',word_df)
            if word_tf!=None:#If this word is not in the document,we do not calculate it
                word_TFIDF = (1+math.log10(word_tf))*math.log10(total_DOC_num/word_df)
                DOC_score+=word_TFIDF
        DOC_scores.append([DOCNO,DOC_score])
#         print('DOC_score=',DOC_score)
#         break


    DOC_scores=sorted(DOC_scores, key=(lambda x: x[1]),reverse=True)
#     print('DOC_scores=',DOC_scores)

    if len(DOC_scores)>max_result_num:
        return DOC_scores[0:max_result_num]
    else:
        return DOC_scores




if __name__ =="__main__":
    print("main run")
    review_Content_Searcher = Review_Content_Searcher()
    result = review_Content_Searcher.search("feel emotionally connected")
    for r in result:
        print(r)