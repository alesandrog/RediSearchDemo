# RediSearch Demo

## Tools

#### [RediSearch](https://oss.redislabs.com/redisearch/Quick_Start/) - Redis Secondary Index & Query Engine

###### Run with docker

```bash
docker run -p 6379:6379 redislabs/redisearch:latest
```

#### [redisearch-py](https://github.com/RediSearch/redisearch-py) - Python client for RediSearch

###### Install using pip

```bash
pip3 install redisearch
```

#### [Flask](https://github.com/pallets/flask) - Web Framework

###### Install using pip

```bash
pip3 install -U Flask
```

## Usage

Connect to redis-cli

```bash
docker exec -it REDIS_CONTAINER /bin/bash
```
```bash
root@ee2797135b20:/data# redis-cli
```
Create the "userIndx" index in Redis

```bash
127.0.0.1:6379> FT.CREATE userIndx ON HASH PREFIX 1 user: SCHEMA username TEXT WEIGHT 5.0 name TEXT age NUMERIC
```

Start flask server, running by default on <b> http://localhost:5000 </b>

```bash
python3 server.py
```


By now, you should be able to add and search users in the web app.

## License
[MIT](https://choosealicense.com/licenses/mit/)