import React, { FC } from "react"
import { DataTable } from "./DataTable"
import { SensorDataInput } from "./SensorDataInput"
import { useSensorData } from "../hooks/useSensorData"

export const Layout: FC = () => {
    const {
        isLoading,
        sensorData,
        availableSensors,
        savePostData,
        resetTimeout
    } = useSensorData()

    return <div>
        {(!isLoading && sensorData) && <>
            <DataTable
                availableSensors={availableSensors}
                sensorData={sensorData}
                />
            <SensorDataInput
                availableSensors={availableSensors}
                savePostData={savePostData}
                resetTimeout={resetTimeout}
            />
        </>}
    </div>
}