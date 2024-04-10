// useData.test.ts
import React from 'react';
import { fetchData } from '../useSensorData';
import { LatestData } from '../../types/api';

const mockResponse = {"1":{"id":"1","temperature":[3,1],"wind":[1,2],"humidity":[2,6]}} as Record<string, LatestData>

// jest.spyOn(global, 'fetch').mockResolvedValue({
//     json: jest.fn().mockResolvedValue(mockFile),
// } as unknown as Response);
describe('fetchData function', () => {
    it('fetches data correctly', async () => {
    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse as unknown as Response)
    });

    const setDataMock = jest.fn();
    const setAvailableSensorsMock = jest.fn();
    const setIsLoadingMock = jest.fn();
    const timerRefMock = { current: null };

    await fetchData(
        null,
        setDataMock,
        setAvailableSensorsMock,
        timerRefMock,
        setIsLoadingMock
    );

    expect(setDataMock).toHaveBeenCalledWith(mockResponse);
    expect(setAvailableSensorsMock).toHaveBeenCalledWith(["1"]);
    expect(setIsLoadingMock).toHaveBeenCalledWith(false);
    });
});
