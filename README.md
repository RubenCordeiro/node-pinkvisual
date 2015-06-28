# node-pinkvisual
A unnoficial node wrapper for the pinkvisual API: (http://api.pinkvisual.com/home/)

# Install 

```
npm install pinkvisual  
```

# Basic Usage

## .init(key)

Initialize the module with the API key provided by pinkvisual. Create or access your API keys in: http://api.pinkvisual.com/settings/.

    var pv = require('pinkvisual');
    
    pv.init('INSERT YOUR API KEY HERE');
    
## .episodes.all([options])

Fetches a list of all the episodes available.

    var pv = require('pinkvisual');
    
    pv.episodes.all({
        start: 0, // page number (valid number)
        limit: 10, // number of items to fetch, when combined with start, this is the mechanism for pagination.
        sort: name | date | rating | relevance | random, // sorting options (choose one keyword)
        filters: [straight | gay | tranny | male | female] // restrict types of data by using this option
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
    
