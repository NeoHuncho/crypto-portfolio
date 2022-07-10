import { readdir, unlink, rename } from "fs/promises";
import XLSX from "xlsx";

const checkAndUpdateCardHistory = async () => {
  const userImports = await readdir("imports");

  if (!userImports) return;
  for (const file in userImports) {
    let workbook = XLSX.readFile("imports/" + userImports[file]);
    let sheet = workbook.SheetNames;
    if (sheet.length === 0) return;
    let data: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheet[0]])[0];
    if (userImports[file]?.includes("CardHistoryFinal.xlsx")) return;
    if (data)
      if (data["Description"]) {
        if (userImports.includes("CardHistoryFinal")) {
          unlink("imports/CardHistoryFinal.xlsx");
        }

        await rename(
          "imports/" + userImports[file],
          "imports/CardHistoryFinal.xlsx"
        );
      }
  }

  return;
};

export default checkAndUpdateCardHistory;
