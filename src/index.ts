import chalk from "chalk"
import fs from "fs"
import path from "path"

const extractLinks = (text: string) => {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
  const resultArray = []
  let temp

  while ((temp = regex.exec(text)) !== null) {
    resultArray.push({ [temp[1]]: temp[2] })
  }

  return resultArray.length === 0
    ? "Não há links em nenhum arquivo do diretório"
    : resultArray
}

const errorHandler = (error: NodeJS.ErrnoException) => {
  throw new Error(
    chalk.redBright(`${error.code}: Nenhum arquivo compatível foi encontrado`)
  )
}

const getDir = async (dirPath: string) => {
  const absolutePath = path.join(__dirname, "..", dirPath)
  const encoding = "utf-8"
  try {
    const files = await fs.promises.readdir(absolutePath, { encoding })
    const result = await Promise.all(
      files.map(async (file) => {
        return await getFile(absolutePath, file)
      })
    )
    return result
  } catch (e) {
    return errorHandler(e)
  }
}

const getFile = async (absolutePath: string, file: string) => {
  const encoding = "utf-8"
  const filePath = `${absolutePath}${file}`
  const text = await fs.promises.readFile(filePath, encoding)
  return extractLinks(text)
}

export { getFile, getDir }
