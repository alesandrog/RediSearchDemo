import search
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
   return 'Hello Tutorialspoint'

@app.route('/search')
def hello_world2():
   rdb = search.Search()
   res = rdb.searchText("hello world")
   print(res)
   return 'Search succesful'


if __name__ == '__main__':
   app.run()