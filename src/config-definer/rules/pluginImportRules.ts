/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-03-21 14:40:17
 */
import { EslintRules } from '../types'

const rules: EslintRules = {
  'import/no-duplicates': [
    'error',
    {
      'prefer-inline': false,
      'considerQueryString': true
    }
  ],
  // 禁止使用多余的包
  'import/no-extraneous-dependencies': 0,
  'import/export': 0,
  // 确保在导入路径内一致使用文件扩展名
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never', // *.js 不加后缀
      mjs: 'never', // *.js 不加后缀
      cjs: 'never', // *.js 不加后缀
      vue: 'always', // *.vue 加后缀
      ts: 'never', // *.ts 不加后缀
      mts: 'never', // *.ts 不加后缀
    }
  ],
  // 确保导入指向可以解析的文件/模块
  'import/no-unresolved': 0,
  'import/no-cycle': 0,
  // 首选默认导出导入/首选默认导出
  'import/prefer-default-export': 0,
  'import/no-named-as-default': 0,
  'import/no-named-default': 0
}
export default rules
