import redis
import os

class RedisCon:
   r = None
   pool = None
   def __init__(self,dbn):
      self.pool = redis.ConnectionPool(host='localhost', port=6379, password='',db=dbn,decode_responses=True)
      self.r = redis.Redis(connection_pool=self.pool)

   def getAllKeys(self,pattern):
      keys = []
      for key in self.r.scan_iter(pattern):
         keys.append(key)
      return { "cursor":0, "keys": keys }

   def getKeysCursor(self,cursor,pattern):
      keys = []
      keys=self.r.scan(cursor=cursor,count=10,match=pattern)
      return { "cursor":keys[0],"keys":keys[1] }
