'use strict';

var request = require('request'),
    Promise = require('bluebird'),
    urlencode = require('urlencode');

var _key = null,
    baseApiUrl = 'http://api.pinkvisual.com/get/latest/',
    pvRequest = request.defaults({baseUrl: baseApiUrl});

/**
 * pinkvisual module.
 * @module pinkvisual
 */
module.exports = {

    /**
     * Initializes the key for further API use.
     * @param key Pink Visual API key (http://api.pinkvisual.com/home/)
     */
    init: function (key) {
        _key = key;
    },

    /**
     * Episodes namespace
     * @namespace episodes
     * @memberof module:pinkvisual
     */
    episodes: {

        /**
         * Fetches a list of episodes.
         * @param parameters Query parameters (http://pink-visual-api.readthedocs.org/en/latest/parameters.html)
         * @returns {Promise} Resolves to an object with an episodes property (array of episodes) and total with the number of episodes.
         */
        all: function (parameters) {
            return new Promise(function (resolve, reject) {
                parameters = parameters || {};
                parameters.key = parameters.key || _key;

                pvRequest({url: 'episodes/all', qs: parameters}, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.episodes);
                });
            });
        },

        /**
         * Fetches a single episode based on its id.
         * @param {String} id Id of the episode.
         * @param {String} key API key to be sent as query parameter .
         * @returns {Promise} Resolves to an object with the episode information if successful, rejects with an error otherwise.
         */
        one: function (id, key) {
            return new Promise(function (resolve, reject) {
                var options = {};
                options.key = key || _key;

                pvRequest({url: 'episode/' + id, qs: options}, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.episodes.length > 0 ? body.episodes[0] : body.episodes);
                });
            });
        },

        /**
         * Fetches a list of episodes that match a certain search phrase.
         * @param {String} term The search phrase.
         * @param {Object} options Options object to be sent as query parameters.
         * @returns {Promise} Resolves to the search results if successful, rejects with an error otherwise.
         */
        search: function (term, options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                options.key = options.key || _key;

                pvRequest({url: 'episodes/search/' + urlencode(term), qs: options}, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.episodes);
                });
            });
        },

        /**
         * Fetches a list of episodes that begin with a certain letter. This is useful for listings that paginate by initial letter.
         * @param {String} letter The initial letter of the episode name. This must be only a single letter (a-z). It can also be a number (0-9), as some episodes are named that way.
         * @param {Object} options Option object to be sent as query parameters
         * @returns {Promise} Resolves to the episodes data if successful, rejects with an error otherwise
         */
        searchByFirstLetter: function (letter, options) {
            return new Promise(function (resolve, reject) {

                options = options || {};
                options.key = options.key || _key;

                pvRequest({url: 'episodes/letter/' + letter, qs: options}, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.episodes);
                });
            });
        },

        /**
         * Fetches a list of episodes that are all tagged with a certain niche.
         *
         * @param {Number} nicheId Id of the target niche
         * @param {Object} options Option object to be sent as query parameters
         * @returns {Promise} Resolves to the episodes data if successful, rejects with an error otherwise
         */
        withNiche: function (nicheId, options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                options.key = options.key || _key;

                pvRequest({url: 'niche/' + nicheId + '/episodes/', qs: options}, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.episodes);
                });
            });
        },

        /**
         * Fetches a list of episodes that all include a certain actor.
         * @param {Number} actorId The actor id
         * @param {Object} options Option object to be sent as query parameters
         * @returns {Promise} Resolves to the episodes data if successful, rejects with an error otherwise
         */
        withActor: function (actorId, options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                options.key = options.key || _key;

                pvRequest({url: 'actor/' + actorId + '/episodes', qs: options}, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.episodes);
                });
            });
        },

        /**
         * Fetches links to member videos (paid content) for an episode.
         * @param {Number} episodeId The id of the episode you want the paid content for.
         * @param {Object} options Option object to be sent as query parameters
         * @returns {Promise} Resolves to the episode paid content data if successful, rejects with an error otherwise
         */
        paidContent: function (episodeId, options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                options.key = options.key || _key;

                pvRequest({
                    url: 'episode/' + episodeId + '/paid-content/',
                    qs: options
                }, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.videos);
                });
            });
        }
    },

    /**
     * Niches namespace
     * @namespace niches
     * @memberof module:pinkvisual
     */
    niches: {


        /**
         * Fetches a list of niches.
         * @param {Object} options Option object to be sent as query parameters
         * @returns {Promise} Resolves to the niches data if successful, rejects otherwise
         */
        all: function (options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                options.key = options.key || _key;

                pvRequest({url: 'niches/all/', qs: options}, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.niches);
                });
            });
        },

        /**
         * Fetches a niche by id.
         * @param {Number} nicheId The id of the niche to load. This is the same id you get in any set of niche data.
         * @param {Object} options Option object to be sent as query parameters
         * @returns {Promise} Resolves to the niche data if successful, rejects otherwise
         */
        one: function (nicheId, options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                options.key = options.key || _key;

                pvRequest({
                    url: 'niche/' + nicheId,
                    qs: options
                }, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.niches.length > 0 ? body.niches[0] : body.niches);
                });
            });
        }
    },

    /**
     * Actors namespace
     * @namespace actors
     * @memberof module:pinkvisual
     */
    actors: {

        /**
         * Fetches a list of actors.
         * @param {Object} options Option object to sent as query parameters
         * @returns {Promise} Resolves to the actors data if successful, rejects with an error otherwise
         */
        all: function (options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                options.key = options.key || _key;

                pvRequest({
                    url: 'actors/all',
                    qs: options
                }, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.actors);
                });
            });
        },

        /**
         * Fetches a single actor based on its id.
         * @param {Number} actorId  The “id” of an actor
         * @param {Object} options Option object to be sent as query parameters
         * @returns {Promise} Resolves to the actor data if successful, rejects with an error otherwise
         */
        one: function (actorId, options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                options.key = options.key || _key;

                pvRequest({
                    url: 'actor/' + actorId,
                    qs: options
                }, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.actors.length > 0 ? body.actors[0] : body.actors);
                });
            });
        },

        /**
         * Fetches a list of actors that match a search query.
         * @param {String} term Search query term
         * @param {Object} options Option object to be sent as query parameters
         * @returns {Promise} Resolves to the actors data if successful, rejects with an error otherwise
         */
        search: function (term, options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                options.key = options.key || _key;

                pvRequest({
                    url: 'actors/search/' + urlencode(term),
                    qs: options
                }, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.actors);
                });
            });
        },

        /**
         * Fetches a list of actors whose names begin with a certain letter. This allows you to create websites paginated by letter.
         * @param {String} letter The letter to fetch by. You will receive all actors whose names begin with this letter.
         * @param {Object} options Option object to be sent as query parameters
         * @returns {Promise} Resolves to the actors data if successful, rejects with an error otherwise
         */
        searchByFirstLetter: function (letter, options) {
            return new Promise(function (resolve, reject) {

                options = options || {};
                options.key = options.key || _key;

                pvRequest({url: 'actors/letter/' + letter, qs: options}, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body.actors);
                });
            });
        }
    }

};