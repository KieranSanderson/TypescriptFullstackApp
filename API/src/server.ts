import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import HttpStatusCodes from "./types/HttpStatusCodes"
import { ApiError } from "./types/types"
import sensorRouter from "./routes/api"

const app = express()

// Basic middleware
app.use(express.json())
app.use(cors())

// Add APIs, must be after middleware
app.use("/sensors", sensorRouter)

// Add error handler
app.use((
  err: ApiError,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  let status = err.status ?? HttpStatusCodes.BAD_REQUEST
  return res.status(status).json({ error: err.message })
})

export default app
