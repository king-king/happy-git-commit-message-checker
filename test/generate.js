// 将测试用例生成md文档
/* eslint-disable   no-console */
console.log('生成测试用例文档');

const fs = require('fs');
const checker = require('../lib/checker');
const input = require('./list.json');
const status = require('../lib/status');

let result = '# 测试用例';
input.forEach((item, i) => {
    let str = item.txt;
    let re = checker(str);
    let line = `\n\n${i!==0?'---\n':''}**${i+1}**\n\n\`\`\`txt\n'${str.replace(/\r/g,'\\r').replace(/\n/g,'\\n')}'\n${re.status===0?'√':'×'}\n${status[re.status]}\n\`\`\``;
    result += line;
});

fs.writeFileSync('./test/test.md', result, 'utf-8');
