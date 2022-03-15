import chalk from "chalk"
import { getDir } from "./src"
import { validateURLs } from "./src/http-validation"

const path = process.argv

const textProcessing = async (filePath: any) => {
  const result = await getDir(filePath[2])

  if (path[3] === "validate") {
    console.log(chalk.yellow("Links validados"), await validateURLs(result))
    return
  }
  console.log(chalk.yellow("Lista de Links: \n"), result)
}

textProcessing(path)
