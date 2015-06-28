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
