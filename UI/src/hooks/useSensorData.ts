import React, { useEffect, useRef, useState } from "react"
import { LatestData, SensorPostData } from "../types/api"
import { isEqual } from "lodash"

export const fetchData = async (
    previousData: Record<string, LatestData>,
    setData: React.Dispatch<React.SetStateAction<Record<string, LatestData>>>,
    setAvailableSensors: React.Dispatch<React.SetStateAction<string[]>>,
    timerRef: React.MutableRefObject<NodeJS.Timeout>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>   
) => {
    let data: Record<string, LatestData>
    try {
        data = await fetch(`http://localhost:8001/sensors/data`, {
            method: "GET"
        })
        .then(res => res.json())
        if (!isEqual(data, previousData)) {
            setIsLoading(true)
            setData(data)
            setAvailableSensors(Object.keys(data))
            setIsLoading(false)
        }
    } catch (error) {
        console.error(`Failed to fetch: ${error}`)
    }

    timerRef.current = setTimeout(() => {
        fetchData(
            data ?? previousData,
            setData,
            setAvailableSensors,
            timerRef,
            setIsLoading,
        )
    }, 5000)
}

export const useSensorData = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ sensorData, setSensorData ] = useState<Record<string, LatestData>>()
    const [ availableSensors, setAvailableSensors ] = useState<string[]>()
    const timerRef = useRef<NodeJS.Timeout>(null)
    
    useEffect(() => {
        fetchData(
            sensorData,
            setSensorData,
            setAvailableSensors,
            timerRef,
            setIsLoading
        )
        return () => clearInterval(timerRef.current)
    }, [])

    const resetTimeout = async () => {
        clearInterval(timerRef.current)
        await fetchData(
            sensorData,
            setSensorData,
            setAvailableSensors,
            timerRef,
            setIsLoading
        )
    }


    const savePostData = async (postData: SensorPostData) => {
        await fetch(`http://localhost:8001/sensors/data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        })
        await resetTimeout()
    }

    return {
        isLoading,
        sensorData,
        availableSensors,
        savePostData,
        resetTimeout
    }
}
