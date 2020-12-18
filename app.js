const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Для форм
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// /Для форм

// Подключение маршрутов
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));
// /Подключение маршрутов

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = config.get('port') || 3000;

(async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  }
  catch (error) {
    console.log(`Ошибка запуска сервера: ${error.message}`);
    process.exit(1);
  }
})();