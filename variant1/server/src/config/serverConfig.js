const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '.env'),
});
const express = require('express');
const morgan = require('morgan'); //* библиотека позволяющая выводить запросы в лог
const removeHTTPHeader = require('../middleware/removeHeader'); //* наша кастомная мидлварка
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
};

//NOTE: функция serverConfig, принимающая экземпляр приложения и возвращающая обученный экземпляр

//NOTE промежуточные обработчики, работающие глобально для всего приложения (системные мидлварки)
const serverConfig = (app) => {
  //* позволяет работать с телом запроса
  app.use(express.urlencoded({ extended: true }));

  //* парсит JSON
  app.use(express.json());

  //* логирует данные о запросах на сервер
  app.use(morgan('dev'));

  //* Парсит куки
  app.use(cookieParser());

  app.use(cors(corsOptions));

  //* кастомная мидлварка для удаления HTTP заголовка
  app.use(removeHTTPHeader);

  //* настройка статики, папка public ассоциирована с маршрутом запроса
  app.use(
    '/static/images',
    express.static(path.resolve(__dirname, '..', 'public', 'images'))
  );
};

module.exports = serverConfig;
