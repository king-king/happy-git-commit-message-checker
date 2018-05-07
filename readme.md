# git commit message 语法检测

>自动检测git commit message是否符合语法

## 安装

```bash
npm install happy-git-commit-message-checker --save-dev
```

## 语法规则

```txt
message -> desc | kws

desc -> line + EOL + line...

line -> 【 + tag + 】 + txt

tag -> txt + postfix

postfix -> {'页'|'模块'...}

kws -> {'build'|'release','merge'...}

txt -> {^【,^】}
```

**备注**：

* txt是由非【、】字符组成的字符串，其中首字符不能是空白字符，如果txt中需要出现【或】，需要转义

* 【、】转义规则：两侧用引号包裹，如“【”或‘【’或'【'或"【"

* **postfix**和**kws**是可以拓展的，系统支持传入自定义数值。

## 用法示例

* 【测试页】这里需要有一段描述
* 【测试模块】这里需要有一段描述
* build
* merge
* release

## 测试用例

[测试用例](./test/test.md)

## API

### runner(message, [customKeywords], [custormPostfixes])

>自动检测，会自动设置好exitCode，如果message不符合要求，会自动在程序执行完后终止commit，底层封装了checker

* **customKeywords**[array]：自定义关键词，系统自带的有build、Build、release、Release、merge、Merge，其中对乌龟Git自动merge生成的message做了兼容处理。用户可以自己传入关键词，进行拓展。

* **custormPostfixes**[array]：自定义后缀，系统自带的后缀有“页”和“模块”，也就是【xx页|模块】，如果想要拓展，可以自己传参，例如支持【xx组件】,只需将custormPostfixes设为['组件']即可。

返回值：undefined

### checker(message, [customKeywords], [custormPostfixes])

>只进行检测，返回状态码，不设置exitCode**（exitCode非0都会导致commit终止）**

返回值：<Object>{<status:string>:<number>}

### getStatus()

返回值：<Object>{<status:number>:<desc:string>}

## 附录

### 如何获取commit message？

>需要调用者自己读取/.git/COMMIT_EDITMSG文件内容，在commit-msg钩子触发时，Git会自动将message写入COMMIT_EDITMSG文件，读取即可
