import React, { FC } from "react"
import { DataType, LatestData } from "../types/api"

interface DataRowProps {
    sensorDatum: LatestData
}

const DataRow: FC<DataRowProps> = ({sensorDatum}) => {
    const { id } = sensorDatum
    return <tr data-testid={`sensor_${id}`}>
        <td style={{textAlign: "center"}} key="id">{id}</td>
        {Object.values(DataType).map((dataType) => {
            const [ timestamp, value ] = sensorDatum[dataType]
            return <React.Fragment key={`sensor_${dataType}_timestamp`}>
                <td>{timestamp}</td>
                <td>{value}</td>
            </React.Fragment>
        })}
    </tr>
}

interface DataTableProps {
    availableSensors: string[],
    sensorData: Record<string, LatestData>
}

export const DataTable: FC<DataTableProps> = ({
    availableSensors,
    sensorData
}) => {
    return <table>
        <thead>
            <tr>
                <th />
                {Object.keys(DataType).map((dataType) => 
                    <th key={dataType} colSpan={2}>{dataType}</th>
                )}
            </tr>
            <tr>
                <th>ID</th>
                {Object.keys(DataType).map((dataType) => <React.Fragment key={`${dataType}_subheader`}>
                    <th>{"Timestamp"}</th>
                    <th>{"Value"}</th>
                </React.Fragment>
                )}
            </tr>
        </thead>
        <tbody>
            {availableSensors && availableSensors.map((sensorId) =>
                <DataRow key={sensorId} sensorDatum={sensorData[sensorId]} />
            )}
        </tbody>
    </table>
}