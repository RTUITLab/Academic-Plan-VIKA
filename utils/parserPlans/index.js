
module.exports = class ParserPlans {
    #academicPlan = null;
    #data = {};

    constructor(academicPlan, baccalaureate = true) {
        this.#academicPlan = academicPlan;
        this.#parserGeneralOrProfile(this.#academicPlan, true, baccalaureate);
        this.#parserGeneralOrProfile(this.#academicPlan, false, baccalaureate);
    }

    getData()
    {
        return this.#data;
    }

    #startOrStopParsing(elem, general, block)
    {
        const partStart = general ? "Обязательная часть" : "Часть, формируемая участниками образовательных отношений";
        const partStop = general ? "Часть, формируемая участниками образовательных отношений" : "Дисциплины по выбору Б1.В.ДВ.1";
        if (elem.Column1 === partStart)
        {
            return true;
        }
        else if (elem.Column1 === partStop || elem.Column1 === "ФТД.Факультативные дисциплины")
        {
            return false;
        }
        else
        {
            return block;
        }
    }

    #checkTerm(elem, number)
    {
        return ((elem.Column2 && elem.Column2.includes(String(number))) || (elem.Column3 && elem.Column3.includes(String(number))) || (elem.Column4 && elem.Column4.includes(String(number))) || (elem.Column6 && elem.Column6.includes(String(number))));
    }

    #parserGeneralOrProfile(buffer, general, baccalaureate)
    {
        const keyType = general ? "general" : "profile";
        let block = false;
        buffer.forEach((elem, index, array) => {
            block = this.#startOrStopParsing(elem, general, block);
            if (block)
            {
                for (let j = 1; j <= (baccalaureate ? 8 : 4); j++) {
                    this.#data["term"+j] = this.#data["term"+j] || {};
                    this.#data["term"+j][keyType] = this.#data["term"+j][keyType] || [];
                    if (this.#checkTerm(elem, j))
                    {
                        const keys = Object.keys(buffer[1]);
                        const lastKey = keys[keys.length - 1];
                        const result = Number(lastKey.replace('Column', ''));
                        const {lectures, laboratoryWork, seminars} = this.#AcademicHours(array, index, result, "Семестр "+j);
                        this.#data["term"+j][keyType].push({
                            "title": elem.Column1,
                            "exam": elem.Column2.includes(String(j)),
                            "offset": elem.Column3.includes("1"),
                            "offset_with_an_assessment": elem.Column4.includes("1"),
                            "coursework": elem.Column6.includes("1"),
                            "lectures": lectures,
                            "laboratory_work": laboratoryWork,
                            "seminars": seminars,
                        })
                    }
                }
            }
            return;
        })
    }

    #convertHours(buffer, column, i)
    {
        return buffer[i]["Column"+(column)] === "" ? null : Number(buffer[i]["Column"+(column)]) / 2;
    }

    #checkType(buffer, column, type)
    {
        return buffer[2]["Column"+(column)] === type
    }

    #AcademicHours(buffer, i, last, sem)
    {
        let lectures, laboratoryWork, seminars  = null;
        let j = 1;
        let jTrue = false;
        for (; j <= last; j++) {
            if (buffer[1]["Column"+j] === sem)
            {
                jTrue = true;
                break;
            }
        }
        if (jTrue)
        {
            lectures = this.#checkType(this.#academicPlan, j+1, "Лек") && this.#convertHours(this.#academicPlan, j+1, i);
            laboratoryWork = this.#checkType(this.#academicPlan, j+2, "Лаб") && this.#convertHours(this.#academicPlan, j+2, i);
            seminars = this.#checkType(this.#academicPlan, j+3, "Пр") ? this.#convertHours(this.#academicPlan, j+3, i) : (this.#checkType(this.#academicPlan, j+2, "Пр") ? this.#convertHours(this.#academicPlan, j+2, i) : null);
        }
        return {
            "lectures": lectures,
            "laboratoryWork": laboratoryWork,
            "seminars": seminars,
        }
    }
}