# eslint-plugin-wl-helper
通过简单易懂的的Boolean值参数，更好的的配置eslint的各类规则

### 安装 install
```shell

```

### 使用 useage

```javascript
// 在 .eslintrc.cjs 文件中配置

const { defineEslintConfig } = require('@windyland/eslint-plugin-wl-helper')

module.exports = defineEslintConfig({
  rootDirName: __dirname,
  useTypescript: false,
  usePluginImport: true,
  useStylistic: true,
  useVue: '2.7',
  useBabel: true,
  useWl: true,
  tryFixDependencies: true,
  inspect: true
})
```
