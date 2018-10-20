# blaze

Api for the ambr app.

### Endpoints

- `POST /api/tag`
```
{
  tag: "XXX234",
  lat: 81.2354,
  lng: -25.4244,
  img: "base64://qwerqwrfg..."
}
```

*returns 204 No Content *


- `GET /api/cases`

returns 200 with:
```
{
    "success": true,
    "data": {
        "cases": [
            {
                "_id": "5bcb8b7cf6641051bfb2327b",
                "lat": 81.2354,
                "lng": -25.4244,
                "make": "VW",
                "color": "Blue",
                "tag": "XXX234",
                "__v": 0
            },
            {
                "_id": "5bcb8be35de54551e2a72fbf",
                "lat": -80.120091,
                "lng": 26.404415,
                "make": "VW",
                "color": "Blue",
                "tag": "XXX234",
                "__v": 0
            }
        ]
    }
}
```
