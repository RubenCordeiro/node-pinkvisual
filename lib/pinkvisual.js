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
        }
    }

};