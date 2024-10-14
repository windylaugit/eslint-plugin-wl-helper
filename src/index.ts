/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-15 15:17:04
 */
import configs from './config'
import packageJson from '../package.json'
import { defineEslintConfig } from './config-definer'
import rules from './rule'

const { name, version } = packageJson
const meta = { name, version }
export default {}
export {
  meta,
  configs,
  rules,
  defineEslintConfig
}
