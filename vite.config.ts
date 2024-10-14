/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-04-15 15:10:28
 */
import nodePath from 'node:path'
import { defineConfig } from 'vite'
import packageJson from './package.json'

function getPackageName(packageJson: Record<string, unknown>): string {
  const name: string = packageJson.name as string
  if (name && name.includes('/')) {
    const nameSp = name.split('/')
    return nameSp[nameSp.length - 1] as string
  }
  return name
}
function getPackageNameCamelCase(packageJson: Record<string, unknown>): string {
  try {
    return getPackageName(packageJson).replace(/-./g, char => char[1].toUpperCase())
  } catch (_err: unknown) {
    throw new Error('Name property in package.json is missing.')
  }
}

/* ******************************  ****************************** */
const packageName = getPackageName(packageJson)
// const rootPath = nodePath.resolve(__dirname)
const packageNameCamelCase = getPackageNameCamelCase(packageJson)

const libFileExtMap: Record<'es'|'cjs'|'umd'|'iife', string> = {
  es: `.mjs`,
  cjs: `.cjs`,
  umd: `.umd.js`,
  iife: `.iife.js`
}

export default defineConfig({
  base: './',
  build: {
    target: 'es2015',
    outDir: './dist',
    lib: {
      entry: nodePath.resolve(__dirname, 'src/index.ts'),
      name: packageNameCamelCase,
      formats: ['cjs'],
      fileName: (format) => {
        // @ts-ignore
        return `${packageName}${libFileExtMap[format]}`
      }
    },
    rollupOptions: {
      external: [
        // node
        'path', 'node:path', 'node:fs', 'node:fs/promises', 'glob',
        // vite
        'vite', 'vite-plugin-cdn-import', 'vite-plugin-babel', 'vite-plugin-antdv-fix',
        // rollup
        'rollup-plugin-terser', 'rollup-plugin-visualizer',
        // vue
        '@vitejs/plugin-vue2',
        // eslint
        'eslint', 'eslint-rule-composer', 'eslint-plugin-import'
      ],
      output: {
        exports: 'named'
      }
    }
  }
})
