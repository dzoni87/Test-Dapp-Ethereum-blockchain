// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },

    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0x82eCCC65a51035625F17B63c3cdB17194AF4C5E0", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  }
}
