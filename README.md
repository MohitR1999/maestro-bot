# **Maestro Bot** [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A bot that can be used for anything fun :)

Customize it the way you want, still in development phase and can be extended pretty quickly.

Steps to get the bot up and running:

* Setup your Discord developer profile, and create an application for your bot [here](https://discordapp.com/developers/applications/)
* Clone this repository using the command 
```
git clone https://github.com/MohitR1999/maestro-bot.git
```
* Make sure you have node and npm installed
* Run ```cd maestro-bot``` and then do ```npm install```
* Install nodemon for automatic restarting of the bot when you do any changes. Use ```npm install nodemon -g```
* Create ```config.json``` file in the root directory of the repository. You need to add your BOT_TOKEN for the bot to work. Go to your discord developer account and generate it from [here](https://discord.com/developers/applications)
* Structure your ```config.json``` file as follows:
```
{
    "BOT_TOKEN": "YOUR_BOT_TOKEN"
}
```
* Run ```npm start``` in the root directory of maestro-bot, and you can use it for everything fun :)