/**
 * 规则提供者
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-23 11:29:48
 */
import type { Rule } from 'eslint'

abstract class AbstractEslintRuleProvider {
  abstract build(): Rule.RuleModule
}

export default AbstractEslintRuleProvider
