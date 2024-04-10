
import { LatestData, DataType, FileData } from "../types/types"

const parseLatestSensorData = async (filesData: FileData) => {
  const dataTypes = Object.values(DataType)
  const latestData = Object.entries(filesData)
    .reduce((acc, [sensorId, sensorData]) => {
      
      // Run over sensor data, getting latest for each
      const dataAccumulator = sensorData.reduce((acc, datum) => {
        const { timestamp } = datum
        
        // loop over possible datatypes. This structure is so you only have to
        // add new data types to the enum to have it handled.
        for (let dType of dataTypes) {
          const dataTypeValue = datum[dType]
          if (dataTypeValue && (!acc[dType] || acc[dType][0] < timestamp)) {
            acc[dType] = [ timestamp, dataTypeValue ]
          }
        }
        
        return acc
      }, {} as Record<DataType, [number, number]>)

      acc[sensorId] = { id: sensorId, ...dataAccumulator }
      return acc
    }, {} as { [sensorId: string]: LatestData})

    return latestData
}

export default parseLatestSensorData 