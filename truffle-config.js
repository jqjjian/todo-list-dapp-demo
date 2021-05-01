/*
 * @Author: your name
 * @Date: 2021-04-26 22:24:10
 * @LastEditTime: 2021-05-01 15:47:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /envi-ux/Users/chenglei/work/dapp-demo/truffle-config.js
 */
module.exports = {
    // Uncommenting the defaults below
    // provides for an easier quick-start with Ganache.
    // You can also follow this format for other networks;
    // see <http://truffleframework.com/docs/advanced/configuration>
    // for more details on how to specify configuration options!
    //
    networks: {
        development: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*'
        },
        test: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*'
        }
    }
    //
}
