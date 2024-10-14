/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-03-21 14:41:50
 */
import { EslintRules } from '../types'

const rules: EslintRules = {
  '@typescript-eslint/array-type': [
    'error',
    {
      default: 'array-simple',
      readonly: 'array-simple'
    }
  ],
  '@typescript-eslint/consistent-type-definitions': 0,
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports'
    }
  ],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      'args': 'after-used',
      'argsIgnorePattern': '^_',
      'caughtErrors': 'all',
      'caughtErrorsIgnorePattern': '^_',
      'destructuredArrayIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true
    }
  ],
  '@typescript-eslint/ban-ts-comment': [
    'error', {
      'ts-ignore': false
    }
  ],
  '@typescript-eslint/explicit-function-return-type': [
    'error', {
      allowExpressions: true
    }
  ],
  '@typescript-eslint/no-this-alias': [
    'error', {
      allowedNames: [
        'm', 'vm', 'ClsCtor', 'ctx'
      ]
    }
  ]
}
export default rules