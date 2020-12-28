const Discord = require("discord.js");
const config = require("./config.json");
const fetch = require('node-fetch');
const client = new Discord.Client();
const prefix = ".";
const months = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10" : "October",
    "11" : "November",
    "12" : "December"
}

const answers = [];
const IMG_API_URL = 'https://api.unsplash.com';
const RANDOM_CAT_IMG_API_URL = 'https://aws.random.cat/meow';
const CLIENT_ID = 'Lt3XlkV5aNT9hLpRJoN_0-bT0EPiMl8ACE8zObTSfvI';
const PIXBAY_IMG_API = 'https://pixabay.com/api/';
const PIXBAY_API_KEY = '10311354-bdeb41945cd97304fe8b2c229';

client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length)
    let args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms...`);
    }

    else if (command === "today") {
        const [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
        message.reply(`Today is ${date} ${months[month]}, ${year}`);
    }

    else if (command === "time") {
        const [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /);
        message.reply(`The time is ${hour}:${minute}:${second}, aapka din shubh ho :slight_smile:`);
    }

    else if (command === "help" && args.length > 0) {
        setTimeout(() => {
            message.reply(`We are facing some technical issue. Please type your account credentials here so that we can reset your preferences.`);
            message.channel.send(`Type your credentials as follows:\n.user [username]\n.pass [password]\nYour credentials will be deleted as soon as we recieve the message`);
        }, 1500);
        message.channel.send("Searching the Discord database for potential solutions...");
    }
    
    else if (command === "help") {
        message.reply(`How can I help you?`);
        message.channel.send(`Ask for help in the following manner:\n.help [query]`);
    }

    else if (command === "add") {
        const ans = {'question' : args[0], 'answer' : args[1]};
        answers.push(ans);
    }

    else if (command === "laugh") {
        message.channel.send(":laughing:");
    }

    else if (command === "cry") {
        message.channel.send(":sob:");
    }

    else if (command === "f") {
        message.channel.send(":unamused:");
    }

    else if (command === "seeall") {
        message.reply(`Fetching answers...`);
        if (answers.length > 0) {
            answers.forEach(obj => {
                message.channel.send(`${obj.question} : ${obj.answer}`);
            });
        }
        else {
            message.reply(`No previous answers stored`);
        }
    }

    else if (command === "cat") {
        message.reply("Fetching random cat image :cat:");
        fetch(`${RANDOM_CAT_IMG_API_URL}`, {
            method : 'GET',
        }).then(res => res.json()).then(
            json => {
                const imgUrl = json.file;
                message.channel.send("Here you go: ", {
                    files : [imgUrl]
                });
            }
            ).catch(err => {
            message.channel.send('Ooopsie! Some error occured. Please check my console for more details :/');
            console.error(err);
        });
    }

    else if(command === "show") {
        let query = "";
        if (args.length > 0) {
            query = args.join("+");
        }
        else {
            message.channel.send("No search terms specified, picking mountains as default parameter");
            query = "mountains";
        }
        fetch(`${PIXBAY_IMG_API}?key=${PIXBAY_API_KEY}&q=${query}`, {
            method : 'GET'
        }).then(res => res.json()).then(json => {
            if (json.hits.length > 0) {
                const length = json.hits.length-1;
                const index = Math.floor(Math.random() * length);
                const imgUrl = json.hits[index].webformatURL;
                message.channel.send("Here: ", {
                    files : [imgUrl]
                });
            }
            else {
                message.channel.send("Sorry, no results :(");
            }
        }).catch(err => {
            message.channel.send('Ooopsie! Some error occured. Please check my console for more details :/');
            console.error(err);
        })
    }

    else if(command === "dev") {
        message.reply(`More cool features coming soon :partying_face:`);
    }
})

client.login(config.BOT_TOKEN);