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
    
## .episodes.all(parameters)

Fetches a list of all the episodes available.

    var pv = require('pinkvisual');
    
    pv.episodes.all({
        
    })
    .then(function(episodes) {
        console.log("All episodes:", episodes);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
