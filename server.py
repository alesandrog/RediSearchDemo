import search
import flask
from flask import Flask, request
from flask import jsonify
import json


app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hi, from Flask'


@app.route('/search/<txt>', methods=["GET"])
def searchUser(txt):
 #  data = json.loads(request.data)
    rdb = search.Search()
    res = rdb.searchText(txt)

    finalres = []
    for x in res.docs:
        val = {
            'username': x.username,
            'name': x.name,
            'age': x.age
        }
        finalres.append(val)
    finaldata = {
        'data': finalres
    }
    return jsonify(finaldata), 200, {'Content-Type': 'application/json'}


@app.route('/autocomplete/<txt>', methods=["GET"])
def autocomplete(txt):
    rdb = search.Search()
    res = rdb.suggest(txt)

    finalres = []
    for x in res:
        finalres.append(str(x))
    finaldata = {
        'data': finalres
    }
    #return 'piola'
    return jsonify(finaldata), 200, {'Content-Type': 'application/json'}

@app.route('/add', methods=['POST'])
def add():
    rdb = search.Search()
    userInfo = json.loads(request.data)
    data = {
        'username': userInfo['username'],
        'name': userInfo['name'],
        'age': userInfo['age']
    }
    rdb.addUser(data)
    return jsonify({}), 200, {'Content-Type': 'application/json'}


if __name__ == '__main__':
    app.run()
