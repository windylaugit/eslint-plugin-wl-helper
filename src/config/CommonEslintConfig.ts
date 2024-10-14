/**
 * 普通配置
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-15 16:03:54
 */
import BaseEslintConfig from './BaseEslintConfig'

class CommonEslintConfig extends BaseEslintConfig {
  private readonly _usePluginImport: boolean
  constructor(option?: { usePluginImport?: boolean }) {
    super()
    const {usePluginImport = true } = option || {}
    this._usePluginImport = usePluginImport
  }

  protected getPlugins(): string[] {
    const ret = super.getExtends()
    if (this._usePluginImport) {
      ret.push('import')
    }
    return ret
  }

  getRules(): Record<string, unknown> {
    // const m = this
    return {
      // 这里的规则使用，规则ID需要加上规则定义所属的包名前缀
      '@windyland/wl-helper/import-extensions': [
        "error",
        "ignorePackages",
        {
          "js": "never",
          "mjs": "never",
          "cjs": "never",
          "vue": "always",
          "ts": "never",
          "mts": "never"
        }
      ]
    }
  }
}

export default CommonEslintConfig
