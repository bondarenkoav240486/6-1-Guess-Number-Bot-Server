require('dotenv').config(); // Завантаження змінних з файлу .env у process.env


const express = require('express');
const cors = require('cors');
const app = express();

// Використання змінної середовища для порту, або значення за замовчуванням 3001
const port = process.env.PORT || 7000;

const TelegramBot = require('node-telegram-bot-api');

// Використання змінної середовища для токену Telegram-бота
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

let targetNumber = null;

app.use(cors());
app.use(express.json());

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, ' Ласкаво просимо! Натисніть кнопку, щоб почати гру:', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Грати в Гру',
                    // Використання змінної середовища для URL веб-додатку
                    web_app: { url: process.env.WEB_APP_URL }
                }]
            ]
        }
    });
});


// Ендпоінт для старту гри
app.post('/start_game', (req, res) => {
    // Генеруємо випадкове число від 1 до 100 і зберігаємо його в змінній `targetNumber`
    targetNumber = Math.floor(Math.random() * 100) + 1;
    console.log(`Target Number (Server): ${targetNumber}`); // Виводимо число в консоль Node.js
    res.status(200).json({ message: 'Гра почалася. Вгадайте число від 1 до 100.', targetNumber });
});

// Ендпоінт для перевірки вгаданого числа
app.post('/guess', (req, res) => {
    const { guess } = req.body;

    // Перевіряємо, чи гра розпочата
    if (targetNumber === null) {
        return res.status(400).json({ message: 'Game has not started yet.' });
    }

    // Перевіряємо вгадане число
    if (guess > targetNumber) {
        res.status(200).json({ result: 'less' });
    } else if (guess < targetNumber) {
        res.status(200).json({ result: 'greater' });
    } else {
        targetNumber = null; // Скидаємо гру, якщо число вгадано
        res.status(200).json({ result: 'correct' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
