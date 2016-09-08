import request = require('request');
import cheerio = require('cheerio');

var get = function(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        request.get({url, headers: {'User-Agent': 'request'}}, (err, result) => err !== null ? reject(err) : resolve(result));
    });
}

export default async function oembed(url: string) {
    var res = await get(url);
    if (res.statusCode !== 200)
        throw new Error(url + ' returned status ' + res.statusCode);
    var $ = cheerio.load(res.body);
    var link = $('link[rel=\'alternate\'][type=\'application/json+oembed\'],' +
        'link[rel=\'alternate\'][type=\'text/json+oembed\']').attr('href');
    if (link == null)
        throw new Error('No oembed link found');
    var res = await get(link);
    if (res.statusCode !== 200)
        throw new Error(link + ' returned status ' + res.statusCode);
    return JSON.parse(res.body);
}