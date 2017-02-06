var request = require('request');
var cheerio = require('cheerio');

function get(url) {
    return new Promise((resolve, reject) => {
        request.get({url, headers: {'User-Agent': 'request'}}, (err, result) => err !== null ? reject(err) : resolve(result));
    });
}

module.exports = function(url) {
    return get(url)
    .then(res => {
        if (res.statusCode !== 200)
            throw new Error(url + ' returned status ' + res.statusCode);
        var $ = cheerio.load(res.body);
        var link = $('link[rel=\'alternate\'][type=\'application/json+oembed\'],' +
            'link[rel=\'alternate\'][type=\'text/json+oembed\']').attr('href');
        if (link == null)
            throw new Error('No oembed link found');
        return get(link);
    })
    .then(res => {
        if (res.statusCode !== 200)
            throw new Error(link + ' returned status ' + res.statusCode);
        return JSON.parse(res.body);
    })
}