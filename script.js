const path = require("path");
const fs = require("fs");
const xlsx = require('xlsx');
const express = require('express');
const app = express();
app.use('/svg', express.static('svg'));

const array = [];
const disciplines = {message: []};

const filePath = path.resolve(__dirname, `./files/discipline_bak_mag.xlsx`);
const workbook = xlsx.readFile(filePath);
const sheetNames = workbook.SheetNames;

/*console.log(sheetNames);

const sheetProfiles = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[]}

for (let i = 0; i < sheetNames.length; i++)
{
  const number = sheetNames[i].indexOf("_20");
  if (sheetNames[i].includes("ПМ_бак"))
  {
    sheetProfiles['1'].push({profile: sheetNames[i].slice(7, number), year:  Number(sheetNames[i].slice(-4))});
  }
  else if (sheetNames[i].includes("ИВТ_бак"))
  {
    sheetProfiles['2'].push({profile: sheetNames[i].slice(8, number), year:  Number(sheetNames[i].slice(-4))});
  }
  else if (sheetNames[i].includes("Прик_инф_бак"))
  {
    sheetProfiles['3'].push({profile: sheetNames[i].slice(13, number), year:  Number(sheetNames[i].slice(-4))});
  }
  else if (sheetNames[i].includes("Прог_инж_бак"))
  {
    sheetProfiles['4'].push({profile: sheetNames[i].slice(13, number), year:  Number(sheetNames[i].slice(-4))});
  }
  else if (sheetNames[i].includes("ПМ_мага"))
  {
    sheetProfiles['5'].push({profile: sheetNames[i].slice(8, number), year:  Number(sheetNames[i].slice(-4))});
  }
  else if (sheetNames[i].includes("ИВТ_мага"))
  {
    sheetProfiles['6'].push({profile: sheetNames[i].slice(9, number), year:  Number(sheetNames[i].slice(-4))});
  }
  else if (sheetNames[i].includes("Прик_инф_мага"))
  {
    sheetProfiles['7'].push({profile: sheetNames[i].slice(14, number), year:  Number(sheetNames[i].slice(-4))});
  }
  else if (sheetNames[i].includes("Прог_инж_мага"))
  {
    sheetProfiles['8'].push({profile: sheetNames[i].slice(14, number), year: Number(sheetNames[i].slice(-4))});
  }
}

sheetProfiles['1'].sort(function(a, b) {
  return b.year - a.year;
})

sheetProfiles['2'].sort(function(a, b) {
  return b.year - a.year;
})

sheetProfiles['3'].sort(function(a, b) {
  return b.year - a.year;
})

sheetProfiles['4'].sort(function(a, b) {
  return b.year - a.year;
})

sheetProfiles['5'].sort(function(a, b) {
  return b.year - a.year;
})

sheetProfiles['6'].sort(function(a, b) {
  return b.year - a.year;
})

sheetProfiles['7'].sort(function(a, b) {
  return b.year - a.year;
})

sheetProfiles['8'].sort(function(a, b) {
  return b.year - a.year;
})

console.log(sheetProfiles);

for (let i = 1; i < 9; i++)
{
  for (let j = 0; j < sheetProfiles[i].length; j++)
  {

  }
}

const newFile1 = {sheetProfiles['1'].map(elem) => elem.year: ""} */


for (let j = 0; j < sheetNames.length; j++) {

  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[j]]);

  for (let i = 5; i < data.length; i++) {
    if (data[i].Column1.includes('ФТД')) {
      break;
    }
    if (!data[i].Column1.includes('Часть') &&
        !data[i].Column1.includes('по выбору') &&
        !data[i].Column1.includes('Блок') && !data[i].Column1.includes('Обязательная часть'))
    {
      if (!array.includes(data[i].Column1))
      {
        array.push(data[i].Column1);
      }
    }
  }
}

for (let i = 0; i < array.length; i++) {
  disciplines.message.push({ id: i, title: array[i], urlSvg: '/svg/'+i+".svg"});
}

app.get('/disciplines', (req, res) => {
  res.send(disciplines);
})

app.get('/disciplines/:id', (req, res) => {
  if (req.params.id >= 0 && req.params.id < disciplines.message.length) {
    res.send({message: disciplines.message[req.params.id]});
  }
  else
  {
    res.send({message: null});
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на порту: ${port}`);
  console.log(`/disciplines - вернёт список всех дисциплин, их id и url svg`);
  console.log(`/disciplines/:id - вернёт определённую дисциплину по её id, её название и url svg`);
})