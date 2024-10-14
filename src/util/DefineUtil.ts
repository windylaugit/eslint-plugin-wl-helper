/**
 * [类文件描述]
 *
 * @copyright (c)2024
 * @author AndyLau <373804860@qq.com>
 * @version V1.0.1
 * @since 2024-03-19 17:40:31
 */
import nodePath from 'node:path'
import nodeFs from 'node:fs/promises'

type DefineUtilGetFilePathListOption = {
  // 是否递归？默认true
  recursion?: boolean,
  // 是否返回相对路径？默认true
  relative?: boolean
}

class DefineUtil {
  static FS_CONSTANTS = nodeFs.constants
  static pathResolve(...paths: string[]): string {
    return nodePath.resolve(...paths)
  }

  static pathRelative(from: string, to: string): string {
    return nodePath.relative(from, to)
  }

  static dirname(path: string): string {
    return nodePath.dirname(path)
  }

  static extname(path: string): string {
    return nodePath.extname(path)
  }

  static basename(path: string): string {
    return nodePath.basename(path, nodePath.extname(path))
  }

  static ucFirst(str: string): string {
    if (!str) {
      return str
    }
    return str[0].toUpperCase() + str.substring(1)
  }

  static lcFirst(str: string): string {
    if (!str) {
      return str
    }
    return str[0].toLowerCase() + str.substring(1)
  }

  static async getFileContent(filePath: string): Promise<string> {
    return await nodeFs.readFile(filePath, { encoding: 'utf-8' })
  }

  static async getJson(jsonPath: string): Promise<Record<string, unknown>> {
    const content = await this.getFileContent(jsonPath)
    return JSON.parse(content) as Record<string, unknown>
  }

  static async accessAble(pathLike: string, mode?: number): Promise<boolean> {
    try {
      await nodeFs.access(pathLike, mode ?? nodeFs.constants.R_OK)
      return true
    } catch (_err) {
      return false
    }
  }

  static async pathStat(pathLike: string, mode?: number): Promise<{ isAccessAble: false } | {
    isFile: boolean, isDirectory: boolean, isAccessAble: true, modifyTime: Date
  }> {
    try {
      await nodeFs.access(pathLike, mode ?? nodeFs.constants.R_OK)
      const stat = await nodeFs.stat(pathLike)
      if (!stat) {
        return { isAccessAble: false }
      } else {
        return {
          isAccessAble: true,
          isFile: stat.isFile(),
          isDirectory: stat.isDirectory(),
          modifyTime: new Date(stat.mtime)
        }
      }
    } catch (_err) {
      return { isAccessAble: false }
    }
  }

  static async getFilePathList(dirPath: string, option?: DefineUtilGetFilePathListOption): Promise<string[]> {
    const m = this
    const { recursion = true, relative = true } = option || {} as DefineUtilGetFilePathListOption
    const getSubList = async(theDirPath: string): Promise<string[]> => {
      const subList = await nodeFs.readdir(theDirPath)
      const theRetList: string[] = []
      if (subList?.length) {
        for (const subName of subList) {
          const subPath = `${theDirPath}/${subName}`
          const subStat = await m.pathStat(subPath)
          if (!subStat.isAccessAble) {
            continue
          }
          if (recursion && subStat.isDirectory) {
            const subRetList = await getSubList(subPath)
            if (subRetList?.length) {
              theRetList.push(...subRetList)
            }
          } else if(subStat.isFile) {
            if (relative) {
              theRetList.push(m.pathRelative(dirPath, subPath))
            } else {
              theRetList.push(subPath)
            }
          }
        }
      }
      return theRetList
    }
    return getSubList(dirPath)
  }

  static async mkdir(dirPath: string): Promise<string | undefined> {
    return await nodeFs.mkdir(dirPath, { recursive: true })
  }

  static async rmdir(dirPath: string): Promise<void> {
    return await nodeFs.rmdir(dirPath)
  }
}

export default DefineUtil
