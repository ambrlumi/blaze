# blaze

Api for the ambr app.

### Endpoints

- `POST /api/tag`
```
{
  tag: "XXX234",
  lat: "81.2354",
  lng: "-25.4244",
  img: "base64://qwerqwrfg..."
}
```

*returns 204 No Content *


- `GET /api/cases`

returns 200 with:
```
{
  cases: [ 
    {
      lat: "81.2354",
      lng: "-25.4244",
      make: "VW",
      color: "Blue",
      tag: "XXX234"
    },
    {
      lat: "81.2354",
      lng: "-25.4244",
      make: "VW",
      color: "Blue",
      tag: "XXX234"
    }
  ]
}
```
