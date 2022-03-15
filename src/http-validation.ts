// @ts-ignore
import fetch from "node-fetch"

const errorHandler = (error: Error) => {
  throw new Error(error.message)
}

const statusCheck = async (urlArray: []) => {
  try {
    const statusArray = await Promise.all(
      urlArray.map(async (url) => {
        const res = await fetch(url)
        return res.status
      })
    )
    return statusArray
  } catch (e) {
    errorHandler(e)
  }
}

const URLsGenerator = (arrayLinks: []) => {
  const newArr: any = []
  arrayLinks.map((arr: []) =>
    arr.map((link) => newArr.push(Object.values(link)))
  )
  return newArr.flat()
}

const validateURLs = async (linkArray: any) => {
  const allLinks = URLsGenerator(linkArray)
  const statusCodes = await statusCheck(allLinks)
  const resultados = linkArray[0].map((linkObject: any, index: any) => ({
    ...linkObject,
    statusCodes: statusCodes[index],
  }))

  return resultados
}

export { validateURLs }
