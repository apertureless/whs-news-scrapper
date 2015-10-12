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

