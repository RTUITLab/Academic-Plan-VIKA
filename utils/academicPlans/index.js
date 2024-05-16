const path = require("path");
const xlsx = require("xlsx");

module.exports = class AcademicPlans {
    #workbook = null;

    constructor() {
        const filePath = path.resolve(__dirname, "./../../files/discipline_bak_mag.xlsx");
        this.#workbook = xlsx.readFile(filePath);
    }

    getWorkbook() {
        return this.#workbook;
    }

    getWorkbookSheetNames() {
        return this.#workbook.SheetNames;
    }

    getWorkbookJson() {
        return xlsx.utils.sheet_to_json(this.#workbook.Sheets);
    }

    getWorkbookJsonSheetName(SheetName) {
        return xlsx.utils.sheet_to_json(this.#workbook.Sheets[SheetName]);
    }
}