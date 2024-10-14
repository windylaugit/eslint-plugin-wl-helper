/**
 * 继承 eslint-plugin-import 的 import/extensions 规则
 * 增加自动修复
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-23 13:56:26
 */
import { AST, Rule } from 'eslint'
import * as ESTree from 'estree'
import AbstractEslintRuleProvider from './AbstractEslintRuleProvider'
// @ts-ignore
import * as eslintPluginImport from 'eslint-plugin-import'
// @ts-ignore
import ruleComposer from 'eslint-rule-composer'

const rules = eslintPluginImport.rules as Record<string, Rule.RuleModule>

export type RuleComposerProblem = {
  node: ESTree.Node,
  message: string,
  messageId: string,
  data: null,
  loc: AST.SourceLocation,
  fix: Rule.ReportFixer,
}
class ImportExtensionsRuleProvider extends AbstractEslintRuleProvider {
  build(): Rule.RuleModule {
    // const m = this
    const originRule = rules['extensions'] as Rule.RuleModule
    // @ts-ignore
    const ret = ruleComposer.mapReports(originRule, (problem: RuleComposerProblem, context: Rule.RuleContext) => {
      const { message, node } = problem
      // @ts-ignore
      const parent = node?.parent
      if (message.startsWith('Missing file extension "vue"')) {
        if (parent?.type === 'ImportDeclaration') {
          const sourceCode = context.sourceCode
          const text = sourceCode.getText(parent)
          const newText = text.replace(/'$/, '.vue\'')
          problem.fix = (fixer: Rule.RuleFixer): Rule.Fix => {
            return fixer.replaceText(parent, newText)
          }
          // return {
          //   ...problem,
          //   fix: (fixer) => {
          //     return fixer.replaceText(parent, newText)
          //   }
          // }
        }
      }
      return problem
    })
    ret.meta.fixable = 'code'
    return ret
  }

  /* ******************************  ****************************** */
  /**
   * 定义规则ID
   * 注：这里的ID不要加插件前缀
   */
  static defineRuleId(): string {
    return 'import-extensions'
  }
  static defineRule(): Rule.RuleModule {
    return (new ImportExtensionsRuleProvider()).build()
  }
}

export default ImportExtensionsRuleProvider
