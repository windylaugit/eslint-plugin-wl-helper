/**
 * 普通配置
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-15 16:03:54
 */
import BaseEslintConfig from './BaseEslintConfig'

class TypescriptEslintConfig extends BaseEslintConfig {
  constructor() {
    super()
  }

  protected getExtends(): string[] {
    const ret = super.getExtends()
    ret.push('plugin:@typescript-eslint/recommended')
    ret.push('plugin:@typescript-eslint/stylistic')
    return ret
  }

  protected getParser(): string | undefined {
    return '@typescript-eslint/parser'
  }

  protected getPlugins(): string[] {
    const ret = super.getExtends()
    ret.push('@typescript-eslint')
    return ret
  }

  getRules(): Record<string, unknown> {
    const m = this
    return {
      ...m._typescriptRules()
    }
  }

  /* ******************************  ****************************** */
  private _typescriptRules(): Record<string, unknown>{
    return {
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
  }
}

export default TypescriptEslintConfig
