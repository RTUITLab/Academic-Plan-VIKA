Для запуска рекомендуется node.js версии v20.11.1 или выше

Порядок команд при первом запуске:
- Команда npm i чтобы установить зависимости 
- Команда npm start чтобы запустить

При последующих запусках нужна только команда npm start

Express сервер будет запущен по умолчанию на 8080 порту, чтобы изменить порт, необходимо в файле .env изменить значение переменной окружения PORT.

Все ответы приходят в формате json, независимо от url запроса, в начале каждого ответа будет поле message, содержащее в себе либо ответ, либо null (в случае какой-либо ошибки).

url пути:
- /disciplines - вернёт список всех дисциплин, их id и url svg
- /disciplines/:id - вернёт определённую дисциплину по её id, её название и url svg