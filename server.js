const express = require('express');
const AcademicPlans = require("./utils/academicPlans/index.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use('/svg', express.static('svg'));

const ObjAcademicPlans = new AcademicPlans();
const sheetNames = ObjAcademicPlans.getWorkbookSheetNames()
const uniqueDisciplines = new Set();

sheetNames.forEach(sheetName => {
  const data = ObjAcademicPlans.getWorkbookJsonSheetName(sheetName);

  for (let i = 5; i < data.length; i++) {
    const column1 = data[i].Column1;
    if (column1.includes('ФТД')) break;

    const shouldInclude = !['Часть', 'по выбору', 'Блок', 'Обязательная часть'].some(term => column1.includes(term));
    if (shouldInclude && !uniqueDisciplines.has(column1)) {
      uniqueDisciplines.add(column1);
    }
  }
});

const disciplines = Array.from(uniqueDisciplines).map((title, id) => ({
  id,
  title,
  urlSvg: `/svg/${id}.svg`
}));

app.get('/disciplines', (req, res) => {
  res.send({message: {length: disciplines.length, array: disciplines}});
});

app.get('/disciplines/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const discipline = disciplines[id] || null;
  res.send({ message: discipline });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
  console.log(`/disciplines - вернёт список всех дисциплин, их id и url svg`);
  console.log(`/disciplines/:id - вернёт определённую дисциплину по её id, её название и url svg`);
});