# API

This is a basic express API, built for the SKYFLD tech test

### Setup

First, make sure youre using `node v18` by running

```bash
nvm use
```

Then, setup the local files by running

```bash
npm i && npm run build
```

and run the API with

```bash
npm run dev
```

It defaults to running locally on port `8001`, this can be edited in the
environment variables file

### Enpoints

Simply doing a `GET` to the `sensors/data` endpoint will return the latest data
for all sensors, the function does not check for parameters in the query

Doing a `POST` to the `sensors/data` endpoint will save the contents of the
body to the datastore file, after checking the `id` and `timestamp` are valid,
if a matching timestamp is found it updates the object, otherwise it adds a new
object

### Testing

Tests are done using jest, and are started with

```bash
npm run test
```

### Data

Sensor data is stored in the `datastore` directory. The `default.json` file
stores the basic data for running this code test as a backup, and
`sensor_data.json` is the current data in use. The data is structured using a
document style, as such:

```
{
    sensorID: [
        {
            timestamp
            temperature
            wind
            humidity
        }
    ]
}
```

The data array in the sensor ID key is assumed to be able to come in out of
order, as no ordering is enforced in the writing

### NOTES:

Keying the data by Timestamp (or being able to index by timestamp) would be a
better way to store the data, however for readability and reduced complexity of
this task, its kept to an array


# UI

This is a simple Typescript based react one-page app, a simple router exists to
render the `Layout`, which contains the simple HTML table with basic styling
for showing the queried data and a simple input section for adding new data.
`Webpack` was used for ease of bundling and development.

### File Structure

A simple minimum-depth layout was used, seperating out components, hooks and 
types, as the amount of files is not too big

### Starting the app

First, make sure youre using `node v18` by running

```bash
nvm use
```

Then, setup the local files by running

```bash
npm i && npm run build
```

and run the app with

```bash
npm run start
```

### Testing

Tests are done using jest, and are started with

```bash
npm run test
```
