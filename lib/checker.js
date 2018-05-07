const {
    parse,
    leftWrapper,
    rightWrapper
} = require('./tools');

function checkDescriptionLine(line, postfixes) {
    let lastRightCharIndex; // 前一个【的位置
    const p = parse(line);
    let token = p.eat();
    let isOpen = false;
    let num = 0; // 记录合法【】对的个数，最多只能1个，多于1个返回false
    if (token !== '【') {
        // 首字符不符合规则
        return {
            status: 3
        };
    }
    while (token) {
        if (token === '【') {
            if (!(leftWrapper(p.peek(-1)) && rightWrapper(p.peek(1)))) {
                // 如果不是两侧包裹态，则将该【记录
                if (isOpen) {
                    // 不允许嵌套
                    return {
                        status: 4
                    };
                }
                lastRightCharIndex = p.getIndex();
                isOpen = true;
            }
        } else if (token === '】') {
            if (!(leftWrapper(p.peek(-1)) && rightWrapper(p.peek(1))) && isOpen) {
                // 如果不是两侧包裹态，且之前有一个合法的【，则走判断 descritions
                if (num === 1) {
                    // 如果已经有了一对【】，则返回false
                    return {
                        status: 5
                    };
                }
                if (/\s/.test(p.peek(1))) {
                    // 如果】右侧是空白字符
                    return {
                        status: 10
                    };
                }
                let before = -1;
                let isMatch = false;
                let str = ''; // 此时str不会为null
                while (p.peek(before)) {
                    str = p.peek(before) + str;
                    for (let i = 0; i < postfixes.length; i++) {
                        if (postfixes[i] === str) {
                            isMatch = true;
                            break;
                        }
                    }
                    before--;
                }
                if (!isMatch) {
                    return {
                        status: 6
                    }; // 【】中的内容和descritions中的没有匹配上
                } else if (isMatch && p.peek(1) === null) {
                    let index = 1;
                    let isAllSpace = true;
                    while (p.peek(index)) {
                        if (/\S/.test(p.peek(index))) {
                            isAllSpace = false;
                            break;
                        }
                        index++;
                    }
                    if (isAllSpace) {
                        return {
                            status: 7
                        }; // 【】中的内容匹配上了，但是没有描述，也就是】后面直接结尾了，没给文字描述
                    }
                }
                num++;
                isOpen = false;
            } else if (num !== 0 && !(leftWrapper(p.peek(-1)) && rightWrapper(p.peek(1)))) {
                // 如果】没有被正确包裹，并且已经有了一对儿【】，说明这个是在描述中，没有转义，报错
                return {
                    status: 1
                };
            }
        }
        token = p.eat();
    }
    if (isOpen) {
        return {
            status: 8
        }; // 没有闭合
    }
    return {
        status: 0
    };
}

function checker(message, customKeywords = [], custormPostfixes = []) {
    // console.log(clc.green('\n\n开始对git message进行检测...'));
    const postfixes = ['页', '模块'].concat(custormPostfixes); // 描述，出现在【】内
    const keywords = ['[bB]uild', '[mM]erge(\\s*|\\s+.*)', '[rR]elease'].concat(customKeywords); // 关键词，必须开头就出现
    if (!message) {
        // git message不能为空
        return {
            status: 9
        };
    }
    const lines = message.split(/\n/);
    if (lines[0]) {
        // 首先检测keyword
        if (lines[0].charAt(0) === '') {
            return {
                status: 2
            }; // 首字符不能为空
        }
        for (let i = 0; i < keywords.length; i++) {
            const reg = new RegExp(`^${keywords[i]}$`);
            const sreg = new RegExp(`^\\s${keywords[i]}$`);
            if (reg.test(lines[0])) {
                return {
                    status: 0
                };
            } else if (sreg.test(lines[0])) {
                return {
                    status: 11
                };
            }
        }
        // 如果keyword没有匹配上，继续检测descritions
        for (let i = 0; i < lines.length; i++) {
            let result = checkDescriptionLine(lines[i], postfixes);
            if (result.status !== 0) {
                let offset = `line ${i+1}`.length;
                return {
                    status: result.status
                };
            }
        }
        return {
            status: 0
        };
    }
}

module.exports = checker;
