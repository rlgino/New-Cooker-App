# API in Go

### Testing the API

```shell
curl --location 'localhost:8080/push' \
--header 'Content-Type: application/json' \
--data '{
    "tokens": ["c-LGkqBwT4uwZGkidQVtiX:APA91bE1bhzKYT_QQr32FfM69k2d1cTK1k0oA8kBR-uCgtQv_tbH1hobmtN9JDj6ji_JrieZjaglwvuExgRPq0HQ8wprfx0-duNDnetGxYQ1G5jOJlwSJNEZhVnxYTo_Uav13RRt04A8"],
    "image_url": "https://firebasestorage.googleapis.com/v0/b/recetario-2021.appspot.com/o/default.jpg?alt=media&token=8f127231-173b-4291-9e2e-5f83b5e038d1"
}'
```

### Pushing container to GCP
