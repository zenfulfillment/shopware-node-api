const Promise = require('bluebird');
const request = require('request-promise');
const _ = require('lodash');

const rejectMissingUrl = () => Promise.reject(new Error('Missing url'));
const rejectMissingBody = () => Promise.reject(new Error('Missing body'));

module.exports = function ShopwareAPI({user, host, apiKey} = {}) {
  if (!user || !host || !apiKey) {
    const missing = _.keys(_.pickBy({user, host, apiKey}, _.negate(_.identity)));
    throw new Error(`Missing parameter${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`);
  }

  function _request(args) {
    return request.defaults({
      baseUrl: `${host}/api/`,
      // timeout: 30000,
      json: true,
      headers: {
        'User-Agent': 'Shopware API Client',
        'Content-Type': 'application/json; charset=utf-8'
      },
      auth: {
        user,
        pass: apiKey,
        sendImmediately: false
      }
    })(args).promise();
  }

  return {
    get(url, qs = {}) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      return _request({url, method: 'GET', qs});
    },

    post(url, body) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      if (_.isEmpty(body)) {
        return rejectMissingBody();
      }

      return _request({url, method: 'POST', body});
    },

    put(url, body) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      if (_.isEmpty(body)) {
        return rejectMissingBody();
      }

      return _request({url, method: 'PUT', body});
    },

    del(url) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      return _request({url, method: 'DELETE'});
    }
  };
};
