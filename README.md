# oembed-any
Simple oembed client that works with any url with a published `json+oembed` link.

If you are displaying html, you probably want to restrict urls to a set of trusted domains to prevent XSS attacks.

## API

```javascript
var oembed = require('oembed-any');
```

### oembed(url): Promise\<any\>

Return a promise for the oembed data for url.

Example:
```javascript
oembed('https://www.youtube.com/watch?v=J---aiyznGQ')
.then(res => {
    console.log(res.html);
});
```
