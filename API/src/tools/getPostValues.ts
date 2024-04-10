import { SensorPostData } from "../types/types"

const getPostValues = (query: any) => ({
    id:          String(query.id),
    timestamp:   Number(query.timestamp),
    temperature: Number(query.temperature),
    wind:        Number(query.wind),
    humidity:    Number(query.humidity),
  } as unknown as SensorPostData)

export default getPostValues