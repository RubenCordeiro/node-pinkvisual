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
                    return resolve(body);
                });
            });
        },

        /**
         * Fetches a single episode based on its id.
         * @param {String} id Id of the episode.
         * @param {String} key API key to be sent as query parameter.
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
                    return resolve(body);
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
                    return resolve(body);
                });
            });
        },

        /**
         * Fetches a list of episodes that begin with a certain letter. This is useful for listings that paginate by initial letter.
         * @param {String} letter The initial letter of the episode name. This must be only a single letter (a-z). It can also be a number (0-9), as some episodes are named that way.
         * @param {Object} options Option object to be sent as query parameters
         * @returns {Promise} Resolves to the episodes data if successful, rejects with an error otherwise
         */
        searchByFirstLetter: function(letter, options) {
            return new Promise(function(resolve, reject) {

                options = options || {};
                options.key = options.key || _key;

                pvRequest({url: 'episodes/letter/' + letter, qs: options}, function(error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body);
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
        withNiche: function(nicheId, options) {
            return new Promise(function(resolve, reject) {
                options = options || {};
                options.key = options.key || _key;

                pvRequest({url: 'niche/' + nicheId + '/episodes/', qs: options}, function (error, response, body) {
                    body = JSON.parse(body);
                    if (error || response.statusCode != 200) {
                        return reject(body.error);
                    }
                    return resolve(body);
                });
            });
        },
        }
    }

};