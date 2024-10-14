/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-15 16:03:30
 */
import CommonEslintConfig from './CommonEslintConfig'
import TypescriptEslintConfig from './TypescriptEslintConfig'

const configs: Record<string, Record<string, unknown>> = {
  common: (new CommonEslintConfig()).build(),
  typescript: (new TypescriptEslintConfig()).build()
}

export default configs
