#!/usr/bin/env node
const { getDir } = require("../index")

const arrayResult = [
  [
    {
      FileList: `https://developer.mozilla.org/pt-BR/docs/Web/API/FileList`,
    },
  ],
]

describe("getDir ->", () => {
  it("should be a funcion", () => {
    expect(typeof getDir).toBe("function")
  })

  it("should return an array with results", async () => {
    const result = await getDir("./src/test/arquivos_comlinks/")
    expect(result).toEqual(arrayResult) // to be compara valores, toEqual compara os valores dentro das estruturas -> deep equality
  })

  it('should return "Não há links em nenhum arquivo do diretório', async () => {
    const result = await getDir("./src/test/arquivos_semlinks/")
    expect(result).toStrictEqual([
      "Não há links em nenhum arquivo do diretório",
    ])
  })
})
