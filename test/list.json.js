// 测试用例
module.exports = [

    {
        txt: "build",
        result: true,
        index: 1
    }, {
        txt: "Build",
        result: true,
        index: 2
    }, {
        txt: " Build",
        result: false,
        index: 3
    }, {
        txt: "Build ",
        result: false,
        index: 4
    }, {
        txt: " Build ",
        result: false,
        index: 5
    }, {
        txt: " Build 测试",
        result: false,
        index: 6
    }, {
        txt: "测试 Build 测试",
        result: false,
        index: 7
    }, {
        txt: "【Build】",
        result: false,
        index: 8
    }, {
        txt: "release",
        result: true,
        index: 9
    }, {
        txt: "Release",
        result: true,
        index: 10
    }, {
        txt: "merge",
        result: true,
        index: 11
    }, {
        txt: "Merge",
        result: true,
        index: 12
    }, {
        txt: " Merge",
        result: false,
        index: 13
    }, {
        txt: "Merge ",
        result: true,
        index: 14
    }, {
        txt: "MergeD ",
        result: false,
        index: 15
    }, {
        txt: "Merge test",
        result: true,
        index: 16
    }, {
        txt: "【测试页】",
        result: false,
        index: 17
    }, {
        txt: "【测试页",
        result: false,
        index: 18
    }, {
        txt: "【测试页】这是个测试",
        result: true,
        index: 19
    }, {
        txt: "【测试页】这是个测试】",
        result: false,
        index: 20
    }, {
        txt: "【测试页】这是个测试【测试模块】这是个测试",
        result: false,
        index: 21
    }, {
        txt: "【测试页】这是个测试\n【测试模块】这是个测试",
        result: true,
        index: 22
    }, {
        txt: "【测试页】这是个测试\r\n【测试模块】这是个测试",
        result: true,
        index: 23
    }, {
        txt: "【测【试页】这是个测试\r\n【测试模块】这是个测试",
        result: false,
        index: 24
    }, {
        txt: "【测】试页】这是个测试\r\n【测试模块】这是个测试",
        result: false,
        index: 25
    }, {
        txt: "【测'】'试页】这是个测试\r\n【测试模块】这是个测试",
        result: true,
        index: 26
    }, {
        txt: "【测试页】这是个测试\r\n",
        result: false,
        index: 27
    }, {
        txt: "【测试页】这是个测试】\r\n",
        result: false,
        index: 28
    }, {
        txt: "【测试页】这是个测试'】'",
        result: true,
        index: 29
    }, {
        txt: "【测试页】这是个测试\"】\"",
        result: true,
        index: 30
    }, {
        txt: "【测试页】这是个测试“】”",
        result: true,
        index: 31
    }, {
        txt: "【测试页】 这是个测试", // 测试txt不能以空格开头
        result: false,
        index: 32
    }, {
        txt: "【测试页】 这是个测试“】", // 测试转义不完全
        result: false,
        index: 33
    }, {
        txt: "【测试页】 这是个测试】”", // 测试转义不完全
        result: false,
        index: 34
    }, {
        txt: "【测试页】 这是个测试】'", // 测试转义不完全
        result: false,
        index: 35
    }, {
        txt: "【测试页】 这是个测试】\"", // 测试转义不完全
        result: false,
        index: 36
    }, {
        txt: "【测试页】 这是个测试】'", // 测试转义不完全
        result: false,
        index: 37
    }, {
        txt: "【测试页】 这是个测试【", // 测试转义不完全
        result: false,
        index: 38
    }, {
        txt: "",
        result: false,
        index: 39
    }, {
        txt: "【测试页】将标题中的【去掉",
        result: false,
        index: 40
    }, {
        txt: "【测试页】将标题中的'【'去掉",
        result: true,
        index: 41
    }, {
        txt: "【测试页】将页面中的【改为】",
        result: false,
        index: 42
    }, {
        txt: "【测试页】\r\n【测试页】测试",
        result: false,
        index: 43
    }, {
        txt: "测试页】测试",
        result: false,
        index: 44
    }, {
        txt: "【测试页】测试】",
        result: false,
        index: 45
    }, {
        txt: "Delete test.js",
        result: false,
        index: 46
    }, {
        txt: "【test.xml】test",
        result: false,
        index: 47
    }
];
