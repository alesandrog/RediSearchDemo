from redisearch import Client

# , TextField, IndexDefinition, Query


class Search:
    def __init__(self):
        self.client = Client("myIdx", host='localhost',
                             port=6379, conn=None, password=None)

    def searchText(self, txt):
        res = self.client.search(txt)
        return res
# Creating a client with a given index name
#client = Client("myIndex5")

# IndexDefinition is avaliable for RediSearch 2.0+
#definition = IndexDefinition(prefix=['doc:', 'article:'])

# Creating the index definition and schema
#client.create_index((TextField("title", weight=5.0), TextField("body")), definition=definition)


# Indexing a document for RediSearch 2.0+
"""
client.redis.hset('doc:7',
                mapping={
                    'title': 'RediSearch',
                    'body': 'Redisearch impements a search engine on top of redis'
                })

# Indexing a document for RediSearch 1.x
client.add_document(
    "doc:8",
    title="RediSearch",
    body="Redisearch implements a search engine on top of redis",
)

# Simple search
res = client.search("search engine")

# the result has the total number of results, and a list of documents
print(res)
print(res.total) # "2"
print(res.docs[0].title) # "RediSearch"

# Searching with complex parameters:
q = Query("search engine").verbatim().no_content().with_scores().paging(0, 5)
res = client.search(q)
"""
