import fs from 'fs'
import envsub from 'envsub'

import customLogger from '../../../utils/logger'
import docsConfig from '../../../config/docs'
import NotFoundError from '../../../errors/NotFoundError'
import InternalError from '../../../errors/InternalError'

export default async (version: number): Promise<string> => {
  let file: string

  const generatedFilePath = `${docsConfig.path}/api/generated/v${version}.yaml`
  const filePath = `${docsConfig.path}/api/v${version}.yaml`

  if (!fs.existsSync(generatedFilePath)) {
    if (!fs.existsSync(filePath)) throw new NotFoundError()
    try {
      await envsub({
        templateFile: filePath,
        outputFile: generatedFilePath,
      })
    } catch (err) {
      customLogger.error('An error occurred during the generation of the documentation', { err })
      throw new InternalError()
    }
  }
  try {
    file = await fs.promises.readFile(generatedFilePath, 'utf8')
  } catch (err) {
    customLogger.error('Generated file not found.', { err })
    throw new InternalError()
  }

  return file
}
