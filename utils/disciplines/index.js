

module.exports = class Disciplines {
    #uniqueDisciplines = new Set();

    constructor(sheetNames, ObjAcademicPlans) {
        sheetNames.forEach(sheetName => {
            const data = ObjAcademicPlans.getWorkbookJsonSheetName(sheetName);

            for (let i = 5; i < data.length; i++) {
                const column1 = data[i].Column1;
                if (column1.includes('ФТД')) break;

                const shouldInclude = !['Часть', 'по выбору', 'Блок', 'Обязательная часть', 'Адаптивная физическая культура', 'Футбол', 'Рукопашный бой', 'Бокс', 'Борьба', 'Атлетическая гимнастика', 'Баскетбол', 'Волейбол', 'Общая физическая подготовка'].some(term => column1.includes(term));
                if (shouldInclude && !this.#uniqueDisciplines.has(column1)) {
                    const discipline = column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' ');
                    if (discipline === 'Физическая культура и спорт (элективные дисциплины)') {
                        this.#uniqueDisciplines.add('Физическая культура и спорт (дисциплины на выбор)');
                    }
                    else
                    {
                        this.#uniqueDisciplines.add(column1.replace(/\r\n-/g, '-').replace(/\r\n/g, ' '));
                    }
                }
            }
        });
    }

    #getHas(discipline)
    {
        return this.#uniqueDisciplines.has(discipline);
    }

    getId(id)
    {
        return this.getArray()[id] || null;
    }

    getTitle(discipline)
    {
        const disciplinesArray = [...this.#uniqueDisciplines];
        const index = disciplinesArray.indexOf(discipline);
        if (index !== -1) {
            return {
                id: index,
                title: discipline,
                urlSvg: `/svg/${index}.svg`
            };
        }
        else {
            return {
                id: null,
                title: discipline,
                urlSvg: `/svg/null.svg`
            }
        }
    }

    getArray()
    {
        return Array.from(this.#uniqueDisciplines).map((title, id) => ({
            id,
            title,
            urlSvg: `/svg/${id}.svg`
        }))
    }
}
