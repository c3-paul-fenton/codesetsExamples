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
c3 prov tag -u BA -p BA -t codesets:dev -e http://localhost:8080/ -c codesets -E -r
```

Curl files (run from './metric`):
```
curlAll "*.csv" http://localhost:8080/import/1/codesets/dev ""
```