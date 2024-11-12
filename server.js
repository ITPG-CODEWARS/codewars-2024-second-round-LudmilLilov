const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3001; // Избор на порт
 
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Статични файлове от 'public' директорията
app.set('view engine', 'ejs'); // Настройка на EJS
app.set('views', path.join(__dirname, 'views')); // Настройка на views директорията
 
// URLs за база данни
const urlDatabase = {};
 
// Крайна точка за генериране на index.ejs страница
app.get('/', (req, res) => {
    res.render('index'); // Генериране на index.ejs файл
});
 
// Крайна точка за генериране на кратък URL
app.post('/shorten', (req, res) => {
    const { originalUrl, alias } = req.body;
    const shortUrl = `http://localhost:${PORT}/${alias}`; // Кратък URL на локалния сървър
    urlDatabase[alias] = originalUrl; // Запазване на оригиналния URL
    res.json({ shortUrl });
});
 
// Крайна точка за обработка на пренасочването
app.get('/:alias', (req, res) => {
    const { alias } = req.params;
    const originalUrl = urlDatabase[alias];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});
 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});