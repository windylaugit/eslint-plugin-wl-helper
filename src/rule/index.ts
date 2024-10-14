/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-23 15:31:52
 */
import ImportExtensionsRuleProvider from './ImportExtensionsRuleProvider'

const rules: Record<string, unknown> = {}

rules[ImportExtensionsRuleProvider.defineRuleId()] = ImportExtensionsRuleProvider.defineRule()

export default rules

