/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-15 20:45:54
 */
export type EslintRuleValue = 0 | 1 | 2 | "off" | "warn" | "error" | [
    "off" | "warn" | "error",
  ...rest: unknown[]
]
export type EslintRules = {
  [name: string]: EslintRuleValue
}
export type PackageJsonType = {
  dependencies: Record<string, string>,
  devDependencies: Record<string, string>
}
export interface WlEslintConfigDefineOption {
  /**
   * 项目根目录，请在配置文件中传：__dirname
   */
  rootDirName: string,
  /**
   * 是否启用 useStylistic
   * 默认true
   */
  useStylistic?: boolean,
  /**
   * 是否使用插件import
   * true - 使用import插件中的 rules 和 resolve.alias
   * 默认 true
   */
  usePluginImport?: boolean,
  /**
   * 是否使用 typescript
   * 默认 false
   */
  useTypescript?: boolean,
  /**
   * 是否使用vue
   */
  useVue?: false | '2.7' | '3.x',
  /**
   * 是否使用babel
   * babel用于支持eslint解析 装饰器的语法
   * 默认true
   */
  useBabel?: boolean,
  /**
   * 是否使用自定义的规则等
   * 默认true
   */
  useWl?: boolean,
  /**
   * 额外的规则，若和内置规则重复，则会覆盖内置规则
   */
  rules?: EslintRules,
  /**
   * 当检查package.json文件中的依赖缺失时，是否尝试修复
   * 默认false
   */
  tryFixDependencies?: boolean,
  /**
   * 是否在控制台输出更多信息。（用于调试信息输出）
   * 默认 false
   */
  verbose?: boolean,
  /**
   * 如果要检查最终eslint配置，则传该参数。
   * boolean-true: 默认输出配置内容到 cache/eslint-inspect.json
   * string: 指定一个相对于根目录的文件路径。
   */
  inspect?: boolean | string
}
