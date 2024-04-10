import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { DataTable } from '../DataTable';
import { LatestData } from '../../types/api';

const mockResponse = {"1":{"id":"1","temperature":[3,1],"wind":[1,2],"humidity":[2,6]}} as Record<string, LatestData>

describe('DataTable Component', () => {
    it('fetches and displays data correctly', async () => {
        render(<DataTable availableSensors={["1"]} sensorData={mockResponse} />);

            // Wait for data to be fetched and displayed
            await waitFor(() => {
                expect(screen.getByTestId("sensor_1")).toBeTruthy()
            });
        });
    });