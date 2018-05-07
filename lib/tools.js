function parse(str) {
    let curIndex = -1;
    return {
        eat() {
            if (++curIndex >= str.length) {
                return null;
            }
            return str.charAt(curIndex);
        },
        peek(dIndex) {
            const index = dIndex + curIndex;
            if (index >= str.length || str < 0) {
                return null;
            }
            return str.charAt(index);
        },
        getIndex() {
            return curIndex;
        }
    };
}

function leftWrapper(left) {
    return left === '"' || left === '\'' || left === '‘' || left === '“';
}

function rightWrapper(left) {
    return left === '"' || left === '\'' || left === '’' || left === '”';
}


module.exports.parse = parse;
module.exports.leftWrapper = leftWrapper;
module.exports.rightWrapper = rightWrapper;
