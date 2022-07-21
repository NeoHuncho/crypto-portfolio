import { appendFile } from "fs/promises";
import moment from "moment";

const logToFile = async (type: string, string: string) => {
  await appendFile("./log/" + type + ".txt", `${moment()}--  ${string}\n`);
};

export default logToFile;
