import json
from operator import itemgetter

# sort by "Rating"
def sort_by_rating(original_dic):
    list_of_dics = []
    for index_key in original_dic:
        dic = original_dic[index_key].copy()
        if dic["rating"] != None:
            dic["rating"] = int(dic["rating"])
            list_of_dics.append(dic)

    # sort list of dictionary
    newlist = sorted(list_of_dics, key=itemgetter('rating'), reverse=True)
    # convert it to a dictionary again
    result_dic = {}
    index = 0
    for review in newlist:
        result_dic["index_" + str(index)] = review
        index += 1

    return result_dic

# '20 October 2020' => 20201020
def convert_date_to_number(date):
    day, month, year = date.split(" ")
    if int(day)<10:
        day = "0"+day
    # deal with month(it is not a number)
    month_names = ["January","February","March","April","May","June","July",
                   "August", "September","October","November","December" ]
    month_num = ["01","02","03","04","05","06","07","08","09","10","11","12"]
    for i in range(0,12):
        if month==month_names[i]:
            month=month_num[i]

    str_date_num = year+month+day
    return int(str_date_num)


def convert_number_to_date(date_number):
    day = date_number % 100
    month = int((date_number % 10000) / 100)
    year = int(date_number / 10000)

    # deal with month
    month_names = ["January", "February", "March", "April", "May", "June", "July",
                   "August", "September", "October", "November", "December"]
    month_num = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    if month < 10:
        month = "0" + str(month)
    else:
        month = str(month)
    for i in range(0, 12):
        if month == month_num[i]:
            month = month_names[i]

    return (str(day) + " " + month + " " + str(year))


# sort by "New Releases"
def sort_by_time(original_dic):
    list_of_dics = []
    for index_key in original_dic:
        #         print(index_key)
        dic = original_dic[index_key].copy()
        if dic["review_date"] != None:
            dic["review_date"] = convert_date_to_number(dic["review_date"])
            list_of_dics.append(dic)

    # sort list of dictionary
    newlist = sorted(list_of_dics, key=itemgetter('review_date'), reverse=True)
    # convert it to a dictionary again
    result_dic = {}
    index = 0
    for review in newlist:
        review["review_date"] = convert_number_to_date(review["review_date"])
        result_dic["index_" + str(index)] = review
        index += 1

    return result_dic


def get_movie_reviews_by_category(original_dic, category_name):
    result_dic = {}
    index = 0
    for index_key in original_dic:
        review = original_dic[index_key]

        # convert category to a list of string
        category = []
        if review["category"].find(",") == -1:
            category.append(review["category"])
        else:
            category = review["category"].split(",")
        # print(category)

        for cat in category:
            if cat == category_name:
                result_dic["index_" + str(index)] = review
                index += 1
    return result_dic

if __name__ =="__main__":
    with open('searched_review_dic.json') as f:
        data = json.load(f)

    # sort dic by rating:
    # result = sort_by_rating(data)
    # for index_key in result:
    #     print(result[index_key]["rating"])

    # sort dic by time
    # result = sort_by_time(data)
    # for index_key in result:
    #     print("index =", index_key, result[index_key]["review_date"])

    # get dic by category:
    result = get_movie_reviews_by_category(data, "Sci-Fi")
    for index_key in result:
        print("index =", index_key, result[index_key]["category"])