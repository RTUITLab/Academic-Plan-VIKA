const express = require('express');
const AcademicPlans = require("./utils/academicPlans/index.js");
const ParserPlans = require("./utils/parserPlans/index.js");
const Disciplines = require("./utils/disciplines/index.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use('/svg', express.static('svg'));

const ObjAcademicPlans = new AcademicPlans();
const sheetNames = ObjAcademicPlans.getWorkbookSheetNames();
const disciplines = new Disciplines(sheetNames, ObjAcademicPlans);

const data = {
  "01.03.04": {
    profiles: [
      {
        title: "Анализ данных",
        years: [
          {
            year: 2023,
            sheetName: 'ПМ_бак_анализ_данных_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName("ПМ_бак_анализ_данных_2023"), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'ПМ_бак_анализ_данных_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ПМ_бак_анализ_данных_2022'), disciplines).getData(),
          },
          {
            year: 2021,
            sheetName: 'ПМ_бак_анализ_данных_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ПМ_бак_анализ_данных_2021'), disciplines).getData(),
          },
          {
            year: 2020,
            sheetName: 'ПМ_бак_анализ_данных_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ПМ_бак_анализ_данных_2020'), disciplines).getData(),
          },
          {
            year: 2019,
            sheetName: 'ПМ_бак_анализ_данных_2019',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ПМ_бак_анализ_данных_2019'), disciplines).getData(),
          }
        ]
      }
    ]
  },
  "09.03.01": {
    profiles: [
      {
        title: "Цифровые комплексы, системы и сети",
        years: [
          {
            year: 2023,
            sheetName: 'ИВТ_бак_цифровые_комплексы_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ИВТ_бак_цифровые_комплексы_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'ИВТ_бак_цифровые_комплексы_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ИВТ_бак_цифровые_комплексы_2022'), disciplines).getData(),
          }
        ]
      },
      {
        title: "Инфраструктура информационных технологий",
        years: [
          {
            year: 2023,
            sheetName: 'ИВТ_бак_инфраструктура_ит_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ИВТ_бак_инфраструктура_ит_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'ИВТ_бак_инфраструктура_ит_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ИВТ_бак_инфраструктура_ит_2022'), disciplines).getData(),
          }
        ]
      }
    ]
  },
  "09.03.03": {
    profiles: [
      {
        title: "Управление данными",
        years: [
          {
            year: 2023,
            sheetName: 'Прик_инф_бак_УД_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_УД_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прик_инф_бак_УД_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_УД_2022'), disciplines).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прик_инф_бак_УД_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_УД_2021'), disciplines).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прик_инф_бак_УД_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_УД_2020'), disciplines).getData(),
          },
          {
            year: 2019,
            sheetName: 'Прик_инф_бак_УД_2019',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_УД_2019'), disciplines).getData(),
          }
        ]
      },
      {
        title: "Цифровая трансформация",
        years: [
          {
            year: 2023,
            sheetName: 'Прик_инф_бак_ЦТ_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_ЦТ_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прик_инф_бак_ЦТ_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_ЦТ_2022'), disciplines).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прик_инф_бак_ЦТ_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_ЦТ_2022'), disciplines).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прик_инф_бак_ЦТ_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_ЦТ_2020'), disciplines).getData(),
          },
        ]
      },
      {
        title: "Информатизация организаций",
        years: [
          {
            year: 2023,
            sheetName: 'Прик_инф_бак_ИО_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_ИО_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прик_инф_бак_ИО_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_ИО_2022'), disciplines).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прик_инф_бак_ИО_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_ИО_2021'), disciplines).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прик_инф_бак_ИО_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_ИО_2020'), disciplines).getData(),
          },
          {
            year: 2019,
            sheetName: 'Прик_инф_бак_ИО_2019',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_бак_ИО_2019'), disciplines).getData(),
          }
        ]
      }
    ]
  },
  "09.03.04": {
    profiles: [
      {
        title: "Разработка программных продуктов и проектирование информационных систем",
        years: [
          {
            year: 2023,
            sheetName: 'Прог_инж_бак_рпппис_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_рпппис_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прог_инж_бак_рпппис_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_рпппис_2022'), disciplines).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прог_инж_бак_рпппис_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_рпппис_2021'), disciplines).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прог_инж_бак_рпппис_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_рпппис_2020'), disciplines).getData(),
          },
          {
            year: 2019,
            sheetName: 'Прог_инж_бак_рпппис_2019',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_рпппис_2019'), disciplines).getData(),
          }
        ]
      },
      {
        title: "Информационные технологии в атомной отрасли",
        years: [
          {
            year: 2023,
            sheetName: 'Прог_инж_бак_росатом_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_росатом_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прог_инж_бак_росатом_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_росатом_2022'), disciplines).getData(),
          }
        ]
      },
      {
        title: "Разработка и дизайн компьютерных игр и мультимедийных приложений",
        years: [
          {
            year: 2023,
            sheetName: 'Прог_инж_бак_геймдев_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_геймдев_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прог_инж_бак_геймдев_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_геймдев_2022'), disciplines).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прог_инж_бак_геймдев_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_геймдев_2021'), disciplines).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прог_инж_бак_геймдев_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_геймдев_2020'), disciplines).getData(),
          }
        ]
      },
      {
        title: "Проектирование и разработка сред и приложений дополненной и виртуальной реальностей",
        years: [
          {
            year: 2023,
            sheetName: 'Прог_инж_бак_VR_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_VR_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прог_инж_бак_VR_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_VR_2022'), disciplines).getData(),
          }
        ]
      },
      {
        title: "Интеллектуальные системы поддержки принятия решенийй",
        years: [
          {
            year: 2023,
            sheetName: 'Прог_инж_бак_нейронки_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_нейронки_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прог_инж_бак_нейронки_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_нейронки_2022'), disciplines).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прог_инж_бак_нейронки_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_нейронки_2021'), disciplines).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прог_инж_бак_нейронки_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_нейронки_2020'), disciplines).getData(),
          },
          {
            year: 2019,
            sheetName: 'Прог_инж_бак_нейронки_2019',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_нейронки_2019'), disciplines).getData(),
          }
        ]
      },
      {
        title: "Системная и программная инженерия",
        years: [
          {
            year: 2023,
            sheetName: 'Прог_инж_бак_спи_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_спи_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прог_инж_бак_спи_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_спи_2022'), disciplines).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прог_инж_бак_спи_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_спи_2021'), disciplines).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прог_инж_бак_спи_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_спи_2020'), disciplines).getData(),
          },
          {
            year: 2019,
            sheetName: 'Прог_инж_бак_спи_2019',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_спи_2019'), disciplines).getData(),
          }
        ]
      },
      {
        title: "Информационные системы управления ресурсами предприятия",
        years: [
          {
            year: 2023,
            sheetName: 'Прог_инж_бак_ERP_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_ERP_2023'), disciplines).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прог_инж_бак_ERP_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_ERP_2022'), disciplines).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прог_инж_бак_ERP_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_ERP_2021'), disciplines).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прог_инж_бак_ERP_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_ERP_2020'), disciplines).getData(),
          },
          {
            year: 2019,
            sheetName: 'Прог_инж_бак_ERP_2019',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_бак_ERP_2019'), disciplines).getData(),
          }
        ]
      }
    ]
  },
  "01.04.04": {
    profiles: [
      {
        title: "Интеллектуальный анализ данных",
        years: [
          {
            year: 2023,
            sheetName: 'ПМ_мага_ИАД_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ПМ_мага_ИАД_2023'), disciplines, false).getData(),
          },
          {
            year: 2022,
            sheetName: 'ПМ_мага_ИАД_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ПМ_мага_ИАД_2022'), disciplines, false).getData(),
          },
          {
            year: 2021,
            sheetName: 'ПМ_мага_ИАД_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ПМ_мага_ИАД_2021'), disciplines, false).getData(),
          },
          {
            year: 2020,
            sheetName: 'ПМ_мага_ИАД_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ПМ_мага_ИАД_2020'), disciplines, false).getData(),
          }
        ]
      }
    ]
  },
  "09.04.01": {
    profiles: [
      {
        title: "Архитектура вычислительной техники и информационных систем",
        years: [
          {
            year: 2023,
            sheetName: 'ИВТ_мага_ВТ_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ИВТ_мага_ВТ_2023'), disciplines, false).getData(),
          },
          {
            year: 2022,
            sheetName: 'ИВТ_мага_ВТ_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ИВТ_мага_ВТ_2022'), disciplines, false).getData(),
          },
          {
            year: 2021,
            sheetName: 'ИВТ_мага_ВТ_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ИВТ_мага_ВТ_2021'), disciplines, false).getData(),
          },
          {
            year: 2020,
            sheetName: 'ИВТ_мага_ВТ_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('ИВТ_мага_ВТ_2020'), disciplines, false).getData(),
          }
        ]
      }
    ]
  },
  "09.04.03": {
    profiles: [
      {
        title: "Корпоративные и распределенные информационные системы",
        years: [
          {
            year: 2023,
            sheetName: 'Прик_инф_мага_КИС_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_мага_КИС_2023'), disciplines, false).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прик_инф_мага_КИС_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_мага_КИС_2022'), disciplines, false).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прик_инф_мага_КИС_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_мага_КИС_2021'), disciplines, false).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прик_инф_мага_КИС_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прик_инф_мага_КИС_2020'), disciplines, false).getData(),
          }
        ]
      }
    ]
  },
  "09.04.04": {
    profiles: [
      {
        title: "Архитектура информационных систем",
        years: [
          {
            year: 2023,
            sheetName: 'Прог_инж_мага_аис_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_аис_2023'), disciplines, false).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прог_инж_мага_аис_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_аис_2022'), disciplines, false).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прог_инж_мага_аис_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_аис_2021'), disciplines, false).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прог_инж_мага_аис_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_аис_2020'), disciplines, false).getData(),
          }
        ]
      },
      {
        title: "Системная инженерия",
        years: [
          {
            year: 2023,
            sheetName: 'Прог_инж_мага_СИ_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_СИ_2023'), disciplines, false).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прог_инж_мага_СИ_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_СИ_2022'), disciplines, false).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прог_инж_мага_СИ_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_СИ_2021'), disciplines, false).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прог_инж_мага_СИ_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_СИ_2020'), disciplines, false).getData(),
          }
        ]
      },
      {
        title: "Информационные системы управления ресурсами и взаимоотношениями предприятия",
        years: [
          {
            year: 2023,
            sheetName: 'Прог_инж_мага_ERP_2023',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_ERP_2023'), disciplines, false).getData(),
          },
          {
            year: 2022,
            sheetName: 'Прог_инж_мага_ERP_2022',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_ERP_2022'), disciplines, false).getData(),
          },
          {
            year: 2021,
            sheetName: 'Прог_инж_мага_ERP_2021',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_ERP_2021'), disciplines, false).getData(),
          },
          {
            year: 2020,
            sheetName: 'Прог_инж_мага_ERP_2020',
            data: new ParserPlans(ObjAcademicPlans.getWorkbookJsonSheetName('Прог_инж_мага_ERP_2020'), disciplines, false).getData(),
          }
        ]
      }
    ]
  },
}

app.get('/disciplines', (req, res) => {
  res.send({message: {length: disciplines.getArray().length, array: disciplines.getArray()}});
});

app.get('/disciplines/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const discipline = disciplines.getId(id);
  res.send({ message: discipline });
});

app.get('/academicPlans', (req, res) => {
  res.send({message: data});
})

app.get('/academicPlans/:directions', (req, res) => {
  const direction = req.params.directions || null;
  if (direction === "01.03.04" || direction === "09.03.01" || direction === "09.03.03" || direction === "09.03.04" || direction === "01.04.04" || direction === "09.04.01" || direction === "09.04.03" || direction === "09.04.04") {
    res.send(data[direction])
  }
  else
  {
    res.send({message: data, status: "there is no such direction"});
  }
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
  console.log(`/disciplines - вернёт список всех дисциплин, их id и url svg`);
  console.log(`/disciplines/:id - вернёт определённую дисциплину по её id, её название и url svg`);
  console.log(`/academicPlans - вернёт список всех направлений, их профили, года и дисциплины`);
  console.log(`/academicPlans/:directions - вернёт профили определённого направления, года этих профилей и дисциплины`);
});