import { readdir, unlink, rename } from "fs/promises";
import XLSX from "xlsx";

const checkAndUpdateCardHistory = async () => {
  const userImports = await readdir("/backend/src/imports");

  if (!userImports) return;
  for (const file in userImports) {
    let workbook = XLSX.readFile("/backend/src/imports" + userImports[file]);
    let sheet = workbook.SheetNames;
    if (sheet.length === 0) return;
    let data: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheet[0]])[0];
    if (userImports[file]?.includes("CardHistoryFinal.xlsx")) return;
    if (data)
      if (data["Description"]) {
        if (userImports.includes("CardHistoryFinal")) {
          unlink("src/imports/CardHistoryFinal.xlsx");
        }

        await rename(
          "/backend/src/imports/" + userImports[file],
          "/backend/src/imports/CardHistoryFinal.xlsx"
        );
      }
  }

  return;
};

export default checkAndUpdateCardHistory;
