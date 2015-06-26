'use strict';

var request = require('request'),
    Promise = require('bluebird');

var pinkvisual = {},
    _key = null,
    baseApiUrl = 'http://api.pinkvisual.com/get/latest/',
    pvRequest = request.defaults({baseUrl: baseApiUrl});

/**
 * Initializes the key for further API use.
 * @param key Pink Visual API key (http://api.pinkvisual.com/home/)
 */
pinkvisual.init = function (key) {
    _key = key;
};

pinkvisual.episodes = {};

/**
 * Fetches a list of episodes.
 * @param parameters Query parameters (http://pink-visual-api.readthedocs.org/en/latest/parameters.html)
 * @returns {bluebird} Resolves to an object with an episodes property (array of episodes) and total with the number of episodes.
 */
pinkvisual.episodes.all = function (parameters) {
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
};

module.exports = pinkvisual;
