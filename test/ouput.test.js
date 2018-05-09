/* eslint-disable   no-console */
// 测试输出
const clc = require('cli-color');

const runner = require('../index').runner;

let result = runner(`change`, ['change']);

console.log(JSON.stringify(result));
