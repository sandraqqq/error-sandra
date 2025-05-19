const router = require('express').Router(); //* получаем экземпляр роутинга из библиотеки
const taskRoutes = require('./task.routes'); //* подтягиваем набор роутинга по определенному пути
const formatResponse = require('../utils/formatResponse'); //* подтягиваем утилиту для унификации ответа по 404
const authRoutes = require('./auth.routes');

router.use('/tasks', taskRoutes); //* по пути на tasks отрабатывает набор из taskRoutes
router.use('/auth', authRoutes);

//! Обработка всех запросов на несуществующие маршруты (меняем стандартный ответ от express)
router.use((req, res) => {
  res.status(404).json(formatResponse(404, 'Not found'));
});

module.exports = router;
