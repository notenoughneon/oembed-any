var assert = require('assert');
var oembed = require('./index');

describe('oembed', function() {
    it('youtube', function() {
        return oembed('https://www.youtube.com/watch?v=J---aiyznGQ')
        .then(res => {
            assert.equal(res.title, 'Charlie Schmidt\'s Keyboard Cat! - THE ORIGINAL!');
        });
    });

    it('no oembed link', function() {
        return oembed('https://google.com')
        .then(res => {
            throw new Error('expected an exception');
        })
        .catch(err => {
            assert.equal(err.message, 'No oembed link found');
        });
    });

    it('link 404', function() {
        return oembed('https://google.com/asdfasdfasdfsf')
        .then(res => {
            throw new Error('expected an exception');
        })
        .catch(err => {
            assert.equal(err.message, 'https://google.com/asdfasdfasdfsf returned status 404');
        });
    });
});