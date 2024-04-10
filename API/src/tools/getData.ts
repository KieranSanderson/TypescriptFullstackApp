import fs from "fs";
import EnvVars from "../types/EnvVars";
import { FileData } from "../types/types";

const getData = async () => {
  // read data file
  const file = fs.readFileSync(`./${EnvVars.DataDir}/sensor_data.json`);
  const data: FileData = await JSON.parse(file.toString());
  return data;
};

export default getData;