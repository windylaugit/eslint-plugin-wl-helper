# eslint-plugin-wl-helper
通过简单易懂的的Boolean值参数，更好的的配置eslint的各类规则

### 安装 install
```shell
npm install -D @windyland/eslint-plugin-wl-helper
```

### 使用 useage

```javascript
// 在 .eslintrc.cjs 文件中配置

const { defineEslintConfig } = require('@windyland/eslint-plugin-wl-helper')

module.exports = defineEslintConfig({
  // 项目package.json文件所在的根目录
  rootDirName: __dirname,
  // 项目是否使用了Typescript
  useTypescript: false,
  // 是否使用 plugin-import 插件
  usePluginImport: true,
  // 是否使用 stylistic 插件
  useStylistic: true,
  // 是否使用vue，以及版本
  useVue: '2.7',
  // 是否使用babel
  useBabel: true,
  // 是否使用 本插件内置的配置。
  useWl: true,
  // 当依赖确实或版本不匹配时，是否尝试自动修复。
  tryFixDependencies: true,
  // 是否在生成最终的配置文件，默认生成位置：cache/eslint-inspect.json
  inspect: true
})
```
### 测试
使用命令终端打开项目根目录，执行：
```shell
npx eslint -c .eslintrc.cjs ./index.html
```

### 测试结果
运行测试后，会在项目根目录生成一个文件：cache/eslint-inspect.json，里面包含当前项目依赖的版本信息，以及最终的eslint配置。  
如果开启了tryFixDependencies参数，则会尝试自动修复package.json文件，请手动 执行`npm install`
