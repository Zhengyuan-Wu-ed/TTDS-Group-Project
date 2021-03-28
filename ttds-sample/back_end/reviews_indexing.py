# TTDS-project
# Function: Generate a indexing file of words in reviews
import json
import os
import string
from stemming.porter2 import stem

def load_English_stop_words():
    data_path = os.path.join(os.getcwd(),'data','englishST.txt')
    ref_file = open(data_path, "r")
    English_stop_words = []#store English stop words
    for ref_line in ref_file.readlines():
        English_stop_words.append(ref_line.strip())
    return(English_stop_words)

def write_review_indexing_ToFile(filename='review_indexing.txt'):
    data_path = os.path.join(os.getcwd(), 'data', filename)
    file_write = open(data_path, "w",encoding='utf-8')
    for word, second_dic in words_dic.items():
        file_write.write(word+':'+str(len(words_dic[word]))+'\n')#word和它出现在多少篇doc里
        for doc_ID,word_pos in second_dic.items():
            for i in range(0, len(word_pos)):
                word_pos[i] = str(word_pos[i])
            positions = ",".join(word_pos)
            file_write.write('\t'+doc_ID+' : '+positions+'\n')


#Main:
print('Loading result.json')
data_path = os.path.join(os.getcwd(),'data','result.json')
with open(data_path) as f:
    data = json.load(f)

# Step-1: 构建一个reviews的字典，键是 movieName_year_reviewID， 值是预处理过的review content
print('Constructing reviews_dic...')
reviews_dic = {}
English_stop_words = load_English_stop_words()  # load English_stop_words

for key_movie, value_movie in data.items():
    #     print('Movie Name: ',key_movie)
    for key_year, value_year in value_movie.items():
        #         print(' Year: ',key_year)

        reviews_counter = -1  # 计量这是第几个review（从0开始）
        for review in value_year[2]:  # the third item of this list is review
            reviews_counter += 1
            review_content = review['review_detail']
            #             print('  Review_content:',review_content)

            # Delete punctuations
            punctuations = list(string.punctuation)
            punctuations.append('—')
            punctuations.append('\n')
            for p in punctuations:
                review_content = review_content.replace(p, '').strip()

            # split review into words
            words = review_content.split(' ')

            # To low case
            for i in range(0, len(words)):
                words[i] = words[i].lower()

            # Remove English stop words
            words = [elem for elem in words if elem not in English_stop_words]
            #             print(words)

            # Stemming
            for i in range(0, len(words)):
                words[i] = stem(words[i].lower())

            # Create a dictionary of reviews:
            #   Key is movieName_year_reviewID, value is words list(preprocessed)
            reviews_dic_key = key_movie + '_' + key_year + '_' + review['review_id']
            reviews_dic.update({reviews_dic_key: words})

#Step-2: Indexing words
print('Constructing words_dic...')
words_dic = {}  # key is word, value is {doc_ID,[word_pos1,word_pos2,...]}
for doc_ID, review in reviews_dic.items():  # For each review
    word_pos = -1  # word position
    for word in review:  # For each word in the review
        word_pos += 1
        if word not in words_dic.keys():  # 如果这个词不在words_dic里（一级字典）
            words_dic.update({word: {doc_ID: [word_pos]}})

        elif word in words_dic.keys():  # 如果这个词已经在words_dic里（一级字典）
            if doc_ID not in words_dic[word].keys():  # 如果这个doc_ID不在二级字典里
                words_dic[word].update({doc_ID: [word_pos]})
            elif doc_ID in words_dic[word].keys():  # 如果这个doc_ID在二级字典里

                recorded_word_pos = words_dic[word][doc_ID]
                recorded_word_pos.append(word_pos)
                words_dic[word].update({doc_ID: recorded_word_pos})

# Write word indexing into file
print('Writing review_indexing to file...')
write_review_indexing_ToFile()
