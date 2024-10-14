/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-03-25 17:44:57
 */

import { EslintRules } from '../types'

const rules: EslintRules = {
  // 要求组件名称总是多个单词
  'vue/multi-word-component-names': 'off',
  // html标签自闭合
  'vue/html-self-closing': 0,
  // 单行html标签
  'vue/singleline-html-element-content-newline': 0,
  'vue/max-attributes-per-line': ['error', {
    singleline: 3,
    multiline: 1
  }]
}
export default rules
