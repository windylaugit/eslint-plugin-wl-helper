/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-15 20:40:03
 */
import WlEslintConfigDefiner from './WlEslintConfigDefiner'
import type { WlEslintConfigDefineOption } from './types'

function defineEslintConfig(option: WlEslintConfigDefineOption): Record<string, unknown> {
  return (new WlEslintConfigDefiner(option)).build()
}

export {
  WlEslintConfigDefiner,
  defineEslintConfig
}
