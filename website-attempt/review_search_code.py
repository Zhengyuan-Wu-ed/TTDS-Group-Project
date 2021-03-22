import os
from flask import Flask, render_template, request

#main
dir_path = os.path.dirname(os.path.realpath(__file__))
cwd = os.getcwd()
print("dir_path =",dir_path)
print("cwd =",cwd)

app = Flask(__name__)

app.static_folder = 'static' #https://stackoverflow.com/questions/13772884/css-problems-with-flask-web-app
print("static_folder path:",os.path.abspath(app._static_folder))
print("template_folder path:",os.path.abspath(app.template_folder))

@app.route('/')
def index():
   return render_template("index.html")

# def review_interface():
#     return render_template("review_interface.html")

if __name__ == '__main__':
   app.run()