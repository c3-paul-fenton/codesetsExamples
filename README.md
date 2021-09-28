# CodeSet Examples Repository

## First time local setup

Docker setup
```
docker-compose -f local/docker-compose.yml up --detach
```

Provision package (run from `./local/prov`):
```
cd local/prov
ln -s ~/c3/c3base ./
ln -s ../../metricsTestRepo ./
c3 prov tag -u BA -p BA -t codesetsTimedValue:dev -e http://localhost:8080/ -c codesetsTimedValue -E -r
```

Curl files (run from './metric):
```
curlAll "*.csv" http://localhost:8080/import/1/codesetsTimedValue/dev ""
```