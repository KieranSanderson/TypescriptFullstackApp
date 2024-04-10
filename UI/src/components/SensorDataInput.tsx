import React, { ChangeEventHandler, FC, useState } from "react"
import { DataType, SensorPostData } from "../types/api"
import Button from "./Button"

interface SensorDataInputProps {
    availableSensors: string[],
    savePostData: (postData: SensorPostData) => Promise<void>,
    resetTimeout: () => Promise<void>
}

export const SensorDataInput: FC<SensorDataInputProps> = ({
    availableSensors,
    savePostData,
    resetTimeout
}) => {
    const [ postData, setPostData ] = useState<SensorPostData>({
        id: availableSensors[0],
        timestamp: Math.floor(new Date().getTime() / 1000)
    })

    const updatePostHandler = (dataType): ChangeEventHandler<HTMLInputElement> => (e) => {
        setPostData({
            ...postData,
            [dataType]: (e.target.value) ? Number(e.target.value) : undefined
        })
    }

    return <div style={{paddingTop: "40px", textAlign:"center"}}>
        <h2 style={{textAlign: "center"}}>Submit new Sensor Data</h2>

        <table>
            <thead>
                <tr>
                    <td>Sensor ID</td>
                    <td>Timestamp</td>
                    {Object.keys(DataType).map(dataType =>
                        <td key={dataType}>{dataType}</td>
                    )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <select style={{width: "6em", paddingLeft: "2em"}} defaultValue={availableSensors[0]} onChange={(e) => setPostData({
                            ...postData,
                            id: e.currentTarget.value
                        })}>
                            {availableSensors.map(sensorId => 
                                <option key={sensorId}>{sensorId}</option>
                            )}
                        </select>
                    </td>
                    <td>
                        <input
                            type="number"
                            defaultValue={postData["timestamp"]}
                            onChange={updatePostHandler("timestamp")}
                        />
                    </td>
                    {Object.values(DataType).map(dataType => <td key={dataType}>
                        <input
                            type="number"
                            defaultValue={postData[dataType]}
                            onChange={updatePostHandler(dataType)}
                        />
                    </td>
                    )}
                </tr>
            </tbody>
        </table>

        <div style={{marginTop: 10}}>
            <Button
                title="Submit New Data"
                onClickFunc={async () => {
                    await savePostData(postData)
                    await resetTimeout()
                }}
                inactive={!(
                    postData && 
                    ["id", "timestamp"].every((expectedItem) => Object.keys(postData).includes(expectedItem)) &&
                    Object.keys(postData).some((postKey: DataType) => Object.values(DataType).includes(postKey))
                )}
            />
        </div>
    </div>
}