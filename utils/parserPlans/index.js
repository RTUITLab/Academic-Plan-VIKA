
module.exports = class ParserPlans {
    #academicPlan = null;
    #disciplines = null;
    #data = {};

    constructor(academicPlan, disciplinesSet, baccalaureate = true) {
        this.#disciplines = disciplinesSet;
        this.#academicPlan = academicPlan;
        this.#parserGeneralOrProfile(this.#academicPlan, true, baccalaureate);
        this.#parserGeneralOrProfile(this.#academicPlan, false, baccalaureate);
        this.#parserChooseProfile(this.#academicPlan, baccalaureate);
    }

    getData()
    {
        return this.#data;
    }

    #startOrStopParsing(elem, general, block)
    {
        const partStart = general ? "Обязательная часть" : "Часть, формируемая участниками образовательных отношений";
        const partStop = general ? "Часть, формируемая участниками образовательных отношений" : "Дисциплины по выбору Б1.В.ДВ.1";
        if (elem.Column1 && elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ') === partStart)
        {
            return true;
        }
        else if (elem.Column1 && (elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ') === partStop || elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ') === "ФТД.Факультативные дисциплины"))
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

    #exceptionsGeneral(elem)
    {
        const exceptionsKeys = ['Физическая культура и спорт (элективные дисциплины)', 'Проектно-технологическая практика', 'Преддипломная практика', 'Выполнение и защита выпускной квалификационной работы'];
        return !!(exceptionsKeys.includes(elem));
    }


    #exceptionsProfiles(elem)
    {
        const exceptionsKeys = ['Общая физическая подготовка', 'Волейбол', 'Баскетбол', 'Атлетическая гимнастика', 'Борьба', 'Бокс', 'Рукопашный бой', 'Футбол', 'Адаптивная физическая культура'];
        return !!(exceptionsKeys.includes(elem));
    }

    #changeTitle(elem, index, array)
    {
        if(elem === "Физическая культура и спорт (элективные дисциплины)")
        {
            return 'Физическая культура и спорт (дисциплины на выбор)';
        }
        else if (elem === "Проектно-технологическая практика" && index > 0 && array[index - 1].Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ') === 'Ознакомительная практика')
        {
            return 'Технологическая (проектно-технологическая) практика';
        }
        else if (elem === "Проектно-технологическая практика")
        {
            return 'Проектная практика';
        }
        else {
            return elem;
        }
    }

    #parserGeneralOrProfile(buffer, general, baccalaureate)
    {
        const keyType = general ? "general" : "profile";
        let block = false;
        buffer.forEach((elem, index, array) => {
            block = this.#startOrStopParsing(elem, general, block);
            if (block || (elem.Column1 && this.#exceptionsGeneral(elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' '))))
            {
                for (let j = 1; j <= (baccalaureate ? 8 : 4); j++) {
                    this.#data["term"+j] = this.#data["term"+j] || {};
                    this.#data["term"+j][keyType] = this.#data["term"+j][keyType] || [];
                    if (this.#checkTerm(elem, j) && ((general || !this.#exceptionsGeneral(elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' '))) && !this.#exceptionsProfiles(elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' '))))
                    {
                        const keys = Object.keys(buffer[1]);
                        const lastKey = keys[keys.length - 1];
                        const result = Number(lastKey.replace('Column', ''));
                        const {lectures, laboratoryWork, seminars} = this.#AcademicHours(array, index, result, "Семестр "+j);
                        const title = this.#changeTitle(elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' '), index, array);
                        const discipline = this.#disciplines.getTitle(title);
                        this.#data["term"+j][keyType].push({
                            "title": discipline.title,
                            "id": discipline.id,
                            "urlSvg": discipline.urlSvg,
                            "exam": elem.Column2.includes(String(j)),
                            "offset": elem.Column3.includes(String(j)),
                            "offset_with_an_assessment": elem.Column4.includes(String(j)),
                            "coursework": elem.Column6.includes(String(j)),
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

    #startOrStopParsingChoose(elem, block)
    {
        const partStart = "Дисциплины по выбору";
        const partStop = ["Блок 2.Практика", "Физическая культура и спорт (элективные дисциплины)", "Физическая культура и спорт (дисциплины на выбор)"];
        if (elem.Column1 && elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ').includes(partStart))
        {
            return true;
        }
        else if (elem.Column1 && (elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ') === partStop[0] || elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ') === partStop[1] || elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ') === partStop[2]))
        {
            return false;
        }
        else
        {
            return block;
        }
    }

    #parserChooseProfile(buffer, baccalaureate)
    {
        let block = false;
        buffer.forEach((elem, index, array) => {
            block = this.#startOrStopParsingChoose(elem, block);
            if (block && (elem.Column1 && (elem.Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ')).includes("Дисциплины по выбору")))
            {
                console.log(elem.Column1);
                for (let j = 1; j <= (baccalaureate ? 8 : 4); j++) {
                    this.#data["term"+j] = this.#data["term"+j] || {};
                    this.#data["term"+j]["choose"] = this.#data["term"+j]["choose"] || [];
                    if (this.#checkTerm(elem, j))
                    {
                        this.#data["term"+j]["choose"].push([]);
                    }
                }
                let i = 1;
                while (array[index + i].Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ') && !(array[index + i].Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ').includes("Дисциплины по выбору") || array[index + i].Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ').includes("Физическая культура и спорт (элективные дисциплины)") || array[index + i].Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ').includes("Физическая культура и спорт (дисциплины на выбор)") || array[index + i].Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ').includes("Блок 2.Практика")))
                {
                    const newElem = array[index + i].Column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ');
                    for (let j = 1; j <= (baccalaureate ? 8 : 4); j++) {
                        if (this.#checkTerm(array[index + i], j))
                        {
                            const keys = Object.keys(buffer[1]);
                            const lastKey = keys[keys.length - 1];
                            const result = Number(lastKey.replace('Column', ''));
                            const {lectures, laboratoryWork, seminars} = this.#AcademicHours(array, index + i, result, "Семестр "+j);
                            const title = this.#changeTitle(newElem, index + i, array);
                            const discipline = this.#disciplines.getTitle(title);
                            this.#data["term"+j]["choose"][this.#data["term"+j]["choose"].length - 1].push({
                                "title": discipline.title,
                                "id": discipline.id,
                                "urlSvg": discipline.urlSvg,
                                "exam": array[index + i].Column2.includes(String(j)),
                                "offset": array[index + i].Column3.includes(String(j)),
                                "offset_with_an_assessment": array[index + i].Column4.includes(String(j)),
                                "coursework": array[index + i].Column6.includes(String(j)),
                                "lectures": lectures,
                                "laboratory_work": laboratoryWork,
                                "seminars": seminars,
                            })
                        }
                    }
                    i++;
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