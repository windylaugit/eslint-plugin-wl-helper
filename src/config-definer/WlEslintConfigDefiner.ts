/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-15 17:54:18
 */
import nodePath from 'node:path'
import nodeFs from 'node:fs'
import DefineUtil from '../util/DefineUtil'
import commonRules from './rules/commonRules'
import pluginImportRules from './rules/pluginImportRules'
import stylisticRules from './rules/stylisticRules'
import typescriptRules from './rules/typescriptRules'
import vueRules from './rules/vueRules'
import { WlEslintConfigDefineOption, EslintRules, EslintRuleValue, PackageJsonType } from './types'


class WlEslintConfigDefiner {
  private readonly _rootDirPath: string
  private readonly _option: WlEslintConfigDefineOption
  /**
   * 冲突规则定义, 规则组中，索引越小, 优先级越高
   * @private
   */
  private readonly _conflictRules: string[][]
  /**
   * 项目本身的依赖以及版本
   * @private
   */
  private readonly _dependencies: Record<string, string> = {}
  constructor(option: WlEslintConfigDefineOption) {
    this._option = this._formatOption(option)
    const { rootDirName } = this._option
    this._rootDirPath = nodePath.resolve(rootDirName)
    this._conflictRules = [
      ['import/no-duplicates', 'no-duplicate-imports'],
      ['@typescript-eslint/no-unused-vars', 'no-unused-vars'],
      ['@stylistic/object-curly-spacing', 'object-curly-spacing'],
      ['@stylistic/lines-between-class-members', 'lines-between-class-members']
    ]
    // 提取当前项目的依赖
    this._prepareDependencies()
  }

  public build(): Record<string, unknown> {
    const m = this
    // 一些检查
    m._check()
    const config: Record<string, unknown> = {
      root: true,
      env: m._getEnv(),
      extends: m._getExtends(),
      overrides: m._getOverrides(),
      parser: m._getParser(),
      parserOptions: m._getParserOptions(),
      plugins: m._getPlugins(),
      settings: m._getSettings(),
      rules: m._getRules()
    }
    if (m._option.inspect) {
      const inspectRelPath = m._option.inspect === true ? 'cache/eslint-inspect.json' : `${m._option.inspect}`
      m._outputConfigJson(config, inspectRelPath)
    }
    return config
  }

  /* ****************************** 私有方法 ****************************** */
  private _formatOption(option: WlEslintConfigDefineOption): WlEslintConfigDefineOption {
    const {
      useStylistic = true,
      usePluginImport = true,
      useTypescript = false,
      useVue,
      useBabel = true,
      useWl = true,
      rules = {},
      tryFixDependencies = false,
      verbose = false,
      ...rest
    } = option
    return {
      useStylistic,
      useTypescript,
      usePluginImport,
      useVue,
      useBabel,
      useWl,
      rules,
      tryFixDependencies,
      verbose,
      ...rest
    }
  }

  private _prepareDependencies(): void {
    const m = this
    const fullDependencies: Record<string, string> = {
      "eslint": "^8.56.0",
      "@windyland/eslint-plugin-wl-helper": "*",
      "@stylistic/eslint-plugin": "^1.6.2",
      "@stylistic/eslint-plugin-migrate": "^1.6.2",
      "@typescript-eslint/eslint-plugin": "^7.3.1",
      "@typescript-eslint/parser": "^7.3.1",
      "eslint-config-airbnb-base": "^15.0.0",
      "eslint-plugin-import": "^2.29.1",
      "eslint-import-resolver-alias": "^1.1.2",
      "typescript": "^5.3.3",
      "eslint-plugin-vue": "^9.23.0",
      "vue": m._option.useVue === '2.7' ? '2.7' : '^3.*',
      "vue-eslint-parser": "^9.4.2",
      "@vitejs/plugin-vue2": "^2.3.1",
      "vite-plugin-babel": "^1.2.0",
      "@babel/core": "^7.24.3",
      "@babel/eslint-parser": "^7.24.1",
      "@babel/plugin-proposal-decorators": "^7.24.1",
    }
    const keys = [...Object.keys(fullDependencies)]
    for (let key of keys) {
      m._dependencies[key] = fullDependencies[key]
    }
  }

  private _log(msg: string, type: string = 'info'): void {
    const m = this
    if (m._option.verbose) {
      console.log(`[@windyland/eslint-plugin-wl-helper] - ${type}: ${msg}`)
    }
  }

  private _throwErr(errMsg: string): void {
    throw new Error(`[@windyland/eslint-plugin-wl-helper] - Error - definer: ${errMsg}`)
  }

  private _getPackageJson(rootPath: string): PackageJsonType {
    const m = this
    const packageJsonPath = nodePath.resolve(rootPath, 'package.json')
    let readable = false
    try {
      nodeFs.accessSync(packageJsonPath, nodeFs.constants.R_OK)
      readable = true
    } catch (_err) {
      readable = false
    }
    if (!readable) {
      m._throwErr(`项目配置文件[package.json]不可读或不存在: ${packageJsonPath}`)
    }
    const content = nodeFs.readFileSync(packageJsonPath, { encoding: 'utf-8' })
    try {
      return JSON.parse(content) as PackageJsonType
    } catch (_err) {
      return {} as PackageJsonType
    }
  }

  private _setPackageJson(rootPath: string, packageJson: PackageJsonType): void {
    const m = this
    const packageJsonPath = nodePath.resolve(rootPath, 'package.json')
    let writeAble = false
    try {
      nodeFs.accessSync(packageJsonPath, nodeFs.constants.W_OK)
      writeAble = true
    } catch (_err) {
      writeAble = false
    }
    if (!writeAble) {
      m._throwErr(`项目配置文件[package.json]不可写或不存在: ${packageJsonPath}`)
    }

    try {
      const content = JSON.stringify(packageJson, null , 2) + '\n'
      nodeFs.writeFileSync(packageJsonPath, content)
      return
    } catch (_err) {
      return
    }
  }

  private _check(): void {
    const m = this
    m._log('检查项目配置：package.json')
    const packageJson = m._getPackageJson(m._rootDirPath)
    const {
      useStylistic,
      usePluginImport,
      useTypescript,
      useVue,
      useBabel,
      useWl
    } = m._option
    let updatePackageJson: PackageJsonType | undefined
    // 基础依赖检查
    const checkRet = m._checkDependencies(packageJson, '', [
      'eslint',
      'eslint-config-airbnb-base'
    ])
    if (checkRet) {
      updatePackageJson = checkRet
    }

    if (useStylistic) {
      const checkRet = m._checkDependencies(packageJson, 'useStylistic', [
        '@stylistic/eslint-plugin',
        '@stylistic/eslint-plugin-migrate'
      ])
      if (checkRet) {
        updatePackageJson = checkRet
      }
    }
    if (usePluginImport) {
      const checkRet = m._checkDependencies(updatePackageJson ?? packageJson, 'usePluginImport', ['eslint-plugin-import'])
      if (checkRet) {
        updatePackageJson = checkRet
      }
    }
    if (useTypescript) {
      const checkRet = m._checkDependencies(updatePackageJson ?? packageJson, 'useTypescript', [
        'typescript',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser'
      ])
      if (checkRet) {
        updatePackageJson = checkRet
      }
    }
    if (useVue) {
      const checkRet = m._checkDependencies(updatePackageJson ?? packageJson, 'useVue', [
        'vue',
        'eslint-plugin-vue',
        'vue-eslint-parser',
        useVue === '2.7' ? '@vitejs/plugin-vue2' : '@vitejs/plugin-vue'
      ])
      if (checkRet) {
        updatePackageJson = checkRet
      }
    }
    if (useBabel) {
      const checkRet = m._checkDependencies(updatePackageJson ?? packageJson, 'useBabel', [
        '@babel/core',
        '@babel/eslint-parser',
        '@babel/plugin-proposal-decorators',
        'vite-plugin-babel'
      ])
      if (checkRet) {
        updatePackageJson = checkRet
      }
    }
    if (useWl) {
      const checkRet = m._checkDependencies(updatePackageJson ?? packageJson, 'useDiansan', [
        '@windyland/eslint-plugin-wl-helper'
      ])
      if (checkRet) {
        updatePackageJson = checkRet
      }
    }
    if (updatePackageJson) {
      m._setPackageJson(m._rootDirPath, updatePackageJson)
    }
  }

  private _checkDependencies(packageJson: PackageJsonType, paramName: string, depNameList: string[] = []): PackageJsonType | undefined {
    const m = this
    const { tryFixDependencies } = m._option
    const { dependencies = {}, devDependencies = {} } = packageJson
    let fixed = false
    for (const depName of depNameList) {
      if (depName) {
        const hasDep = !!dependencies[depName] || !!devDependencies[depName]
        if (!hasDep) {
          // 建议版本
          const suggestVersion = m._dependencies[depName]
          // 尝试修复
          if (tryFixDependencies) {
            packageJson.devDependencies[depName] = suggestVersion
            fixed = true
          } else {
            const paramValue = m._option[paramName as keyof WlEslintConfigDefineOption]
            m._throwErr(`Eslint配置启用了参数[${paramName}=${paramValue}]，请在package.json文件中添加依赖："${depName}": "${suggestVersion}"`)
          }
        }
      }
    }
    if (fixed) {
      packageJson.devDependencies = m._sortObjByKey(packageJson.devDependencies) as Record<string, string>
      // 重新排序一下依赖
      return packageJson
    }
    return undefined
  }

  private _sortObjByKey(obj: Record<string, unknown>): Record<string, unknown> {
    const keyList = Object.keys(obj)
    const ret: Record<string, unknown> = {}
    keyList.sort()
    for (let key of keyList) {
      ret[key] = obj[key]
    }
    return ret
  }

  /* ****************************** 各个配置部分 ****************************** */
  private _getEnv(): Record<string, unknown> {
    return {
      'browser': true,
      'es2021': true,
      jest: true,
      node: true
    }
  }

  private _getExtends(): string[] {
    const m = this
    const {
      useStylistic,
      useTypescript,
      useVue,
      useWl
    } = m._option
    const ret: string[] = [
      // eslint的推荐内置配置
      'airbnb-base',
      'eslint:recommended',
    ]
    if (useStylistic) {
      // ret.push()
    }
    if (useTypescript) {
      ret.push('plugin:@typescript-eslint/recommended')
      if (useStylistic) {
        ret.push('plugin:@typescript-eslint/stylistic')
      }
    }
    if (useVue) {
      ret.push(
          'plugin:vue/essential',
          'plugin:vue/recommended'
      )
    }
    // 添加自定义的规则配置集
    if (useWl) {
      ret.push('plugin:@windyland/wl-helper/common')
      if (useTypescript) {
        ret.push('plugin:@windyland/wl-helper/typescript')
      }
    }
    return ret
  }

  private _getOverrides(): Array<Record<string, unknown>> {
    const m = this
    const {
      useVue
    } = m._option
    // 对配置文件本身进行检查
    const ret: Array<Record<string, unknown>> = [
      {
        'env': {
          'node': true
        },
        'files': ['.eslintrc.{js,cjs}'],
        'parserOptions': {
          'sourceType': 'script'
        }
      }
    ]
    if (useVue) {
      ret.push({
        files: ['*.vue'],
        rules: {
          ...vueRules
        }
      })
    }
    return ret
  }

  private _getParser(): string | undefined {
    const m = this
    const {
      useVue,
      useTypescript,
      useBabel
    } = m._option
    if (useVue) {
      return 'vue-eslint-parser'
    }
    if (useTypescript) {
      return '@typescript-eslint/parser'
    }
    if (useBabel) {
      return '@babel/eslint-parser'
    }
    return undefined
  }

  private _getParserOptions(): Record<string, unknown> {
    const m = this
    const {
      useVue,
      useTypescript,
      useBabel
    } = m._option
    const ret: Record<string, unknown> = {
      'ecmaVersion': 'latest',
      'sourceType': 'module',
      allowImportExportEverywhere: true
    }
    if (useVue) {
      ret.ecmaFeatures = {
        jsx: true
      }
    }
    // vue/typescript占用了parser选项，此时 需要在options里设置babel的parser
    if (useBabel && (useVue || useTypescript)) {
      ret.parser = '@babel/eslint-parser'
    }
    return ret
  }

  private _getPlugins(): Array<string> {
    const m = this
    const {
      useTypescript,
      useStylistic,
      usePluginImport,
      useVue,
      useWl
    } = m._option
    const ret = []
    if (useTypescript) {
      ret.push('@typescript-eslint')
    }
    if (useStylistic) {
      ret.push('@stylistic')
    }
    if (usePluginImport) {
      ret.push('import')
    }
    if (useVue) {
      ret.push('vue')
    }
    if (useWl) {
      ret.push('@ds-front-2024/diansan')
    }
    return ret
  }

  private _getRules(): EslintRules {
    const m = this
    const {
      useTypescript,
      useStylistic,
      usePluginImport,
      rules = {}
    } = m._option
    let retRules: EslintRules = {
      ...(commonRules as EslintRules)
    }
    if (useStylistic) {
      retRules = {
        ...retRules,
        ...stylisticRules
      }
    }
    if (useTypescript) {
      retRules = {
        ...retRules,
        ...typescriptRules
      }
    }
    if (usePluginImport) {
      retRules = {
        ...retRules,
        ...pluginImportRules
      }
    }

    // 外部传递的规则覆盖definer定义的
    if (rules) {
      retRules = {
        ...retRules,
        ...rules
      }
    }
    /* ****************************** 冲突规则处理 ****************************** */
    for (const conflictGroup of m._conflictRules) {
      let enabled = false
      for (const ruleName of conflictGroup) {
        if (enabled) {
          retRules[ruleName] = 'off'
        } else {
          if (m._isRuleEnabled(retRules[ruleName])) {
            enabled = true
          }
        }
      }
    }
    return retRules
  }

  private _getSettings(): Record<string, unknown> {
    const m = this
    const {
      usePluginImport
    } = m._option
    const ret: Record<string, unknown> = {}
    if (usePluginImport) {
      ret['import/resolver'] = {
        alias: {
          map: [['@', './src']],
          extensions: [
            '.js', '.mjs', '.cjs', '.jsx', '.vue', '.ts', '.mts', '.tsx'
          ]
        }
      }
    }
    return ret
  }

  private _isRuleEnabled(ruleValue: EslintRuleValue): boolean {
    return !(!ruleValue || ruleValue === 'off' || (
        Array.isArray(ruleValue) && !this._isRuleEnabled(ruleValue[0])
    ))
  }

  private async _outputConfigJson(configData: Record<string, unknown>, refFilePath: string) {
    const m = this
    const filePath = nodePath.resolve(m._rootDirPath, refFilePath)
    await DefineUtil.mkdir(nodePath.dirname(filePath))
    const content = JSON.stringify(configData, null ,2)
    nodeFs.writeFileSync(filePath, content, { encoding: 'utf-8' })
  }
}

export default WlEslintConfigDefiner
