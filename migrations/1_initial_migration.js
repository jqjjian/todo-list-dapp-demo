/*
 * @Author: your name
 * @Date: 2021-04-26 22:24:10
 * @LastEditTime: 2021-04-27 15:31:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /envi-ux/Users/chenglei/work/dapp-demo/migrations/1_initial_migration.js
 */
const Migrations = artifacts.require('Migrations')

module.exports = function(deployer) {
    deployer.deploy(Migrations)
}
