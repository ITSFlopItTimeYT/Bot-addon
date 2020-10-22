const Discord = require('discord.js')
const embed = new Discord.MessageEmbed()
.setTitle("Instructions")
.setAuthor("Among us", "https://lh3.googleusercontent.com/VHB9bVB8cTcnqwnu0nJqKYbiutRclnbGxTpwnayKB4vMxZj8pk1220Rg-6oQ68DwAkqO=s180-rw","https://yagami.xyz")
.setColor(0x00AE86)
.setDescription(`-join a vc
,alive <color> (,a) - Marks a player as alive
,dead <color> (,d)- Marks a player as dead. Dead players are kept muted during the discussion stage.
,discussion (,ds) - Sets the stage to discussion, unmutes everyone who is alive
,endgame (,eg)- Ends the current game
,forcejoin <color> <@mention> (fj)- Forcibly adds someone to the current game
,join <color> - Joins the current game as a color
,joinall - Adds everyone in the voice channel to the game as a random color.
,kick <color> - Removes a player from the game
,leave - Leaves the current game
,lobby - Sets the stage to Lobby, marks everyone as alive and unmutes them
,newgame - Starts a new game
,players - Lists all players in the current game
,sync - Lets you control the bot through your phone
,tasks (,ts)- Sets the stage to tasks and mutes everyone`)
.setImage("https://lh3.googleusercontent.com/VHB9bVB8cTcnqwnu0nJqKYbiutRclnbGxTpwnayKB4vMxZj8pk1220Rg-6oQ68DwAkqO=s180-rw")
.setTimestamp()