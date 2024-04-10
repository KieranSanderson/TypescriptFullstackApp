export type ApiError = Error & {
    status?: number
  }
  
  export interface SensorData {
    timestamp: number,
    temperature?: number,
    wind?: number,
    humidity?: number,
  }
  
  export type LatestData = {
    id: string
  } & {
    [key in DataType]?: [
      number, // Timestamp
      number, // Value
    ]
  }
  
  export enum DataType {
    Temperature = "temperature",
    Wind = "wind",
    Humidity = "humidity",
  }
  
  export type SensorPostData= {
    id: string,
    timestamp: number
  } & {
    [key in DataType]?: number
  }
  
  export interface FileData { 
    [sensorId: string]: SensorData[]
  }
  