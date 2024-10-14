/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-03-21 14:41:21
 */
import { EslintRules } from '../types'

const rules: EslintRules = {
  '@stylistic/array-bracket-newline': [
    'error', {
      minItems: 3,
      multiline: true
    }
  ],
  '@stylistic/arrow-spacing': [
    'error', {
      before: true,
      after: true
    }
  ],
  '@stylistic/block-spacing': ['error'],
  '@stylistic/comma-dangle': [
    'error', 'never'
  ],
  '@stylistic/comma-spacing': [
    'error', {
      'before': false,
      'after': true
    }
  ],
  '@stylistic/indent': [
    'error',
    2
  ],
  '@stylistic/key-spacing': [
    'error', {
      'beforeColon': false
    }
  ],
  '@stylistic/linebreak-style': [
    'error',
    'unix'
  ],
  '@stylistic/lines-between-class-members': [
    'error',
    'always',
    {
      // 单行类成员不空行
      exceptAfterSingleLine: true,
      // ts中的类方法重载时，不空行
      exceptAfterOverload: true
    }
  ],
  '@stylistic/no-multi-spaces': [
    'error',
    {
      ignoreEOLComments: false
    }
  ],
  '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
  '@stylistic/object-curly-newline': [
    'error',
    {
      ObjectExpression: { multiline: true, 'minProperties': 4, consistent: true },
      ObjectPattern: { multiline: true, 'minProperties': 4, consistent: true },
      ImportDeclaration: { multiline: true, 'minProperties': 6, consistent: true },
      ExportDeclaration: { multiline: true, 'minProperties': 2, consistent: true },
    }
  ],
  '@stylistic/object-curly-spacing': [
    'error',
    'always',
    {
      arraysInObjects: false,
      objectsInObjects: false
    }
  ],
  '@stylistic/object-property-newline': [
    'error', {
      allowAllPropertiesOnSameLine: true
    }
  ],
  '@stylistic/quotes': [
    'error',
    'single'
  ],
  '@stylistic/rest-spread-spacing': ['error', 'never'],
  '@stylistic/semi': [
    'error',
    'never'
  ],
  '@stylistic/space-before-blocks': ['error'],
  '@stylistic/space-before-function-paren': [
    'error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'never'
    }
  ],
  '@stylistic/type-annotation-spacing': ['error']
}
export default rules
