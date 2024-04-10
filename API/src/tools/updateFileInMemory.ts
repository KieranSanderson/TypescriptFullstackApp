import { FileData, SensorPostData } from "../types/types"

const updateFileInMemory = (fileData: FileData, postValues: SensorPostData) => {
    const {
        id,
        timestamp,
        temperature,
        wind,
        humidity,
    } = postValues
    // Update object in memory, check timestamp doesnt already exist
    const sensorData = fileData[id]
    const existingIndex = sensorData.findIndex((a) => Number(a.timestamp) === Number(timestamp))
    if (existingIndex < 0) {
        fileData[id].push({
        timestamp,
        temperature,
        wind,
        humidity,
        })
    } else {
        const existingObject = fileData[id][existingIndex]
        fileData[id][existingIndex] = {
        ...existingObject,
        temperature: temperature || existingObject.temperature,
        humidity: humidity || existingObject.humidity,
        wind: wind || existingObject.wind,
        }
    }
}

export default updateFileInMemory 