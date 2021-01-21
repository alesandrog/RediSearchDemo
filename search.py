from redisearch import Client, TextField, IndexDefinition, Query, AutoCompleter, Suggestion
import RedisCon

class Search:
    def __init__(self):
        self.client = Client("userIndx", host='localhost',
                             port=6379, conn=None, password=None)

    def searchText(self, txt):
#        q = Query(txt).verbatim().no_content().with_scores().paging(0, 5)
#        res = self.client.search(q)        
        res = self.client.search(txt)
        return res



    def suggest(self, txt):
        ac = AutoCompleter('ac')
        #ac.add_suggestions(Suggestion('foo', 5.0), Suggestion('bar', 1.0))
        res = ac.get_suggestions(txt)
        #print(res)
        #suggs = ac.get_suggestions('goo', fuzzy = True) # returns ['foo']
        return res

    def addUser(self, data):
        username = data['username']
        name = data['name']
        age = data['age']
        rdb = RedisCon.RedisCon(0)
        id = rdb.r.hincrby("counters","user",1)

        ac = AutoCompleter('ac')
        ac.add_suggestions(Suggestion(username, 5.0), Suggestion(name, 1.0))
        
        self.client.redis.hset("user:"+str(id),\
            mapping={\
                'username':username,\
                'name':name,\
                'age':age
                })      