```js
const {
    execSync
} = require('child_process');

console.log(execSync('git rev-parse --git-dir', {
    encoding: 'utf-8'
}));
```
