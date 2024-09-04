# 6-1-Guess-Number-Bot-Server

# Guess the Number Bot

Це Telegram бот, який дозволяє користувачам грати у гру "Вгадай число" через веб-інтерфейс.

## Необхідні умови
- Node.js v18.20.4 або вище
- NPM (входить у комплект з Node.js)
- Сервер з публічним доменом або IP-адресою (з підтримкою HTTPS)
- Токен Telegram бота (знаходиться в файлі .env)

## Встановлення

1. Клонуйте репозиторій:
   ```bash
   git clone <url-вашого-репозиторію>
   cd guess-the-number-bot

2. Встановіть необхідні залежності:
   ```bash
    npm install

3. Налаштуйте змінні середовища: Створіть файл .env у кореневій директорії та додайте наступні змінні (!!! Зараз бот вже створений у телеграм, а його токен внесений у змінну в .env,  ):

TELEGRAM_BOT_TOKEN=ваш-телеграм-бот-токен

WEB_APP_URL=https://ваш-домен-або-ip-тут-вкажіть-посилання-на-додаток-гри

4. Запустіть сервер:

npm start
