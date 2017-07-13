const assert = require('assert');
const ShopwareAPI = require('./');

describe('ShopwareAPI', () => {
  it('should throw if required config is missing', () => {
    assert.throws(() => ShopwareAPI(), /Missing parameters: user, host, apiKey/);
  });

  it('should throw if some of required config options are missing ', () => {
    assert.throws(() => ShopwareAPI({user: 'test'}), /Missing parameters: host, apiKey/);
    assert.throws(() => ShopwareAPI({user: 'test', host: 'host'}), /Missing parameter: apiKey/);
  });
});
