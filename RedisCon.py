import redis
import os

class RedisCon:
   r = None
   pool = None
   def __init__(self,dbn):
      self.pool = redis.ConnectionPool(host='localhost', port=6379, password='',db=dbn,decode_responses=True)
      self.r = redis.Redis(connection_pool=self.pool)

