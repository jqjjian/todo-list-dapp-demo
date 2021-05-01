/*
 * @Author: your name
 * @Date: 2020-11-27 09:42:13
 * @LastEditTime: 2021-04-27 09:38:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /envi-ux/Users/chenglei/work/oms-ux/.eslintrc.js
 */
module.exports = {
    root: true,
    env: {
        node: true
    },
    //   parserOptions: {
    //         ecmaVersion: 2020
    //     },
    extends: ['plugin:vue/vue3-essential', '@vue/prettier', 'eslint:recommended'],
    //   extends: ["plugin:vue/vue3-essential", "eslint:recommended",],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        //引号风格
        // quotes: [2, 'double', 'avoid-escape'],
        //强制语句分号结尾
        // semi: [0, 'always'],
        //函数定义时括号前的空格
        // "space-before-function-paren": [0, "always"],

        'no-use-before-define': [2, 'nofunc'], //不允许在未定义之前就使用变量
        // 'no-unused-vars': 0,
        'space-before-function-paren': [0, { anonymous: 'always', named: 'never' }], //方法命名前不强制使用空格

        'no-mixed-spaces-and-tabs': [0, 'smart-tabs'], //不强制tab 空格混用

        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ], //强制一致的缩进风格

        'spaced-comment': ['warn', 'always'], //多余的注释发出警告

        'no-var': 1 //使用let和const代替var
        // 'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
