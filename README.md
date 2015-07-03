# node-pinkvisual
A unnoficial node wrapper for the pinkvisual API: (http://api.pinkvisual.com/home/)

# Install 

```
npm install pinkvisual  
```

## Options object

Most of the module functions accept an optional **options** parameter.

This object has the following structure:

    {
        start: 0, // page number (valid number)
        limit: 10, // number of items to fetch, when combined with start, this is the mechanism for pagination.
        sort: 'name' | 'date' | 'rating' | 'relevance' | 'random', // sorting options (only one keyword allowed)
        filters: ['straight' | 'gay' | 'tranny' | 'male' | 'female'] // restrict types of data by using this option (it may contain more than one keyword)
    }

# Basic Usage

## .init(key)

Initialize the module with the API key provided by pinkvisual. Create or access your API keys in: http://api.pinkvisual.com/settings/.

    var pv = require('pinkvisual');
    
    pv.init('INSERT YOUR API KEY HERE');

### Episodes

## .episodes.all([options])

Fetches a list of all the episodes available.

    var pv = require('pinkvisual');
    
    pv.episodes.all({
        start: 0,
        limit: 10,
        sort: 'name',
        filters: ['straight']
    })
    .then(function(episodes) {
        console.log("All episodes:", episodes);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    
## .episodes.one(id, [options])

Fetches a single episode by it's id.

    var pv = require('pinkvisual');
    
    pv.episodes.one(12)
    .then(function(episode) {
        console.log("Episode:", episode);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    
## .episodes.search(term, [options])

Fetches a list of episodes that match a certain search phrase.

    var pv = require('pinkvisual');
    
    pv.episodes.search("Hot bush")
    .then(function(episodes) {
        console.log("Episodes:", episodes);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });

## .episodes.searchByFirstLetter(letter, [options])

Fetches a list of episodes that begin with a certain letter. This is useful for listings that paginate by initial letter.

    var pv = require('pinkvisual');
    
    pv.episodes.searchByFirstLetter('A')
    .then(function(episodes) {
        console.log("Episodes:", episodes);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    
## .episodes.withNiche(nicheId, [options])

Fetches a list of episodes that are all tagged with a certain niche.

    var pv = require('pinkvisual');
    
    pv.episodes.withNiche(2) // nicheId
    .then(function(episodes) {
        console.log("Episodes:", episodes);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    
## .episodes.withActor(actorId, [options])

Fetches a list of episodes that all include a certain actor.

    var pv = require('pinkvisual');
    
    pv.episodes.withActor(3)
    .then(function(episodes) {
        console.log("Episodes:", episodes);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });

## .episodes.paidContent(episodeId, [options])

Fetches links to member videos (paid content) for an episode.

    var pv = require('pinkvisual');
    
    pv.episodes.paidContent(3) //episodeId
    .then(function(paidContent) {
        console.log("PaidContent:", paidContent);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    
### Niches

## .niches.all([options])

Fetches a list of niches.

    var pv = require('pinkvisual');
    
    pv.niches.all()
    .then(function(niches) {
        console.log("Niches:", niches);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    
## .niches.one(nicheId, [options])

Fetches a niche by id.

    var pv = require('pinkvisual');
    
    pv.niches.one(2) //nicheId
    .then(function(niche) {
        console.log("Niche:", niche);
    })
    .error(function(error) {
        console.log("Error:", error);
    });

### Actors

## .actors.all([options])

Fetches a list of actors.

    var pv = require('pinkvisual');
    
    pv.actors.all()
    .then(function(actors) {
        console.log("Actors:", actors);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    
## .actors.one(actorId, [options])

Fetches a single actor based on its id.

    var pv = require('pinkvisual');
    
    pv.actors.one(2) // actorId
    .then(function(function(actor) {
        console.log("Actor:", actor);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    
## .actors.search(term, [options])

Fetches a list of actors that match a search query.

    var pv = require('pinkvisual');
    
    pv.actors.search("Sassy Grey")
    .then(function(actors) {
        console.log("Actors:", actors);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    
## .actors.searchByFirstLetter(letter, [options])

Fetches a list of actors whose names begin with a certain letter. This allows you to create websites paginated by letter.

    var pv = require('pinkvisual');
    
    pv.actors.searchByFirstLetter('Z')
    .then(function(actors) {
        console.log("Actors:", actors);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });

# Notes

I hope you find this library useful. If you feel like it, buy me a coffee:

<a href='http://ko-fi.com?i=2504NSRM3E9R0' target='_blank'><img style='border:0px' src='https://az743702.vo.msecnd.net/cdn/btn5.png' border='0' alt='Buy Me A Coffee at Ko-Fi.com' /></a> 