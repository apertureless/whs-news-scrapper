# Insider Scrapper

A small scrapper for the news system of w-hs.de
It will scrap the messages and parse them. If new messages appear it sends a notification to slack.

## Installation
Clone the repository

```
git clone https://github.com/apertureless/whs-news-scrapper.git
```

Install dependencies:

```
npm install
```

## Configuration

Edit the .env.example and rename it to .env
Go to your slack team configuration and add antoher Incoming WebHook.
Copy the url and paste it into the .env
Set the channel, bot name and the refresh time in mins.

```
SLACK_HOOK_URL = https://hooks.slack.com/services/{key1}/{key2}/{key3}
SLACK_CHANNEL = #News
SLACK_BOT_NAME = Bot
REFRESH_TIME = 60
```

## Run on server

Make sure you have nodejs and npm on your server. You can install them via apt-get on your ubuntu server.
Then you need to install pm2 which is a process manager for nodeapps.

```
npm install pm2 -g
```

Then you can run

```
pm2 start scrapper.js
```
