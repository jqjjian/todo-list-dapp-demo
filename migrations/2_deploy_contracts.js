/*
 * @Author: your name
 * @Date: 2021-04-26 22:24:10
 * @LastEditTime: 2021-04-28 12:25:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /envi-ux/Users/chenglei/work/dapp-demo/migrations/2_deploy_contracts.js
 */
// const ConvertLib = artifacts.require('ConvertLib')
const TodoList = artifacts.require('TodoList')

module.exports = function(deployer) {
    deployer.deploy(TodoList)
    // deployer.link(ConvertLib, MetaCoin)
    // deployer.deploy(MetaCoin)
}
