import { Router, Request, Response } from "express"
import HttpStatusCodes from "../types/HttpStatusCodes"
import logger from "jet-logger"
import fs from "fs"
import EnvVars from "../types/EnvVars"
import getData from "../tools/getData"
import getPostValues from "../tools/getPostValues"
import updateFileInMemory from "../tools/updateFileInMemory"
import parseLatestSensorData from "../tools/parseLatestSensorData"
const sensorRouter = Router()

async function getSensorData(req: Request, res: Response) {
  logger.info(`Getting latest sensor data from file`)
  const data = await getData()
  const latestData = await parseLatestSensorData(data)
  return res.status(HttpStatusCodes.OK).json(latestData)
}

sensorRouter.get(
  "/data",
  getSensorData,
)

async function saveSensorData(req: Request, res: Response) {
  logger.info(`Saving sensor data ${JSON.stringify(req.body)}`)
  const postValues = getPostValues(req.body)
  if (!(postValues.id && postValues.timestamp)) {
    logger.err(`Incorrect parameters supplied`)
    return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).end("Must supply ID and timestamp")
  }
  const fileData = await getData()
  try {
    updateFileInMemory(fileData, postValues)
    // write changed object over file
    fs.writeFileSync(`./${EnvVars.DataDir}/sensor_data.json`, JSON.stringify(fileData, null, 2))
    return res.end(`Data written`)
  } catch (e: any) {
    return res.end(`Failed to write data: ${JSON.stringify(e)}`)
  }
}

sensorRouter.post(
  "/data",
  saveSensorData,
)

export default sensorRouter