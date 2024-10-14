/**
 * Eslint config 配置对象基础类
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-15 15:48:35
 */
abstract class BaseEslintConfig {
  /**
   * 环境
   * @protected
   */
  protected getEnv(): Record<string, unknown> {
    return {
      'browser': true,
      'es2021': true,
      jest: true,
      node: true
    }
  }

  /**
   * 继承
   */
  protected getExtends(): string[] {
    // return ['eslint:recommended']
    return []
  }

  /**
   * 覆盖
   * @protected
   */
  protected getOverrides(): Array<Record<string, unknown>> | undefined {
    return [
      // 对项目中的配置文件本身进行校验
      {
        'env': {
          'node': true
        },
        'files': ['.eslintrc.{js,cjs,mjs}'],
        'parserOptions': {
          'sourceType': 'script'
        }
      }
    ]
  }

  /**
   * 解析器
   * @protected
   */
  protected getParser(): string | undefined {
    /*
     * 默认的parser定义在 parserOptions中，
     * 其他类型的配置，可以通过该方法 返回解析
     */
    return undefined
  }

  protected getParserOptions(): Record<string, unknown> {
    return {
      'ecmaVersion': 'latest',
      'sourceType': 'module',
      allowImportExportEverywhere: true
    }
  }

  protected getPlugins(): string[] {
    return []
  }

  /**
   * 规则配置
   */
  abstract getRules(): Record<string, unknown>

  /**
   * 配置
   */
  getSettings(): Record<string, unknown> | undefined {
    return undefined
  }

  /* ******************************  ****************************** */
  /**
   * 构建插件-配置
   */
  build(): Record<string, unknown> {
    const m = this
    return {
      env: m.getEnv(),
      extends: m.getExtends(),
      overrides: m.getOverrides(),
      parser: m.getParser(),
      parserOptions: m.getParserOptions(),
      plugins: m.getPlugins(),
      rules: m.getRules(),
      settings: m.getSettings()
    }
  }
}

export default BaseEslintConfig

