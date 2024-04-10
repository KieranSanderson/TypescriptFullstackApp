/**
 * Simple fake data generation tool
 */
const moment = require('moment');
const fs = require('fs');

// Start date: midnight jan 1st GMT
const START_DATE = moment(1704067200000);
const DAYS_TO_GENERATE = 3;
const NUM_SENSORS = 3;


const addRandom = () => (Math.random()*4)-2
const hourlyWindVariation =     (x) => Number((-((x-12)^(2)/50) + 5  + addRandom()).toFixed(5))
const hourlyHumidityVariation = (x) => Number(( ((x-12)^(2)/50) + 1  + addRandom()).toFixed(5))
const hourlyTempVariation =     (x) => Number((-((x-12)^(2)/12) + 20 + addRandom()).toFixed(5))

async function generateData() {
    const data = {}

    for (let i = 1; i <= NUM_SENSORS; i++) {
        let dayData = []

        for (let i = 0; i < (DAYS_TO_GENERATE * 24); i++) {
            const thisMoment = moment(START_DATE).add(i, "hours")
            const hour = i % 24
            dayData.push({
                "timestamp": thisMoment.unix(),
                "humidity": hourlyHumidityVariation(hour),
                "wind": hourlyWindVariation(hour),
                "temperature": hourlyTempVariation(hour),
                "note": thisMoment.format("dddd hA")
            })
        }

        data[String(i)] = dayData
    }
    fs.writeFileSync('default_sensor_data.json', JSON.stringify(data, null, 2))
}

generateData()