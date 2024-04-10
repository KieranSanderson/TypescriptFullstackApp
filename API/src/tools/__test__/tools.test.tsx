import { jest } from "@jest/globals"
import getData from "../getData"
import EnvVars from "../../types/EnvVars"
import updateFileInMemory from "../updateFileInMemory"
import parseLatestSensorData from "../parseLatestSensorData"
import * as fs from "fs"
import { FileData } from "../../types/types"

const mockFile = {
    "1": [
        {timestamp: 1, temperature: 1, wind: 2, humidity: 3},
        {timestamp: 2, temperature: 4, wind: null, humidity: 6},
        {timestamp: 3, temperature: 1, wind: null, humidity: null},
    ]
} as FileData

jest.mock("fs")

describe("tools", () => {
    describe("getData", () => {
        test("gets data from correct file", async() => {
            jest.spyOn(fs, "readFileSync").mockImplementationOnce(_ => "{}")
            await getData()
            expect(fs.readFileSync).toHaveBeenCalledTimes(1)
            expect(fs.readFileSync).toHaveBeenCalledWith(`./${EnvVars.DataDir}/sensor_data.json`)
        })
    })
    describe("parseLatestSensorData", () => {
        test("correctly transforms data", async () => {
            const latestData = await parseLatestSensorData(mockFile)

            const { id, temperature, wind, humidity } = latestData["1"]
            console.log(JSON.stringify({
                latestData
            }), null, 2)
            expect(id).toBe("1")
            expect(temperature).toStrictEqual([3,1])
            expect(wind).toStrictEqual([1,2])
            expect(humidity).toStrictEqual([2,6])
        })
    })
    describe("updateFileInMemory", () => {
        test("correctly manipulates data", async () => {
            const tempFile = { ...mockFile }
            updateFileInMemory(tempFile, {id: "1", timestamp: 1, temperature: 777})
            
            const { temperature, wind, humidity } = tempFile["1"][0]
            expect(temperature).toEqual(777)
            expect(wind).toEqual(2)
            expect(humidity).toEqual(3)
        })
    })
})