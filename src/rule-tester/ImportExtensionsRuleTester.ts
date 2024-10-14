/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-23 14:12:22
 */
import RuleProvider from '../rule/ImportExtensionsRuleProvider'
import { RuleTester } from 'eslint'

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  }
})

const options = [
  'ignorePackages',
  {
    js: 'never', // *.js 不加后缀
    mjs: 'never', // *.js 不加后缀
    cjs: 'never', // *.js 不加后缀
    vue: 'always', // *.vue 加后缀
    ts: 'never', // *.ts 不加后缀
    mts: 'never', // *.ts 不加后缀
  }
]
ruleTester.run(RuleProvider.defineRuleId(), RuleProvider.defineRule(), {
  valid: [
    {
      code: `import ButtonGroup from './ButtonGroup.vue'`,
      options
    },
    {
      code: `import RadioGroup from './RadioGroup.vue'`,
      options
    }
  ],
  invalid: [
    {
      code: `import RadioGroup from './RadioGroup'`,
      options,
      errors: [
        { message: '请使用扩展名'}
      ]
    }
  ]
})
