// 跑npm test测试用例
/* eslint-disable   no-console */

const expect = require('chai').expect;
const list = require('./list.json.js');

const checker = require('../lib/checker');

describe('test.js正确性检测', function () {
    list.forEach((item, i) => {
        it(`功能检测-${i+1}`, () => {
            const result = checker(item.txt);
            expect(result.status === 0).to.be.equal(item.result);
        });
    });
});
