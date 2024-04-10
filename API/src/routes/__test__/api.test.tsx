import request from 'supertest';
import app from '../../server';
import fs from 'fs';

const mockData = (testTemp: number) => ({
    "1": [
        {timestamp: 1, temperature: 1, wind: 2, humidity: 3},
        {timestamp: 2, temperature: testTemp, wind: null, humidity: 6},
        {timestamp: 3, temperature: 1, wind: null, humidity: null},
    ]
});

jest.mock('fs', () => ({
    readFileSync: jest.fn().mockReturnValue(JSON.stringify(
        {
            "1": [
                {timestamp: 1, temperature: 1, wind: 2, humidity: 3},
                {timestamp: 2, temperature: 4, wind: null, humidity: 6},
                {timestamp: 3, temperature: 1, wind: null, humidity: null},
            ]
        }
    )),
    writeFileSync: jest.fn()
}));


// **** Run **** //
describe("api", () => {
    let server: any;
    beforeAll(done => {
        server = app.listen(8001, done);
    });

    afterAll(done => {
        server.close(done);
    });
    describe("GET endpoint", () => {
        it('responds with JSON and status 200', async () => {
            const response = await request(app).get('/sensors/data');
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.text).toBe("{\"1\":{\"id\":\"1\",\"temperature\":[3,1],\"wind\":[1,2],\"humidity\":[2,6]}}")
        });
        it("handles getting from wrong endpoint", async () => {
            const response = await request(app).get('/nonexistent-endpoint');
            expect(response.status).toBe(404);
        })
    })
    describe("POST endpoint", () => {
        it("posts to endpoint correctly", async () => {
            const testPost = { id: 1, timestamp: 2, temperature: 3 }
            const response = await request(app)
                .post('/sensors/data')
                .send(testPost);
            expect(response.status).toBe(200);
            expect(fs.writeFileSync).toHaveBeenCalledWith("./undefined/sensor_data.json", JSON.stringify(mockData(3), null, 2));
        })
        it("handles posting to wrong endpoint", async () => {
            const response = await request(app).post('/nonexistent-endpoint');
            expect(response.status).toBe(404);
        })
    })
})