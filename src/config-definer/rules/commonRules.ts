/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-03-21 14:40:17
 */
import { EslintRules } from '../types'

const commonRules: EslintRules = {
  'arrow-body-style': 'off',
  // 强制使用骆驼拼写法命名约定
  camelcase: 0,
  // 强制类方法使用 this
  'class-methods-use-this': 0,
  // 尾部逗号
  'comma-dangle': ['error', 'never'],
  // 强制使用一致的缩进
  indent: ['error', 2, { SwitchCase: 1 }],
  'no-empty': [
    'error', {
      allowEmptyCatch: true
    }
  ],
  'lines-between-class-members': [
    'error',
    'always',
    {
      exceptAfterSingleLine: true
    }
  ],
  /*
   * 要求一个文件中最多包含类的数量： 关闭
   * 有个问题，在ts中，会把interface也当成类，会限制使用interface给class声明相关参数对象， 所以关闭这个规则。
   */
  'max-classes-per-file': 0,
  // 要求使用 let 或 const 而不是 var
  'no-var': 'error',
  // 禁止使用 new 以避免产生副作用
  'no-new': 1,
  // 禁止变量声明与外层作用域的变量同名
  'no-shadow': 0,
  // 禁用 console
  'no-console': 0,
  // promise的执行器不允许return
  'no-promise-executor-return': 0,
  // 禁止标识符中有悬空下划线
  'no-underscore-dangle': 0,
  // 禁止在可能与比较操作符相混淆的地方使用箭头函数
  'no-confusing-arrow': 0,
  // 禁用一元操作符 ++ 和 --
  'no-plusplus': 0,
  // 禁止对 function 的参数进行重新赋值
  'no-param-reassign': 0,
  // 禁用特定的语法
  'no-restricted-syntax': 0,
  // 禁止在变量定义之前使用它们
  'no-use-before-define': 0,
  // 禁止直接调用 Object.prototypes 的内置属性
  'no-prototype-builtins': 0,
  // 禁止可以在有更简单的可替代的表达式时使用三元操作符
  'no-unneeded-ternary': 'error',
  'no-unused-vars': [
    'error',
    {
      'args': 'after-used',
      'argsIgnorePattern': '^_',
      'caughtErrors': 'all',
      'caughtErrorsIgnorePattern': '^_',
      'vars': 'all',
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true
    }
  ],
  // 禁止重复模块导入
  'no-duplicate-imports': [
    'error',
    {
      includeExports: true
    }
  ],
  // 禁止在对象中使用不必要的计算属性
  'no-useless-computed-key': 'error',
  // 禁止不必要的转义字符
  'no-useless-escape': 0,
  // 禁用 continue 语句
  'no-continue': 0,
  'no-return-await': 0,
  // 要求构造函数首字母大写
  'new-cap': 0,
  // 强制一致地使用 function 声明或表达式
  'func-style': 0,
  // 强制一行的最大长度
  'max-len': 0,
  // 要求 return 语句要么总是指定返回的值，要么不指定
  'consistent-return': 0,
  // 强制switch要有default分支
  'default-case': 2,
  // 强制剩余和扩展运算符及其表达式之间有空格
  'rest-spread-spacing': 'error',
  // 要求使用 const 声明那些声明后不再被修改的变量
  'prefer-const': 'error',
  // 强制箭头函数的箭头前后使用一致的空格
  'arrow-spacing': 'error',
  // 只强制对象解构，不强制数组解构
  'prefer-destructuring': ['error', { object: true, array: false }],
  // 行尾的分号
  semi: ['error', 'never'],
  'space-before-function-paren': [
    'error',
    {
      'anonymous': 'never',
      "named": "never",
      "asyncArrow": "never"
    }
  ]
}

export default commonRules

