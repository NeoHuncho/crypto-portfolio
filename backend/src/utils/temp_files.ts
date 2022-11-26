import { writeFile, readFile, unlink } from "fs/promises";

interface IProps {
  fileName: string;
  data: any;
}

const writeTempFile = async ({ fileName, data }: IProps) => {
  return await writeFile("../temp/" + fileName + ".json", JSON.stringify(data));
};

const readTempFile = async (fileName: string): Promise<any> => {
  const file: string = await readFile("../temp/" + fileName + ".json");
  return JSON.parse(file);
};

const deleteTempFile = async (fileName: string) =>
  await unlink("../temp/" + fileName + ".json");

export { writeTempFile, readTempFile, deleteTempFile };
