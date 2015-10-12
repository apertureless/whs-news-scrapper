var fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    _ = require('underscore'),
    Slack = require('node-slack');
    require('dotenv').load();

var hook_url = process.env.SLACK_HOOK_URL;
var slack = new Slack(hook_url);
var mins = process.env.REFRESH_TIME,
    the_interval = mins * 60 * 1000;

url = 'http://homepage.informatik.fh-gelsenkirchen.de/fachbereich/insider/insider.html';

setInterval(function() {
    request(url, function(error, response, html) {
        // Array with all messages
        var messages = [];
        var json = {
            messages: {
            }
        };

        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            // Grab the message div and all messages inside it.
            $('div.flexItemMessages p.bodytext').each(function(i, element) {
                var el = $(this);
                var message = el.text();
                messages.push(message);
            })
            json.messages = messages;
        }

        fs.readFile('messages.json', function(err, data) {
            if (err) throw err;
            var oldMessages = JSON.parse(data);

            for (var i = 0; i < messages.length; i++) {
                if(! _.contains(oldMessages.messages, messages[i])) {
                    slack.send({
                        text: 'Neue Nachricht: ' + messages[i],
                        channel: process.env.SLACK_CHANNEL,
                        username: process.env.SLACK_BOT_NAME,
                        icon_emoji: 'taco',
                    });
                    console.log("-------New Message!--------");
                    console.log(messages[i]);
                }
            }

            fs.writeFile('messages.json', JSON.stringify(json, null, 4), function(err) {
                console.log('Messages saved to json.');
            });

        })
    });
}, the_interval);
